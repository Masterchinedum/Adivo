// app/components/ProjectShowcase.tsx
import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestTube, Code } from "lucide-react";
import { WebProjectCard, ScientificProjectCard } from './ProjectCard';
import { SanityClient } from '@/app/sanity/client';
import { getWebProjectsQuery, getScientificProjectsQuery } from '@/app/sanity/sanity.queries';
import type { WebProject, ScientificProject } from '@/app/types/project';
import { urlForImage } from '@/app/sanity/sanity.image';
import { Skeleton } from "@/components/ui/skeleton";

// Loading skeleton component for projects
const ProjectsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex flex-col space-y-3">
        <Skeleton className="h-48 w-full rounded-t-lg" />
        <div className="p-6 space-y-3">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((j) => (
              <Skeleton key={j} className="h-6 w-16" />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

async function getProjects() {
  const webProjects = await SanityClient.fetch<WebProject[]>(
    getWebProjectsQuery,
    {},
    {
      next: { revalidate: 600 } // Revalidate every 10 minutes
    }
  );

  const scientificProjects = await SanityClient.fetch<ScientificProject[]>(
    getScientificProjectsQuery,
    {},
    {
      next: { revalidate: 600 }
    }
  );

  return {
    webProjects,
    scientificProjects
  };
}

const ProjectShowcase = async () => {
  const { webProjects, scientificProjects } = await getProjects();

  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-t from-background to-muted" id='projects'>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of web development and biochemistry through innovative projects
          </p>
        </div>

        <Tabs defaultValue="web" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="web" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Web Development
              <span className="ml-2 text-xs bg-primary/10 px-2 py-1 rounded-full">
                {webProjects.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="scientific" className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Scientific Research
              <span className="ml-2 text-xs bg-primary/10 px-2 py-1 rounded-full">
                {scientificProjects.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <Suspense fallback={<ProjectsSkeleton />}>
            <TabsContent value="web" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {webProjects.map((project) => (
                  <WebProjectCard
                    key={project._id}
                    project={{
                      ...project,
                      image: urlForImage(project.mainImage)
                    }}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scientific">
              <div className="grid grid-cols-1 gap-6">
                {scientificProjects.map((project) => (
                  <ScientificProjectCard
                    key={project._id}
                    project={{
                      ...project,
                      image: urlForImage(project.mainImage)
                    }}
                  />
                ))}
              </div>
            </TabsContent>
          </Suspense>
        </Tabs>
      </div>
    </section>
  );
};

export default ProjectShowcase;