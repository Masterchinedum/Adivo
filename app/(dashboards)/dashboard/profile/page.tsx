// app/dashboard/profile/page.tsx

"use client"

import * as React from "react"
import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "./components/ProfileForm"
import { ProfileSkeleton } from "./components/ProfileSkeleton"
import { ProfileHeader } from "./components/ProfileHeader"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/dashboard/profile")
        if (!response.ok) {
          throw new Error("Failed to load profile")
        }
        const data = await response.json()
        setProfile(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container space-y-8 py-8">
      <ProfileHeader />
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  )
}