// Base URL of the backend API
const API_BASE_URL = 'http://localhost:4000/api';

// Interface for ticket data
export interface Ticket {
  _id: string;
  name: string;
  email: string;
  description: string;
  status: 'new' | 'in progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

// Interface for response data
export interface TicketResponse {
  _id: string;
  ticketId: string;
  message: string;
  staffName: string;
  createdAt: string;
}

// API functions for tickets
export const ticketApi = {
  // Create a new ticket
  createTicket: async (ticketData: Omit<Ticket, '_id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create ticket');
    }
    
    return response.json();
  },
  
  // Get all tickets
  getTickets: async (status?: string) => {
    const url = status 
      ? `${API_BASE_URL}/tickets?status=${status}` 
      : `${API_BASE_URL}/tickets`;
      
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch tickets');
    }
    
    return response.json();
  },
  
  // Get a single ticket by ID
  getTicket: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to fetch ticket ${id}`);
    }
    
    return response.json();
  },
  
  // Update ticket status
  updateTicketStatus: async (id: string, status: 'new' | 'in progress' | 'resolved') => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to update ticket ${id}`);
    }
    
    return response.json();
  },
  
  // Add a response to a ticket
  addResponse: async (ticketId: string, responseData: { message: string; staffName: string }) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to add response to ticket ${ticketId}`);
    }
    
    return response.json();
  },
  
  // Get all responses for a ticket
  getResponses: async (ticketId: string) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/responses`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to fetch responses for ticket ${ticketId}`);
    }
    
    return response.json();
  },
};