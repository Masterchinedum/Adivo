import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Code2, Microscope, BrainCircuit } from "lucide-react";

const AboutSection = () => {
const webSkills = [
    "HTML", "JavaScript", "TypeScript", "React", "WordPress", 
    "MongoDB", "PostgreSQL", "Prisma", "MySQL", 
    "Tailwind", "CSS5", "SASS", "Bootstrap",
    "Next.js", "Node.js", "Express", "GraphQL", "Redux",
    "Jest", "Cypress", "Webpack", "Babel", "Docker",
];

  const bioSkillCategories = [
    {
      title: "Technical Laboratory Skills",
      skills: [
        "PCR", "DNA/RNA extraction", "Gel electrophoresis", "Gene cloning",
        "HPLC", "Mass spectrometry", "UV/Vis spectroscopy",
        "Western blotting", "ELISA", "Protein purification",
        "Fluorescence microscopy", "Cell culture"
      ]
    },
    {
      title: "Data Analysis",
      skills: [
        "SPSS", "R", "Python for biology", "Bioinformatics",
        "Sequence analysis", "Protein modeling", "BLAST", "PDB",
        "Quantitative interpretation"
      ]
    },
    {
      title: "Research & Tools",
      skills: [
        "MATLAB", "GraphPad Prism", "ImageJ", "Experimental design",
        "Scientific documentation", "Lab automation", "Data modeling"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-background to-muted" id='#about'>
      <div className="max-w-7xl mx-auto space-y-12 text-center">
        {/* Introduction */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="text-lg text-muted-foreground">
            Hello there! I&apos;m <span className="font-semibold text-primary">Chinedu Kingsley Okereke</span>, 
            a unique blend of web developer and biochemist. I graduated with a BSc in Biochemistry 
            from the Federal University of Agriculture Abeokuta, and I&apos;ve cultivated expertise in 
            both laboratory sciences and modern web development.
            </p>
            <p className="text-lg text-muted-foreground">
            What sets me apart is my ability to bridge the gap between scientific research and 
            technological innovation, complemented by my enthusiasm for finance and asset management.
            </p>
          </div>
          

        {/* Expertise Tabs */}
        <Tabs defaultValue="web" className="w-full">
          <div className="flex flex-col items-center mb-8">
            <h3 className="text-2xl font-bold mb-6">Areas of Expertise</h3>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="web" className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Web Development
              </TabsTrigger>
              <TabsTrigger value="bio" className="flex items-center gap-2">
                <Microscope className="w-4 h-4" />
                Biochemistry
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="web" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {webSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bio" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bioSkillCategories.map((category, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4" />
                      {category.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Value Proposition */}
        <Card className="bg-primary/10 border-none">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">What Makes Me Unique</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                • Bridging scientific research with modern web development
              </li>
              <li className="flex items-start gap-2">
                • Combining analytical laboratory expertise with technical programming skills
              </li>
              <li className="flex items-start gap-2">
                • Understanding of both scientific data analysis and web-based data visualization
              </li>
              <li className="flex items-start gap-2">
                • Additional perspective from finance and asset management background
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;