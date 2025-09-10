import { Pass } from '@/types'
import { Button } from '@/components/ui/button'
import { QRCodeDisplay } from '@/components/qr-code-display'

export function PassCard({ pass, onCancel }: { pass: Pass; onCancel?: (id: string) => void }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{pass.eventTitle}</div>
          <div className="text-sm text-muted-foreground">{new Date(pass.startTime).toLocaleString()}</div>
          <div className="text-xs mt-1">Status: {pass.status}</div>
        </div>
        <QRCodeDisplay value={pass.qr} />
      </div>
      {pass.status === 'reserved' && (
        <div className="mt-3">
          <Button variant="outline" onClick={() => onCancel?.(pass.id)}>Cancel Pass</Button>
        </div>
      )}
    </div>
  )
}
