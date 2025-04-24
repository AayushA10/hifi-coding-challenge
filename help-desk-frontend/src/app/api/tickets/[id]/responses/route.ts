import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function GET(
  request: NextRequest,
  context:  { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${context.params.id}/responses`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: `Failed to fetch responses for ticket ${context.params.id}` },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_BASE_URL}/tickets/${context.params.id}/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: `Failed to add response to ticket ${context.params.id}` },
      { status: 500 }
    );
  }
}