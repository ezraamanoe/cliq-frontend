"use client"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/lib/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormField, FormRow } from '@/components/form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function RegisterPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (vals: z.infer<typeof registerSchema>) => {
    // Using credentials signIn as a mock register+login
    const res = await signIn('credentials', { redirect: false, ...vals })
    if (res?.ok) {
      toast.success('Account created')
      router.replace('/')
    } else {
      toast.error('Registration failed')
    }
  }

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormRow>
          <FormField label="Name" error={form.formState.errors.name}>
            <Input placeholder="Jane Doe" {...form.register('name')} />
          </FormField>
          <FormField label="Email" error={form.formState.errors.email}>
            <Input type="email" placeholder="you@example.com" {...form.register('email')} />
          </FormField>
          <FormField label="Password" error={form.formState.errors.password}>
            <Input type="password" placeholder="••••••••" {...form.register('password')} />
          </FormField>
        </FormRow>
        <Button type="submit" className="w-full">Register</Button>
      </form>
      <p className="text-sm text-muted-foreground">Already have an account? <a href="/login" className="underline">Login</a></p>
    </div>
  )
}
