"use client"

import * as React from "react"
import { type DateRange } from "react-day-picker"

import { Calendar } from "@/components/components/ui/calendar"

interface Calendar04Props {
  onSelect?: (range: DateRange | undefined) => void
}

export default function Calendar04({ onSelect, dateRange }: Calendar04Props & { dateRange?: DateRange }) {
  return (
    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={onSelect}
    />
  )
}
