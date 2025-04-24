/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';


export async function GET(request: NextRequest, context: any) {
  const { id } = context.params;
  try {
    const res = await fetch(`${API_BASE_URL}/tickets/${id}/responses`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: `Failed to fetch responses for ticket ${id}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, context: any) {
  const { id } = context.params;
  try {
    const body = await request.json();
    const res = await fetch(
      `${API_BASE_URL}/tickets/${id}/responses`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: `Failed to add response to ticket ${id}` },
      { status: 500 }
    );
  }
}