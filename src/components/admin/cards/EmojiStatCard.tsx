"use client";

type EmojiStatCardProps = {
  title: string;
  value: number;
  icon: string;     // emoji
  color?: string;   // Tailwind color class (π.χ. 'bg-blue-500')
};

export default function EmojiStatCard({
  title,
  value,
  icon,
  color = "bg-blue-500",
}: EmojiStatCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-md text-white ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}