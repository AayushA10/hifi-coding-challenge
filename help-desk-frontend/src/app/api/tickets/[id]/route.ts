/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function GET(
  request: NextRequest,
  context: any
) {
  const { id } = context.params;
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: `Failed to fetch ticket ${id}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: any
) {
  const { id } = context.params;
  try {
    const body = await request.json();
    
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: `Failed to update ticket ${id}` },
      { status: 500 }
    );
  }
}