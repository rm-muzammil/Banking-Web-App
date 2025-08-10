// src/components/ProgressToast.tsx
"use client";

import { useEffect, useState } from "react";

export default function ProgressToast({
  message,
  duration = 5000,
}: {
  message: string;
  duration?: number;
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 50; // update every 50ms
    const step = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg w-72">
      <p>{message}</p>
      <div className="mt-2 h-1 bg-gray-600 rounded">
        <div
          className="h-1 bg-green-400 rounded"
          style={{ width: `${progress}%`, transition: "width 50ms linear" }}
        />
      </div>
    </div>
  );
}
