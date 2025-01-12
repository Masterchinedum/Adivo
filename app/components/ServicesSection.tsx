import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code2,
  TestTube,
  FileText,
  Users,
  Database,
  Brain,
  LineChart,
  Search,
  Layout,
  Server,
  Microscope,
  BookOpen,
  Lightbulb,
  GraduationCap
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description }) => (
  <Card className="group hover:shadow-lg transition-all duration-300">
    <CardHeader>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
);

const ServicesSection = () => {
  const services = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Custom web applications, APIs, and responsive websites using modern technologies like React, Next.js, and Node.js."
    },
    {
      icon: TestTube,
      title: "Scientific Consulting",
      description: "Expert guidance on biochemistry research, experimental design, and laboratory protocols optimization."
    },
    {
      icon: FileText,
      title: "Technical Writing",
      description: "Documentation, research papers, technical blogs, and scientific content creation with expert domain knowledge."
    },
    {
      icon: Users,
      title: "Research Collaboration",
      description: "Partnership on interdisciplinary projects combining web technology with biochemistry research."
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Scientific database architecture, laboratory information management systems (LIMS), and data modeling."
    },
    {
      icon: Brain,
      title: "AI/ML Integration",
      description: "Implementation of machine learning models for scientific data analysis and prediction."
    },
    {
      icon: LineChart,
      title: "Data Visualization",
      description: "Interactive dashboards and visualizations for complex scientific data using D3.js and other modern tools."
    },
    {
      icon: Search,
      title: "Research Analysis",
      description: "Literature review, data analysis, and interpretation of scientific research findings."
    },
    {
      icon: Layout,
      title: "UI/UX for Scientific Tools",
      description: "Design and development of user-friendly interfaces for scientific applications and tools."
    },
    {
      icon: Server,
      title: "Laboratory Automation",
      description: "Development of automated systems and scripts for laboratory processes and data collection."
    },
    {
      icon: Microscope,
      title: "Experimental Design",
      description: "Planning and optimization of research methodologies and experimental procedures."
    },
    {
      icon: BookOpen,
      title: "Educational Content",
      description: "Creation of tutorials, courses, and educational materials in both programming and biochemistry."
    },
    {
      icon: Lightbulb,
      title: "Innovation Consulting",
      description: "Strategic advice on combining technology with scientific research for innovative solutions."
    },
    {
      icon: GraduationCap,
      title: "Academic Mentoring",
      description: "Guidance for students and researchers in both computer science and biochemistry fields."
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Services & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leveraging dual expertise in web development and biochemistry to deliver comprehensive solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;