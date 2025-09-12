import { Community } from '@/types'
import { BentoCard } from './magicui/bento-grid-community'
import { cn } from '@/lib/utils'
import { CSSProperties } from 'react'

export function CommunityCard({ community, className, style }: { community: Community; className?: string; style?: CSSProperties }) {
  return (
    <BentoCard
      name={community.name}
      href={`/communities/${community.id}`}
      description={community.description}
      category={community.category}
      members={community.members}
      location={community.location}
      className={cn('w-[290px] h-[320px]', className)}
      style={style} 
      background={<img src={community.background} alt="" className="h-full w-full object-cover" />}
      logo={community.logo}
    />
  )
}