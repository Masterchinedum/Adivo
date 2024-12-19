'use client'


import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { 
  CalendarDays, 
  Settings, 
  PlusCircle,
  BookOpen
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardHeader() {
  const { user, isLoaded } = useUser();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (!isLoaded) {
    return (
      <div className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4 flex-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {getGreeting()}, {user?.firstName || 'there'}
            </span>
            <span className="text-xs text-muted-foreground">
              Last signed in: {new Date(user?.lastSignInAt || '').toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Tests
          </Button>
          <Button variant="ghost" size="sm">
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <UserButton />
        </div>
      </div>
    </div>
  );
}