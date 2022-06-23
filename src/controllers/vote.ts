import { Request, Response, NextFunction } from 'express'

import Vote from '../models/Vote'
import VoteService from '../services/vote'
import { BadRequestError } from '../helpers/apiError'


// GET /votes
export const findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    res.json(await VoteService.findAll(parseInt(req.params.eventId)))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}


// GET /votes/:voteId
export const findVotesByEventId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    res.json(await VoteService.findVoteByEventId(parseInt(req.params.eventId)))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}


// POST /votes
export const addVote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, date, eventId } = req.body

    const vote = new Vote({
      people: name,
      date: date,
      eventId: eventId,
    })

    await VoteService.create(vote)
    res.json(vote)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /votes/:voteId
export const updateVote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const voteId = req.params.voteId
    const eventId = parseInt(req.params.eventId)

    const updatedVote = await VoteService.updateById(eventId, voteId, update)
    res.json(updatedVote)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /votes/:voteId
export const deleteVote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await VoteService.deleteVoteById(parseInt(req.params.eventId),req.params.voteId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

