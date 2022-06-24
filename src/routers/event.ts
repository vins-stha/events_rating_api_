import express from 'express'

import {
  createEvent,
  findById,
  deleteEvent,
  findAll,
  updateEvent,
  getResults,
  addVote
} from '../controllers/event'

const router = express.Router();

// Every path we define here will get /api/v1/events prefix
router.get('/list', findAll);
router.get('/:eventId', findById);
router.get('/:eventId/results', getResults);

router.put('/:eventId', updateEvent);
router.delete('/:eventId', deleteEvent);
router.post('/', createEvent);
router.post('/:eventId/vote', addVote);


export default router
