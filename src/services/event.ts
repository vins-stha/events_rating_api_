import Event, { EventDocument } from '../models/Event'
import { NotFoundError } from '../helpers/apiError'
import VoterService from '../services/Voter'
import {VoterDocument} from "../models/Voter";

const findById = async (id: string): Promise<EventDocument | any> => {

  const foundEvent = await Event.findOne({"_id": id})
  if (!foundEvent) {
    throw new NotFoundError("Event not found")
  }

  const result = await Event
      .findOne({_id: id}, {"_id": 0, "__v": 0})
      .populate({
        path: "votes",
        select: {"_id": 0, "__v": 0, "eventId": 0},
        match: {
          "people": {
            $elemMatch: {$ne: []}
          }
        }
      });
  return result
}

const findAll = async (): Promise<EventDocument[]> => {
  return Event.find( {},{"_id":0,  "dates":0, "__v":0, "votes":0})//.populate('votes')

};

const create = async (event: EventDocument): Promise<EventDocument> => {

  try {
    let result: Promise<EventDocument> =  event.save();
    return result
  }catch(error){return error}

};

const addVote = async (Event: EventDocument): Promise<EventDocument> => {
  return Event.save()
}


const getResults = async (eventId:number): Promise<EventDocument[] | any> => {

  const eventExists = await Event.findOne({eventId: eventId});

  if(!eventExists)
  {
    throw new NotFoundError("Event does not exist")
  }

  const allVoters  = await VoterService.findAll();
  let votersArray:string[] = []
  if(allVoters && allVoters.length > 0)
  {
    allVoters?.map((voter:VoterDocument) =>{
      votersArray.push(voter.name)
    })
  }
  console.log('voterlsit', votersArray)

  const foundEvent = await Event
      .findOne({eventId: eventId}, {"_id": 0, "__v": 0})
      .populate({
        path: "votes",
        match: {"people": {$all: votersArray}}

      })
  return Event
      .findOne({eventId: eventId}, {"_id": 0, "__v": 0, "dates": 0})
      .populate({
        path: "votes",
        select: {"date": 1,  "people":1, "_id":0},
        match: {
          "people": {
            $all: votersArray
          }
        }
      })
};


const update = async (
    event_id: string,
    update: Partial<EventDocument>
): Promise<EventDocument | null> => {
  const foundEvent = await Event.findByIdAndUpdate(event_id, update, {
    new: true,
  })

  if (!foundEvent) {
    throw new NotFoundError(`Event ${event_id} not found`)
  }

  return foundEvent
}

const deleteEvent = async (eventId: number): Promise<EventDocument | null> => {
  // const foundEvent = Event.findByIdAndDelete(eventId)
  const foundEvent = await Event.findOne({eventId: eventId})
  if (!foundEvent) {
    throw new NotFoundError(`Event ${eventId} not found`)
  }
  foundEvent.remove();

  return foundEvent
}

const getLastEventId = async():Promise<EventDocument | null >=>{
  try {
    // let event:Promise<EventDocument> | any = await Event.findOne({$query:{}, $orderby:{$natural:-1}});
    let events = await Event.find();
    if(events.length > 0){
      return events[events.length -1]
    }

    return null
  }catch(error) {
    console.log('!!!!ERROR')
    return error
  }

}
export default {
  create,
  findById,
  findAll,
  update,
  deleteEvent,
  addVote,
  getResults,
  getLastEventId
}
