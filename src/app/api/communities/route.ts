import { NextResponse } from 'next/server'
import { Community } from '@/types'

const communities: Community[] = [
  {
    id: '2',
    name: 'UoM Music Collective',
    description: 'A space for musicians, producers, and singers to collaborate and perform.',
    location: 'Manchester, UK',
    category: 'Music',
    background: 'https://cdn.cosmos.so/2173cf9d-10d2-4a4d-bc00-6f360a7ee205?format=jpeg',
    members: ['3', '4', '5', '6', '7'],
    logo: 'https://cdn.cosmos.so/b06a81ad-6f5e-4775-b299-a11df0c6536c?format=jpeg',
  },
  {
    id: '3',
    name: 'Sustainable Living Group',
    description: 'Workshops and events focused on eco-friendly practices and green innovation.',
    location: 'London, UK',
    category: 'Environment',
    background: 'https://cdn.cosmos.so/ccaa5890-8d77-4925-afe5-c74b3b1f4834?format=jpeg',
    members: ['10', '11', '12', '13'],
    logo: 'https://cdn.cosmos.so/98fbbb0e-04d2-4d14-90f1-d200daab2360?format=jpeg'
  },
  {
    id: '4',
    name: 'Women in Business',
    description: 'Networking and mentorship community for aspiring women entrepreneurs.',
    location: 'London, UK',
    category: 'Business',
    background: 'https://cdn.cosmos.so/1ea99882-fbbe-4eac-986b-0749521cae16?format=jpeg',
    members: ['14', '15', '16', '17'],
    logo:'https://cdn.cosmos.so/eeec4d64-0199-44a4-bc1e-ba9aa077dfa4?format=jpeg'
  },
  {
    id: '5',
    name: 'Global Foodies',
    description: 'Explore different cuisines every month with food tours and cook-alongs.',
    location: 'Manchester, UK',
    category: 'Food',
    background: 'https://cdn.cosmos.so/3fdb1ad9-3320-471b-b379-b7443a12fbd4?format=jpeg',
    members: ['18', '19', '20'],
    logo:'https://cdn.cosmos.so/6f5e5c87-69c4-4efa-8c8b-a6ee8c55b06b?format=jpeg'
  },
  {
    id: '6',
    name: 'Adventure Hiking Club',
    description: 'Weekend trips to the best hiking trails around the UK.',
    location: 'Lake District, UK',
    category: 'Outdoors',
    background: 'https://cdn.cosmos.so/23f1d023-bfa9-4352-85be-31df6cb6a97e?format=jpeg',
    members: ['21', '22', '23', '24', '25'],
    logo:'https://cdn.cosmos.so/1e2f6abd-ffc1-41db-bc2e-0d3f5f755e82?format=jpeg'
  },
]

export async function GET() {
  return NextResponse.json({ communities })
}
