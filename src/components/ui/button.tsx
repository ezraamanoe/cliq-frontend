import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'link'
  size?: 'sm' | 'md' | 'lg'
}

const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none'
const variants: Record<NonNullable<Props['variant']>, string> = {
  default: 'bg-primary text-primary-foreground hover:opacity-90',
  secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
  destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
  outline: 'border border-input bg-transparent hover:bg-accent',
  link: 'bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto',
}
const sizes: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-8 px-3',
  md: 'h-10 px-4',
  lg: 'h-12 px-6',
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, asChild, variant = 'default', size = 'md', ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  )
})
