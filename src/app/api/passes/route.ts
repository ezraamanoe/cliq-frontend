import { NextRequest, NextResponse } from 'next/server'
import { Pass } from '@/types'

let passes: Pass[] = [
  {
    id: 'p1',
    eventId: '1',
    eventTitle: 'Sunset Rooftop Mixer',
    startTime: new Date(Date.now() + 86400000).toISOString(),
    status: 'reserved',
    qr: 'QR-P1',
  },
]

export async function GET() {
  return NextResponse.json({ passes })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newPass: Pass = {
    id: Math.random().toString(36).slice(2),
    eventId: body.eventId,
    eventTitle: body.eventTitle,
    startTime: body.startTime,
    status: 'reserved',
    qr: 'QR-' + Date.now(),
  }
  passes = [newPass, ...passes]
  return NextResponse.json({ pass: newPass }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  passes = passes.map((p) => (p.id === id ? { ...p, status: 'cancelled' } : p))
  return NextResponse.json({ ok: true })
}
