"use client"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormField, FormRow } from '@/components/form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (vals: z.infer<typeof loginSchema>) => {
    const res = await signIn('credentials', { redirect: false, ...vals })
    if (res?.ok) {
      toast.success('Logged in')
      router.replace('/')
    } else {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormRow>
          <FormField label="Email" error={form.formState.errors.email}>
            <Input type="email" placeholder="you@example.com" {...form.register('email')} />
          </FormField>
          <FormField label="Password" error={form.formState.errors.password}>
            <Input type="password" placeholder="••••••••" {...form.register('password')} />
          </FormField>
        </FormRow>
        <Button type="submit" className="w-full">Login</Button>
      </form>
      <p className="text-sm text-muted-foreground">No account? <a href="/register" className="underline">Register</a></p>
    </div>
  )
}
