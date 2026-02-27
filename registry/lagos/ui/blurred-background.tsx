"use client";

import React from "react";

type BlurDirection =
  | "top-to-bottom"
  | "bottom-to-top"
  | "left-to-right"
  | "right-to-left";

interface BlurredBackgroundProps {
  layers?: number;
  maxBlur?: number;
  direction?: BlurDirection;
  className?: string;
}

export function BlurredBackground({
  layers = 10,
  maxBlur = 10,
  direction = "bottom-to-top",
  className,
}: BlurredBackgroundProps = {}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${className || ""}`}
    >
      {Array.from({ length: layers }).map((_, index) => {
        const blurAmount = (index / (layers - 1)) ** 2 * maxBlur;
        const startPercent = (index / layers) * 100;
        const endPercent = ((index + 1) / layers) * 100;

        let gradientDirection: string;
        switch (direction) {
          case "top-to-bottom":
            gradientDirection = "to bottom";
            break;
          case "left-to-right":
            gradientDirection = "to right";
            break;
          case "right-to-left":
            gradientDirection = "to left";
            break;
          default: // bottom-to-top
            gradientDirection = "to top";
        }

        return (
          <div
            key={index}
            className={`absolute inset-0 w-full ${className || ""}`}
            style={{
              backdropFilter: `blur(${blurAmount.toFixed(6)}px)`,
              WebkitBackdropFilter: `blur(${blurAmount.toFixed(6)}px)`,
              maskImage: `linear-gradient(${gradientDirection}, rgba(0, 0, 0, 0) ${startPercent}%, rgb(0, 0, 0) ${endPercent}%)`,
              WebkitMaskImage: `linear-gradient(${gradientDirection}, rgba(0, 0, 0, 0) ${startPercent}%, rgb(0, 0, 0) ${endPercent}%)`,
              zIndex: index + 1,
            }}
          />
        );
      })}
    </div>
  );
}
