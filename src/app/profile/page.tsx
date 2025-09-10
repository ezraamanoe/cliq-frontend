"use client"

import { useProfile, useUpdateProfile } from '@/hooks/profile'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema } from '@/lib/schemas'
import { FormField, FormRow } from '@/components/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loading } from '@/components/components/loading'

export default function ProfilePage() {
  const { data, isLoading } = useProfile()
  const update = useUpdateProfile()
  const form = useForm<z.infer<typeof profileSchema>>({ resolver: zodResolver(profileSchema) })

  useEffect(() => {
    if (data?.profile) {
      form.reset({
        name: data.profile.name,
        email: data.profile.email,
        avatar: data.profile.avatar || '',
      })
    }
  }, [data])

  const onSubmit = async (vals: z.infer<typeof profileSchema>) => {
    await update.mutateAsync(vals)
    toast.success('Profile updated')
  }

  if (isLoading) return <div className="py-8"><Loading /></div>

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormRow>
          <FormField label="Name" error={form.formState.errors.name}>
            <Input {...form.register('name')} />
          </FormField>
          <FormField label="Email" error={form.formState.errors.email}>
            <Input type="email" {...form.register('email')} />
          </FormField>
          <FormField label="Avatar URL" error={form.formState.errors.avatar}>
            <Input placeholder="https://..." {...form.register('avatar')} />
          </FormField>
        </FormRow>
        <Button type="submit" className="w-full">Save</Button>
      </form>
    </div>
  )
}
