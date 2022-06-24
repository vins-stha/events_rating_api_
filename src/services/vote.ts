import Vote, { VoteDocument } from '../models/Vote'
import { NotFoundError } from '../helpers/apiError'


const findAll = async (eventId: number): Promise<VoteDocument[]> => {
  return Vote.find({eventId:eventId}).sort({ name: 1})
};


const findVotesByEventId = async (eventId: number): Promise<VoteDocument[]> => {
  let foundEventVotes = await Vote.find({eventId: eventId});

  if (!foundEventVotes) {
    throw new NotFoundError(`Event ${eventId} not found`)
  }

  return  foundEventVotes
}

const create = async (newVote: VoteDocument): Promise<VoteDocument> => {

  let result: Promise<VoteDocument> = newVote.save();

  return result
};

const getResults = async (): Promise<VoteDocument[]> => {

  return Vote.find().sort({ name: 1})

};


const updateById = async (
  eventId: number,
  voteId:string,
  update: Partial<VoteDocument>
): Promise<VoteDocument | null> => {
  const foundEventVote = await Vote.findByIdAndUpdate({eventId: eventId, _id: voteId}, update, {
    new: true,
  });

  if (!foundEventVote) {
    throw new NotFoundError(`Event ${eventId} not found`)
  }

  return foundEventVote
}

const deleteVoteById = async (eventId: number, voteId: string): Promise<VoteDocument | null> => {

  const foundVote = await Vote.findOne({eventId: eventId, _id:voteId})

  if (!foundVote) {
    throw new NotFoundError(`Event ${eventId} not found`)
  }

  foundVote.remove();

  return foundVote
}

const getLastEventId = async():Promise<VoteDocument>=>{
  let event:Promise<VoteDocument> | any = await Vote.findOne({$query:{}, $orderby:{$natural:-1}});

  return event
}
export default {
  create,
  findVotesByEventId,
  findAll,
  updateById,
  deleteVoteById,
  getResults,
  getLastEventId,

}
