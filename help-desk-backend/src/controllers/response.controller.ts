import { Request, Response, NextFunction } from 'express';
import { Response as TicketResponse, Ticket } from '../models/ticket.model';
import { AppError } from '../middleware/error.middleware';

// @desc    Add response to ticket
// @route   POST /api/tickets/:id/responses
// @access  Private
export const addResponse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, staffName } = req.body;
    const ticketId = req.params.id;
    
    // Validate input
    if (!message || !staffName) {
      throw new AppError('Please provide message and staff name', 400);
    }
    
    // Check if ticket exists
    const ticket = await Ticket.findById(ticketId);
    
    if (!ticket) {
      throw new AppError(`Ticket not found with id of ${ticketId}`, 404);
    }
    
    const response = await TicketResponse.create({
      ticketId,
      message,
      staffName
    });
    
    // Log instead of sending email
    console.log(`Would normally send email here with body: New response added to ticket ${ticketId}`);
    
    res.status(201).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get responses for a ticket
// @route   GET /api/tickets/:id/responses
// @access  Private
export const getResponses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticketId = req.params.id;
    
    // Check if ticket exists
    const ticket = await Ticket.findById(ticketId);
    
    if (!ticket) {
      throw new AppError(`Ticket not found with id of ${ticketId}`, 404);
    }
    
    const responses = await TicketResponse.find({ ticketId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (error) {
    next(error);
  }
};