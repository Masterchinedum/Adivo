// app/(dashboards)/admindash/components/AdminSidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  BarChart2,
  MessageSquare,
  HelpCircle,
} from "lucide-react"

const sidebarLinks = [
  {
    title: "Overview",
    href: "/admindash",
    icon: LayoutDashboard
  },
  {
    title: "Users",
    href: "/admindash/users",
    icon: Users
  },
  {
    title: "Tests",
    href: "/admindash/tests",
    icon: FileText
  },
  {
    title: "Analytics",
    href: "/admindash/analytics",
    icon: BarChart2
  },
  {
    title: "Feedback",
    href: "/admindash/feedback",
    icon: MessageSquare
  },
  {
    title: "Settings",
    href: "/admindash/settings",
    icon: Settings
  },
  {
    title: "Help",
    href: "/admindash/help",
    icon: HelpCircle
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admindash" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">Admin Panel</span>
        </Link>
      </div>
      
      <div className="py-4 px-4">
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}