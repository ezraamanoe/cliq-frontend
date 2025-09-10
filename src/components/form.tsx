"use client"

import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'

export function FormField({ label, error, children }: { label?: string; error?: FieldError; children: ReactNode }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm">{label}</label>}
      {children}
      {error && <p className="text-xs text-destructive">{String(error.message || 'Invalid')}</p>}
    </div>
  )
}

export function FormRow({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('space-y-3', className)}>{children}</div>
}
