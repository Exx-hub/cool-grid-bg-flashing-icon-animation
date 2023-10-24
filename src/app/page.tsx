"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { assets } from "@/utils/asset-utils";
import { type Framework, frameworks } from "@/utils/framework-utils";
import { cn } from "@/utils/tailwind-utils";
import FrameworkRotation from "@/components/framework-rotation";
import { CountdownTimer } from "@/components/countdown-timer";
import { Cursor } from "@/components/cursor";

const poppins = Poppins({
  weight: "700",
  subsets: ["latin"],
});

export default function Home() {
  const [currentFramework, setCurrentFramework] = useState<Framework>(frameworks[0]);
  const [showBg, setShowBg] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setShowBg(true);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const rotateFrameworks = () => {
      setCurrentFramework(frameworks[currentIndex]);
      currentIndex = (currentIndex + 1) % frameworks.length;
      // can use this to cycle through numbers of array length, from 0 to array length then back to zero and count up again
    };

    const id = setInterval(rotateFrameworks, 2000);

    return () => clearInterval(id);
  }, []);
  return (
    <main>
      {/* changing color overlay  */}
      <div
        className={cn("fixed inset-0 transition-colors delay-100 duration-700 opacity-[.15]", {
          "bg-purple-300": currentFramework === "qwik",
          "bg-sky-300": currentFramework === "safari",
          "bg-yellow-300": currentFramework === "chrome",
          "bg-teal-300": currentFramework === "tailwind",
          "bg-blue-300": currentFramework === "react",
          "bg-green-300": currentFramework === "vue",
          "bg-orange-400": currentFramework === "svelte",
          "bg-red-300": currentFramework === "mobile",
          "bg-neutral-300": currentFramework === "desktop",
        })}
      />

      {/* grid boxes  */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url(${assets.square})`,
          backgroundSize: "30px",
        }}
      ></div>

      {/* gradient bg  */}
      <Image
        src={assets.gradient}
        width={1200}
        height={1200}
        role="presentation"
        alt="gradient background"
        className="fixed inset-0 w-screen h-screen object-cover"
      />

      {/* Reveal */}
      <div
        className={cn(
          "bg-black fixed inset-0 transition-opacity duration-1000",
          !showBg ? "opacity-100" : "opacity-0"
        )}
      />

      {/* HEADING  */}
      <div className="max-w-7xl mt-20 mx-auto">
        <div className="flex flex-col items-center relative z-10">
          <h1 className={`text-5xl max-w-3xl text-center leading-snug mb-12 ${poppins.className}`}>
            <Image
              alt="figma logo"
              className="inline-block mr-8 -mt-2"
              src={assets.figma}
              width={50}
              height={50}
            />
            to <FrameworkRotation currentFramework={currentFramework} /> will{" "}
            <span
              className={cn("transition-colors delay-100 duration-500", {
                "text-purple-300": currentFramework === "qwik",
                "text-sky-300": currentFramework === "safari",
                "text-yellow-300": currentFramework === "chrome",
                "text-teal-300": currentFramework === "tailwind",
                "text-blue-300": currentFramework === "react",
                "text-green-300": currentFramework === "vue",
                "text-orange-400": currentFramework === "svelte",
                "text-red-300": currentFramework === "mobile",
                "text-neutral-300": currentFramework === "desktop",
              })}
            >
              never
            </span>{" "}
            be the same again
          </h1>

          {/* Sub heading */}
          <p className="mb-8">
            <span className="text-gray-300">Join us for an AI launch event by </span>
            <Image
              alt="Builder.io logo"
              className="inline-block ml-1 -mt-1"
              width={100}
              height={20}
              src={assets.builder}
            />
            {" + "}
            <Image
              alt="Figma logo"
              className="inline-block mx-1"
              width={55}
              height={20}
              src={assets.figmatwo}
            />
          </p>

          {/* Claim ticket button */}
          <div className="mb-8">
            <button
              ref={buttonRef}
              className={cn(
                "text-black px-6 py-3 rounded-md text-sm font-semibold transition-colors duration-200",
                {
                  "bg-purple-300": currentFramework === "qwik",
                  "bg-sky-300": currentFramework === "safari",
                  "bg-yellow-300": currentFramework === "chrome",
                  "bg-teal-300": currentFramework === "tailwind",
                  "bg-blue-300": currentFramework === "react",
                  "bg-green-300": currentFramework === "vue",
                  "bg-orange-400": currentFramework === "svelte",
                  "bg-red-300": currentFramework === "mobile",
                  "bg-neutral-300": currentFramework === "desktop",
                }
              )}
            >
              Claim Ticket
            </button>

            {/* Countdown timer */}
            <CountdownTimer currentFramework={currentFramework} />
          </div>
        </div>
      </div>

      <Cursor buttonRef={buttonRef} />
    </main>
  );
}

// 1st add the grid
// so these box images with transparent bottom and right side are used as bg image for the div, which has default behavior of repeating, so the bg image size is 30px each and will repeat and span throughtout the whole screen and the transparent bottom and right side will act like "border" and will create a grid.

// 2nd add the gradient over the grid

// install clsx and tailwind-merge, and create tailwind-utils.ts to create merging classnames
