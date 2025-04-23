// src/components/ui/Card.tsx

import { cn } from "@/lib/utils/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function Card({ className, glass = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "card", // ✅ AION utility from globals.css
        glass && "bg-white/10 backdrop-blur-md border-white/20",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-b border-[var(--aion-border)] bg-[var(--aion-card-bg)]",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-800 dark:text-white",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 text-[var(--aion-fg)]", className)} {...props} />
  );
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-[var(--aion-border)] bg-[var(--aion-card-bg)]",
        className
      )}
      {...props}
    />
  );
}