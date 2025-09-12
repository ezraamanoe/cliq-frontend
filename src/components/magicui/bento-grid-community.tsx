"use client";

import { ArrowRightIcon, HeartIcon } from "lucide-react"
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Badge } from "@/components/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarCirclesDemo } from "../avatar-circles-demo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/components/ui/avatar";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  description: string;
  category: string;
  members: string[];
  location: string;
  href: string;
  logo: string;
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
  description,
  category,
  members,
  background,
  logo,
  location,
  href,
  ...props
}: BentoCardProps) => {

  return (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
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

    <Avatar className="absolute w-10 h-10 top-4 right-4 z-20">
      <AvatarImage src={logo} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    
    <div className="absolute inset-x-0 bottom-0 z-10 p-4">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 group-hover:-translate-y-2">
        <h3 className="text-2xl font-semibold text-white">
          {name}
        </h3>
        <div>
          <p className="max-w-lg text-neutral-200 font-light">{category}</p>
          <p className="max-w-lg text-neutral-400 font-light">{location}</p>
        </div>
        <div className="flex justify-between">
          <AvatarCirclesDemo />
        </div>
      </div>

      {/* CTA row that fades in on hover (tight spacing) */}
      <div className="mt-1 flex items-center justify-between opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <Button variant="link" asChild size="sm" className="pointer-events-auto p-0 text-white">
          <a href={href} className="inline-flex items-center">
            View community
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
  );
}

export { BentoCard, BentoGrid };
