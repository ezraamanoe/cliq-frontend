"use client"

import { Briefcase, Calendar, CloudMoon, Dumbbell, Handshake, Flame, Globe, Music, Palette} from 'lucide-react'

interface CategoryFilterProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
  categories: string[]
}

const iconClass = "w-10 h-10"

const categoryIcons: Record<string, JSX.Element> = {
  'All': <Globe strokeWidth="0.75" className={iconClass} />,
  'Tonight': <CloudMoon strokeWidth="0.75" className={iconClass} />,
  'This Week': <Calendar strokeWidth="0.75" className={iconClass} />,
  'Music': <Music strokeWidth="0.75" className={iconClass} />,
  'Social': <Handshake strokeWidth="0.75" className={iconClass} />,
  'Business': <Briefcase strokeWidth="0.75" className={iconClass} />,
  'Sports': <Dumbbell strokeWidth="0.75" className={iconClass} />,
  'Art': <Palette strokeWidth="0.75" className={iconClass} />,
  'Hot': <Flame strokeWidth="0.75" className={iconClass} />
}

export function CategoryFilter({ selectedCategory, onSelectCategory, categories }: CategoryFilterProps) {
  return (
    <div className="relative">
      <div className="flex items-start pb-2 overflow-x-auto no-scrollbar">
        {['All', 'Tonight', 'This Week'].map((category) => (
          <div key={category} className="flex flex-col items-center">
            <button
              onClick={() => onSelectCategory(category === 'All' ? 'all' : category)}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                (selectedCategory === 'all' && category === 'All') || selectedCategory === category
                  ? 'bg-black text-muted-foreground' 
                  : 'bg-black text-foreground'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                {categoryIcons[category]}
                <span className='text-sm'>{category}</span>
              </div>
            </button>
          </div>
        ))}
        
        {categories.filter(cat => !['All', 'Tonight', 'This Week'].includes(cat)).map((category) => (
          <div key={category} className="flex flex-col items-center">
            <button
              onClick={() => onSelectCategory(category)}
              className={`flex flex-col items-center justify-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category 
                  ? 'bg-black text-muted-foreground' 
                  : 'bg-black text-foreground'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                {categoryIcons[category]}
                <span className='text-sm'>{category}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
