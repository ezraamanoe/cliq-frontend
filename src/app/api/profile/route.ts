import { NextRequest, NextResponse } from 'next/server'

let profile = {
  id: 'u1',
  name: 'Cliq User',
  email: 'user@example.com',
  avatar: '',
}

export async function GET() {
  return NextResponse.json({ profile })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  profile = { ...profile, ...body }
  return NextResponse.json({ profile })
}
