"use client";

import React from "react";
import clsx from "clsx";

type StatCardProps = {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string; // Tailwind bg class
  footer?: React.ReactNode;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
};

export default function StatCard({
  title,
  value,
  icon,
  color,
  footer,
  change,
  changeType = "neutral",
}: StatCardProps) {
  const changeColor = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-gray-400 dark:text-gray-500",
  };

  const changeIcon = {
    positive: "▲",
    negative: "▼",
    neutral: "◆",
  };

  const valueFormatted =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div
      className={clsx(
        "rounded-xl p-6 shadow-md transition group hover:shadow-lg flex flex-col justify-between",
        color || "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {valueFormatted}
          </h2>
        </div>
        {icon && (
          <div className="text-4xl opacity-80 group-hover:scale-105 transition">
            {icon}
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className={clsx("text-sm mt-2", changeColor[changeType])}>
          <span>{changeIcon[changeType]} </span>
          <span>
            {change > 0 ? "+" : ""}
            {change}% από τον προηγούμενο μήνα
          </span>
        </div>
      )}

      {footer && (
        <div className="text-xs opacity-70 mt-4">{footer}</div>
      )}
    </div>
  );
}