import express from 'express';
import { 
  createTicket, 
  getTickets, 
  getTicket, 
  updateTicket 
} from '../controllers/ticket.controller';
import {
  addResponse,
  getResponses
} from '../controllers/response.controller';

const router = express.Router();

router.route('/')
  .post(createTicket)
  .get(getTickets);

router.route('/:id')
  .get(getTicket)
  .put(updateTicket);

router.route('/:id/responses')
  .post(addResponse)
  .get(getResponses);

export default router;