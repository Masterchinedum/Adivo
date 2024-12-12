"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  return (
    <nav className="border-b dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold dark:text-white">
          Relationship Matrix
        </Link>
        <div className="flex items-center space-x-4">
          <Link 
            href="/tests" 
            className="hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-200"
          >
            Tests
          </Link>
          <Link 
            href="/about" 
            className="hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-200"
          >
            About
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}