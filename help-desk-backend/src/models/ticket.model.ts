import mongoose, { Schema } from 'mongoose';
import { ITicket, IResponse } from '../types/ticket';

const ResponseSchema = new Schema<IResponse>({
  ticketId: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  staffName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TicketSchema = new Schema<ITicket>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'in progress', 'resolved'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Response = mongoose.model<IResponse>('Response', ResponseSchema);
export const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);