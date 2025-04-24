'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { ticketApi, Ticket, TicketResponse } from '@/utils/api';

export default function TicketDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [responses, setResponses] = useState<TicketResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [staffName, setStaffName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'new' | 'in progress' | 'resolved' | ''>('');
  
  useEffect(() => {
    if (id) {
      fetchTicketDetails();
    }
  }, [id]);
  
  const fetchTicketDetails = async () => {
    setLoading(true);
    try {
      const ticketResult = await ticketApi.getTicket(id);
      setTicket(ticketResult.data);
      
      const responsesResult = await ticketApi.getResponses(id);
      setResponses(responsesResult.data);
      
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch ticket details');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !staffName) {
      setError('Please provide both a message and your name');
      return;
    }
    
    setSubmitting(true);
    try {
      await ticketApi.addResponse(id, { message, staffName });
      setMessage('');
      fetchTicketDetails(); // Refresh data
    } catch (err: any) {
      setError(err.message || 'Failed to add response');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleUpdateStatus = async () => {
    if (!updateStatus || !ticket) return;
    
    try {
      await ticketApi.updateTicketStatus(id, updateStatus);
      fetchTicketDetails(); // Refresh data
      setUpdateStatus('');
    } catch (err: any) {
      setError(err.message || 'Failed to update status');
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8">
          <p className="text-gray-600">Loading ticket details...</p>
        </div>
      </Layout>
    );
  }
  
  if (error && !ticket) {
    return (
      <Layout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => router.push('/admin')}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Back to Admin
        </button>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Ticket Details</h1>
          <button
            onClick={() => router.push('/admin')}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Back to Admin
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {ticket && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Ticket ID</h2>
                <p className="mt-1">{ticket._id}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Status</h2>
                <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Name</h2>
                <p className="mt-1">{ticket.name}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Email</h2>
                <p className="mt-1">{ticket.email}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Created</h2>
                <p className="mt-1">{new Date(ticket.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Last Updated</h2>
                <p className="mt-1">{new Date(ticket.updatedAt).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-500">Description</h2>
              <p className="mt-1 whitespace-pre-wrap">{ticket.description}</p>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="sm:w-1/2">
                <h2 className="text-sm font-medium text-gray-500 mb-2">Update Status</h2>
                <div className="flex">
                  <select
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value as any)}
                    className="border rounded-l-md px-3 py-2 flex-grow"
                  >
                    <option value="">Select status...</option>
                    <option value="new">New</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button
                    onClick={handleUpdateStatus}
                    disabled={!updateStatus}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Response</h2>
          <form onSubmit={handleAddResponse} className="space-y-4">
            <div>
              <label htmlFor="staffName" className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="staffName"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Response Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition
                ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Submitting...' : 'Submit Response'}
            </button>
          </form>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Responses ({responses.length})
          </h2>
          {responses.length === 0 ? (
            <p className="text-gray-500">No responses yet.</p>
          ) : (
            <div className="space-y-4">
              {responses.map((response) => (
                <div
                  key={response._id}
                  className="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{response.staffName}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(response.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{response.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}