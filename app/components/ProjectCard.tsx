// app/components/ProjectCard.tsx
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export interface WebProject {
  _id: string;
  name: string;
  link: string;
  image: string;  // Changed from StaticImageData to string
  description: string;
  techStack: string[];
}

export interface ScientificProject {
  _id: string;
  title: string;
  link: string;
  image: string;  // Changed from StaticImageData to string
  abstract: string;
  projectType: string;
  tags: string[];
}

interface WebProjectCardProps {
  project: WebProject;
}

interface ScientificProjectCardProps {
  project: ScientificProject;
}

export const WebProjectCard: React.FC<WebProjectCardProps> = ({ project }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <div className="flex justify-between items-start mb-4">
          <CardTitle className="text-xl">{project.name}</CardTitle>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        <CardDescription className="mb-4">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <Badge key={i} variant="secondary">{tech}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const ScientificProjectCard: React.FC<ScientificProjectCardProps> = ({ project }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <div className="flex items-center gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <Badge variant="default">{project.projectType}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative w-full aspect-video">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-muted-foreground mb-4 line-clamp-6">{project.abstract}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <Badge key={i} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};