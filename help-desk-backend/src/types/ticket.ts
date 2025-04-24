import mongoose from 'mongoose';

export interface ITicket {
  _id?: string;
  name: string;
  email: string;
  description: string;
  status: 'new' | 'in progress' | 'resolved';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IResponse {
  _id?: string;
  ticketId: mongoose.Types.ObjectId | string;
  message: string;
  staffName: string;
  createdAt?: Date;
}