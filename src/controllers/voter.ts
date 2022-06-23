import { Request, Response, NextFunction } from 'express'

import Voter, { VoterDocument } from '../models/Voter'
import VoterService from '../services/voter'
import { BadRequestError } from '../helpers/apiError'

// GET /voters
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await VoterService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /voters
export const addVoter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body

    const voter = new Voter({
      name: name,
    })

    await VoterService.create(voter)
    res.json(voter)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /voters/:voterId
export const deleteVoterByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await VoterService.deleteVoterByName(req.params.name)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const isNewVoter = (name: string): boolean => {
  const list = VoterService.findAll()
  const exist = list && list?.filter((n: string) => n === name)
  return exist && exist.length > 0 ? true : false
}
