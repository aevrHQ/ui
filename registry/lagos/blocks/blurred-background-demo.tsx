"use client";

import React from "react";
import { BlurredBackground } from "@/registry/lagos/ui/blurred-background";

export default function BlurredBackgroundDemo() {
  return (
    <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]">
      {/* Abstract background blobs for the blur to act on */}
      <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-pink-500/50 mix-blend-multiply blur-xl filter" />
      <div className="absolute top-1/3 right-1/4 h-32 w-32 rounded-full bg-yellow-500/50 mix-blend-multiply blur-xl filter" />
      <div className="absolute bottom-1/4 left-1/3 h-32 w-32 rounded-full bg-purple-500/50 mix-blend-multiply blur-xl filter" />

      <div className="z-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Blurred Background
        </h2>
        <p className="max-w-[400px] text-muted-foreground md:text-xl">
          A layered gradient blur effect for modern interfaces.
        </p>
      </div>

      <BlurredBackground layers={10} maxBlur={12} direction="bottom-to-top" />
    </div>
  );
}
