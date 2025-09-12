"use client"

import { Highlighter } from "@/components/magicui/highlighter"
import { Button } from "@/components/components/ui/button"

export default function HomePage() {
  return (
<div className="flex flex-col min-h-screen bg-[url('https://cdn.cosmos.so/430ae91c-17ec-4ed7-9335-4d30d866c5c1?format=jpeg')] bg-cover bg-center bg-no-repeat text-white">
  <div className="flex flex-col flex-1 py-40 items-center gap-8 px-10 text-center bg-black/40">
    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-anton leading-tight text-center">
      FIND YOUR{" "}
      <Highlighter
        action="highlight"
        color="#fde047"
        strokeWidth={2}
        iterations={2}
        padding={25}
        multiline={false}
        animationDuration={1000}
        isView={true}
      >
        CLIQ
      </Highlighter>
    </h1>
    <p className="max-w-2xl text-lg md:text-xl font-light text-center">
      Find your scene. Book in seconds. Cliq connects you to the city.
    </p>
    <div className="flex gap-2 justify-center">
      <Button variant="outline">Login</Button>
      <Button>Browse Events</Button>
    </div>
  </div>
</div>
  )
}