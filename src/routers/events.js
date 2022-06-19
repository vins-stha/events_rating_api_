import express from 'express';
import {
    getAll, getFinalResultsOfEvent, findEventById, addNewEvent, deleteEventById, updateEventById, addVote
} from '../controllers/events'

const router = express.Router();

router.get('/', getAll);
router.get('/:eventId', findEventById);
router.post('/', addNewEvent);
router.put('/:eventId', updateEventById);
router.delete('/:eventId', deleteEventById);
router.post('/:eventId/vote', addVote);
router.get('/:eventId/results', getFinalResultsOfEvent);
