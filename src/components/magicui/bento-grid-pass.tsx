import { ArrowRightIcon, HeartIcon} from "lucide-react"
import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import { Badge } from "../components/ui/badge";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  venue: string;
  date: string;
  href: string;
  startTime: string;
  endTime: string;
  price: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  venue,
  date,
  href,
  startTime,
  endTime,
  price,
  ...props
}: BentoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
  <div
    key={name}
    className={cn(
      "relative flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props}
  >
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0">{background}</div>
      {/* Bottom gradient overlay from black to transparent */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 shadow-[inset_0_0_60px_0px_rgba(0,0,0,0.8)]" />
    </div>
    <div className="absolute inset-x-0 bottom-0 z-10 p-4">
      {/* Info block that moves up slightly on hover */}
      <div className="pointer-events-none z-10 flex flex-col gap-1">
        <h3 className="text-2xl font-semibold text-white">
          {name}
        </h3>
        <div>
          <p className="max-w-lg text-yellow-300 font-light">{date}</p>
          <p className="max-w-lg text-neutral-200 font-light">{startTime}-{endTime}</p>
          <p className="max-w-lg text-neutral-400 font-light">{venue}</p>
        </div>
        <div>
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20">{price}</Badge>
        </div>
      </div>
    </div>

    <div className="pointer-events-none absolute inset-0" />
  </div>
  );
}

export { BentoCard, BentoGrid };
