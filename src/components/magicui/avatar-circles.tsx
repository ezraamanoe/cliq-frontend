"use client";

import { cn } from "@/lib/utils";

interface Avatar {
  imageUrl: string;
  profileUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("py-2 z-10 flex -space-x-0.5 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            key={index}
            className="h-5 w-5 rounded-full"
            src={url.imageUrl}
            width={5}
            height={5}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <a
          className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-center text-[6px] font-light text-white border-1 border-muted-foreground"
          href=""
        >
          +{numPeople}
        </a>
      )}
    </div>
  );
};
