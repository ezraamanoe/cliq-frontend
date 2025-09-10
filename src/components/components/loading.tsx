import { Progress } from "@/components/components/ui/progress"

export function Loading() {
  return (
    <Progress
      value={null}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 w-1/3 bg-primary animate-[indeterminate_1.5s_infinite]" />
    </Progress>
  )
}