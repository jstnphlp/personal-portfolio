/* eslint-disable react-hooks/set-state-in-effect -- meteor positions require initial client-side generation */
/* eslint-disable react-hooks/refs -- styles are generated once and cached in ref for stable rendering */
"use client"

import React, { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
  meteorColor?: string
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
  meteorColor,
}: MeteorsProps) => {
  const [ready, setReady] = useState(false)
  const stylesRef = useRef<React.CSSProperties[]>([])

  useEffect(() => {
    stylesRef.current = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s",
    }))
    setReady(true)
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle])

  if (!ready) return null

  return (
    <>
      {stylesRef.current.map((style, idx) => (
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]",
            className,
          )}
        >
          <div
            className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent"
            style={meteorColor ? { background: `linear-gradient(to right, ${meteorColor}, transparent)` } : undefined}
          />
        </span>
      ))}
    </>
  )
}
