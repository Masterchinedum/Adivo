import { ArrowDownCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import masterchinedum from "@/app/assets/masterchinedum.png";

const Hero = () => {
  return (
    <div className="min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-6 py-12 bg-background">
      {/* Left content */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          Where{" "}
          <span className="bg-gradient-to-r from-primary to-primary/50 dark:from-primary dark:to-primary/70 bg-clip-text text-transparent">
            Code
          </span>{" "}
          Meets{" "}
          <span className="bg-gradient-to-r from-primary to-primary/50 dark:from-primary dark:to-primary/70 bg-clip-text text-transparent">
            Science
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground">
          Full-stack Developer & Biochemist bridging the gap between technology and life sciences
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link href="#projects">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90"
            >
              View Projects
            </Button>
          </Link>
          <Link href="/blog">
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 dark:border-primary dark:text-primary dark:hover:bg-primary/10"
            >
              Read Blog
            </Button>
          </Link>
        </div>
        
        <div className="pt-8 flex items-center gap-2 text-muted-foreground">
          <ArrowDownCircle className="animate-bounce" />
          <span>Scroll to explore my work</span>
        </div>
      </div>

      {/* Right content */}
      <div className="flex-1 relative w-full max-w-lg aspect-square">
        {/* Light mode gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 rounded-full blur-3xl" />
        
        {/* Container for image with border that changes with theme */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-muted dark:border-muted-foreground/20">
          <Image
            src={masterchinedum}
            alt="Hero visualization"
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{
              objectFit: 'cover',
            }}
            fill
          />
          
          {/* Overlay for dark mode */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent dark:from-background/90 dark:to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
