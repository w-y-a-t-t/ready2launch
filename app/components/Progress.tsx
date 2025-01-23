"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface ProgressProps {
  isOpen: boolean;
  onComplete: () => void;
}

export default function Progress({ isOpen, onComplete }: ProgressProps) {
  const [progress, setProgress] = useState<number | string>(5); // Allow number or string
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setProgress(5);
      setMessage("");
      return;
    }

    // Set initial progress and message
    setProgress(5);
    setMessage("Deploying AI agents to review your site");

    const intervals = [
      {
        progress: 25,
        time: 2000,
        message: "Evaluating SEO and engagement metrics",
      },
      {
        progress: 50,
        time: 4000,
        message: "Modeling conversion probability algorithms",
      },
      {
        progress: 75,
        time: 6000,
        message: "Analyzing semantic web metrics for growth opportunity",
      },
      {
        progress: 100,
        time: 8000,
        message: "Constructing tailored optimization strategy",
      },
      {
        progress: "Done!",
        time: 10000,
        message: "Report ready!",
      },
    ];

    const timeouts: NodeJS.Timeout[] = intervals.map(
      ({ progress, time, message }) =>
        setTimeout(() => {
          setProgress(progress);
          setMessage(message);
          if (progress === "Done!") {
            // Set cookie using js-cookie
            setTimeout(() => {
              Cookies.set("report_Generated", "true", { path: "/" }); // Create cookie using js-cookie
              window.location.href = "/your-report";
              onComplete();
            }, 2000);
          }
        }, time)
    );

    return () => {
      // Clear all timeouts if component unmounts or `isOpen` changes
      timeouts.forEach(clearTimeout);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative min-h-[80vh] bg-white rounded-[30px] md:rounded-[40px] p-4 sm:p-6 md:p-8 xl:p-[40px] 3xl:p-[50px] w-full max-w-[95%] sm:max-w-[85%] md:max-w-[600px] xl:max-w-[900px] 3xl:max-w-[1080px] mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-[40px] xl:text-[70px] 3xl:text-[100px] font-bold text-[#252A2E] mb-[10px] md:mb-[20px] xl:mb-[40px] 3xl:mb-[80px] md:pt-3">
          Processing
        </h2>
        <p className="text-[#5E656C] text-[14px] md:text-[16px] lg:text-lg xl:text-xl 3xl:text-[32px] mb-6 sm:mb-8 md:mb-[30px] 3xl:mb-[74px] text-[#252A2E]">
          Hang tight, we're getting your customized report ready now!
        </p>
        <p className="text-center italic text-[14px] md:text-[16px] lg:text-lg xl:text-xl 3xl:text-[24px] mb-2 md:mb-3 lg:mb-4 3xl:mb-[30px] px-2 text-[#252A2E]">
          {message}
        </p>

        <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] 3xl:h-[400px] 3xl:w-[400px] mx-auto mb-4 sm:mb-6 3xl:mb-8">
          {/* Progress Circle */}
          <svg className="w-full h-full -rotate-90 transform">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="stroke-[#eee] fill-none"
              strokeWidth="15"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="stroke-cyan fill-none transition-all duration-500 ease-linear"
              strokeWidth="15"
              strokeDasharray={`${2 * Math.PI * 45}%`}
              strokeDashoffset={`${
                typeof progress === "number"
                  ? 2 * Math.PI * 45 * (1 - progress / 100)
                  : 0
              }%`}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.5s linear", // Smooth animation
              }}
            />
          </svg>

          {/* Percentage Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-3xl sm:text-4xl md:text-[64px] 3xl:text-[100px] font-bold text-black">
              {typeof progress === "number" ? `${progress}%` : progress}
            </span>
          </div>
        </div>
        <p className="text-center text-xs lg:text-[14px] 3xl:text-[18px] text-[#252A2E]">
          This should take about 60s
        </p>
      </div>
    </div>
  );
}
