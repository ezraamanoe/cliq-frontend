"use client"

import { useCancelPass, useMyPasses } from '@/hooks/event-hooks'
import { PassCard } from '@/components/pass-card'
import { toast } from 'sonner'
import { Loading } from '@/components/components/loading'

export default function PassesPage() {
  const { data, isLoading } = useMyPasses()
  const cancel = useCancelPass()

  const onCancel = async (id: string) => {
    await cancel.mutateAsync(id)
    toast.info('Pass cancelled')
  }

  return (
    <div className="space-y-4">
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 gap-3">
        {data?.passes?.map((p) => (
          <PassCard key={p.id} pass={p} onCancel={onCancel} />
        ))}
        {!isLoading && !data?.passes?.length && <p className="text-sm text-muted-foreground">No passes yet.</p>}
      </div>
    </div>
  )
}
