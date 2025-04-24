import { Request, Response, NextFunction } from 'express';
import { Ticket } from '../models/ticket.model';
import { AppError } from '../middleware/error.middleware';

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Public
export const createTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, description } = req.body;
    
    // Validate input
    if (!name || !email || !description) {
      throw new AppError('Please provide name, email, and description', 400);
    }
    
    const ticket = await Ticket.create({
      name,
      email,
      description,
      status: 'new'
    });
    
    // Log instead of sending email
    console.log(`Would normally send email here with body: New ticket created with ID ${ticket._id}`);
    
    res.status(201).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private
export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Allow filtering by status
    const filter: {status?: string} = {};
    
    if (req.query.status) {
      filter.status = req.query.status as string;
    }
    
    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
export const getTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      throw new AppError(`Ticket not found with id of ${req.params.id}`, 404);
    }
    
    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update ticket status
// @route   PUT /api/tickets/:id
// @access  Private
export const updateTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    
    if (!status || !['new', 'in progress', 'resolved'].includes(status)) {
      throw new AppError('Please provide a valid status (new, in progress, resolved)', 400);
    }
    
    let ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      throw new AppError(`Ticket not found with id of ${req.params.id}`, 404);
    }
    
    ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    next(error);
  }
};