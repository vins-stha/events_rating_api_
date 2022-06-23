import express from 'express'

import {
  findVotesByEventId,
  findAll,
  updateVote,
    addVote,
  deleteVote
} from '../controllers/vote'

const router = express.Router();

// Every path we define here will get /api/v1/events prefix
router.get('/:eventId/vote/list', findAll);
router.get('/:eventId', findVotesByEventId);

router.put('/:eventId/vote/:voteId', updateVote);
router.delete('/:eventId/vote/:voteId', deleteVote);
router.post('/:eventId/vote', addVote);


export default router
