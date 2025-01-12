// app/blog/[slug]/components/AuthorCard.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import { AuthorCardProps } from "@/types/blog"
import { PortableText } from "@portabletext/react"

export default function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={author.image?.asset?._ref} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{author.name}</CardTitle>
          {author.role && <CardDescription>{author.role}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent>
        {author.bio && (
          <div className="mb-4 text-muted-foreground">
            <PortableText value={author.bio} />
          </div>
        )}
        
        {author.social && (
          <div className="flex gap-2">
            {author.social.twitter && (
              <Button variant="outline" size="icon" asChild>
                <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            )}
            {author.social.linkedin && (
              <Button variant="outline" size="icon" asChild>
                <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            )}
            {author.social.github && (
              <Button variant="outline" size="icon" asChild>
                <a href={author.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}