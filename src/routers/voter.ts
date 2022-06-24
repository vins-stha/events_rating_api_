import express from 'express'

import {
  findAll,
  addVoter,
  deleteVoterByName,
  isNewVoter
} from '../controllers/voter'

const router = express.Router();

// Every path we define here will get /api/v1/events prefix
router.get('/', findAll);
router.delete('/:name', deleteVoterByName);
router.post('/', addVoter);
// router.get('/:name', isNewVoter);


export default router
