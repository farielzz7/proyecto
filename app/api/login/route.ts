import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, remember_me } = await request.json();

    // Replace with your actual PHP backend API URL
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://uni-djzy.onrender.com/api/login';

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, remember_me }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: response.status });
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
