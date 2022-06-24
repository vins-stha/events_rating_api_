import { Request, Response, NextFunction } from 'express'

import Event, { EventDocument } from '../models/Event'
import Vote, { VoteDocument } from '../models/Vote'
import Voter, { VoterDocument } from '../models/Voter'

import {isNewVoter} from "./voter";


import EventService from '../services/Event'
import VoteService from '../services/Vote'
import VoterService from '../services/Voter'


import { BadRequestError } from '../helpers/apiError'
import { NotFoundError } from '../helpers/apiError'


// GET /Events
export const findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.json({"events": await EventService.findAll()})
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
}

export const getEventIdOrId = async (
    id: string | null,
    eventId: number | null
) => {
    try {
        let event
        if (eventId !== null) event = await Event.findOne({ eventId: eventId })
        else event = await Event.findOne({ _id: id })
        if (!event) {
            throw new NotFoundError('Event nof found for given id')
        }
        return id === null ? event?._id : event?.eventId
    } catch (e) {
        return e
    }
}

// GET /Events/:EventId
export const findById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = await getEventIdOrId(null, parseInt(req.params.eventId));
        if (id instanceof NotFoundError)
        {
            throw new NotFoundError("Event not found")
        }
        res.json(await EventService.findById(id))
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
    try {
        let id = await getEventIdOrId(null, parseInt(req.params.eventId))
        res.json(await EventService.findById(id))
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
}


// POST /Events
export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {name, dates} = req.body;
        let lastEventId: number = 0;
        let votes = [] as string[]

        if (await EventService.getLastEventId() || await EventService.getLastEventId() !== null) {
            let event: Promise<EventDocument> | any = await EventService.getLastEventId();
            lastEventId = event.eventId
        }

        let eventId: number = lastEventId + 1;

        await dates.map(async (date: string) => {
            const vote = new Vote({
                people: [],
                date: date,
                eventId: eventId,
            })
            let newVote = await VoteService.create(vote);

            await votes.push(newVote._id);

        });

        setTimeout(async () => {

            const event = new Event({
                name,
                dates,
                eventId,
                votes
            });

            let result = await EventService.create(event)
            let createSuccess = (result instanceof Event) ? true : false
            if (createSuccess) {

            }

            res.json(!createSuccess ?  result : {id: eventId})

        }, 1000)

    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
};

export const addVote = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const eventId = parseInt(req.params.eventId)
        const {name, votes} = req.body

        let foundEvent = await Event.findOne({eventId: eventId}).populate('votes')

        if (!foundEvent) {
            throw new NotFoundError('Could not find the event with given id')
        }
        console.log(foundEvent)
        // find the votes to update
        let foundVotes = await VoteService.findVotesByEventId(eventId)

        if (foundVotes) {
            // console.log('found votes',foundVotes)
            votes.map(async (v: string) => {
                let vote = foundVotes.filter((vote: VoteDocument) => vote.date === v) as VoteDocument[]
                // update vote item
                if (vote && vote.length > 0) {
                    let nameExists = vote[0]?.people && vote[0]?.people.filter((n: string) => n === name);

                    let voterExists = await isNewVoter(name);
                    console.log('Voter exist.= ', voterExists)

                    if(!voterExists)
                    {
                        console.log('creating voter...')
                        const newVoter = new Voter({name})
                        VoterService.create(newVoter)
                    }
                    console.log('NOT creating voter...')

                    if (!((nameExists && nameExists.length > 0))) {
                        vote[0]?.people?.push(name)
                        vote[0].save()

                    }
                }
            })

        }

        return res.json(await EventService.findById(foundEvent._id))

    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
}


// PUT /Events/:EventId
export const updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const update = req.body
        const EventId = parseInt(req.params.EventId)
        const event_id = await getEventIdOrId(null, EventId)
        const updatedEvent = await EventService.update(event_id, update)
        res.json(updatedEvent)
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
}

// DELETE /Events/:EventId
export const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await EventService.deleteEvent(parseInt(req.params.eventId))
        res.status(204).end()
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
}

// GET /Events Results
export const getResults = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        res.json(await EventService.getResults(parseInt(req.params.eventId)))
    } catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new BadRequestError('Invalid Request', error))
        } else {
            next(error)
        }
    }
}

