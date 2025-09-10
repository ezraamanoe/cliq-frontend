import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Mock data for events
const events = [
  {
    id: '1',
    title: 'Sunset Rooftop Mixer',
    category: 'Social',
    date: 'Mon 09 Sep',
    startTime: '19:00',
    endTime: '22:00',
    location: 'San Francisco, CA',
    venue: 'KRO Bar, Oxford Road',
    price: '$10.00',
    background: 'https://cdn.cosmos.so/3e7e49c6-13c1-4c6e-8140-fabb9b8f7001?format=jpeg',
  },
  {
    id: '2',
    title: 'Indie Live Night',
    category: 'Music',
    date: 'Wed 11 Sep',
    startTime: '19:00',
    endTime: '22:00',
    location: 'Oakland, CA',
    venue: 'Alcala Hall, University of California',
    price: 'FREE',
    background: 'https://cdn.cosmos.so/a338f714-08fc-44f3-9a1c-7952c90fffd0?format=jpeg',
  },
  {
    id: '3',
    title: 'Tech Startup Pitch Night',
    category: 'Business',
    date: 'Thu 12 Sep',
    startTime: '18:30',
    endTime: '21:30',
    location: 'San Francisco, CA',
    venue: 'Lenin Bar, Union Square',
    price: '$25.00',
    background: 'https://cdn.cosmos.so/77afb285-6e73-41f4-97e2-ad70d7625bd5?format=jpeg',
  },
  {
    id: '4',
    title: 'Tennis Coaching',
    category: 'Sports',
    date: 'Sat 14 Sep',
    startTime: '08:00',
    endTime: '09:30',
    location: 'Golden Gate Park',
    venue: 'Golden Gate Park',
    price: '$15.00',
    background: 'https://cdn.cosmos.so/533a9f41-ed47-4329-b133-a6013d64ee92?format=jpeg',
  },
  {
    id: '5',
    title: 'Art Gallery Opening',
    category: 'Arts',
    date: 'Fri 13 Sep',
    startTime: '18:00',
    endTime: '22:00',
    location: 'Modern Art Museum',
    venue: 'Modern Art Museum',
    price: 'FREE',
    background: 'https://cdn.cosmos.so/0ff5c127-308e-4e72-bcfa-ee8da26c7e58?format=jpeg',
  },
  {
    id: '6',
    title: 'Food Truck Festival',
    category: 'Food',
    date: 'Sun 15 Sep',
    startTime: '11:00',
    endTime: '18:00',
    location: 'Ferry Building',
    venue: 'Ferry Building',
    price: 'FREE',
    background: 'https://cdn.cosmos.so/6dc306c5-0f68-48a0-bb02-668f616b2132?format=jpeg',
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = events.find((e) => e.id === params.id);
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
