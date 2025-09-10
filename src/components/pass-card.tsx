import { Pass } from '@/types'
import { Button } from '@/components/ui/button'
import { QRCodeDisplay } from '@/components/qr-code-display'
import { BentoCard } from './magicui/bento-grid-pass'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/components/ui/tabs'
import { Card } from '@/components/components/ui/card'

interface PassCardProps {
  pass: Pass;
  onCancel?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function PassCard({ pass, onCancel, className = '', style = {} }: PassCardProps) {
  return (
    <Card className={cn('p-4', className)}>
      <Tabs defaultValue="Event">
      <TabsList>
        <TabsTrigger value="Event">Event</TabsTrigger>
        <TabsTrigger value="Pass">Pass</TabsTrigger>
      </TabsList>
      <TabsContent value="Event">
        <BentoCard
          name={pass.eventTitle}
          date={pass.date}
          startTime={pass.startTime}
          endTime={pass.endTime}
          href={`/passes/${pass.id}`}
          price={pass.status}
          venue={pass.venue}
          className={cn('w-[290px] h-[320px]', className)}
          style={style} 
          background={<img src={pass.background} alt="" className="h-full w-full object-cover" />}
        />
      </TabsContent>
      <TabsContent value="Pass">
        <QRCodeDisplay value={pass.qr} />
      </TabsContent>
    </Tabs>
    </Card>
  )
}
