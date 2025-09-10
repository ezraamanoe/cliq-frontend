"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { reservePassSchema } from '@/lib/schemas'

export function ReservePassModal({
  open,
  onOpenChange,
  onSubmit,
  eventTitle,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSubmit: (values: z.infer<typeof reservePassSchema>) => void
  eventTitle: string
}) {
  const form = useForm<z.infer<typeof reservePassSchema>>({
    resolver: zodResolver(reservePassSchema),
    defaultValues: { attendees: 1 },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reserve Pass - {eventTitle}</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-3"
          onSubmit={form.handleSubmit((vals) => {
            onSubmit(vals)
            onOpenChange(false)
          })}
        >
          <div className="space-y-1">
            <label className="text-sm">Attendees</label>
            <Input type="number" min={1} max={10} {...form.register('attendees', { valueAsNumber: true })} />
            {form.formState.errors.attendees && (
              <p className="text-xs text-destructive">{form.formState.errors.attendees.message as string}</p>
            )}
          </div>
          <Button type="submit" className="w-full">Reserve</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
