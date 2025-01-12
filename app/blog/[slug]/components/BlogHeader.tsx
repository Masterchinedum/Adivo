// app/blog/[slug]/components/BlogHeader.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock } from "lucide-react"
import { BlogHeaderProps } from "@/types/blog"
import Link from "next/link"

export default function BlogHeader({
  title,
  author,
  publishedAt,
  readTime,
  categories,
}: BlogHeaderProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="mb-12">
      <h1 className="text-4xl font-bold tracking-tight mb-6">{title}</h1>
      
      <div className="flex items-center gap-6 mb-6">
        {author && (
          <Link href={`/author/${author.slug.current}`} className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.image?.asset?._ref} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{author.name}</p>
              {author.role && <p className="text-sm text-muted-foreground">{author.role}</p>}
            </div>
          </Link>
        )}
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      {categories?.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Link href={`/blog/category/${category.slug.current}`} key={category._id}>
              <Badge variant="secondary">{category.title}</Badge>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}