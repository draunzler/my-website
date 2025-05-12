"use client"

import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-end px-4">
        <nav className="flex items-center">
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
} 