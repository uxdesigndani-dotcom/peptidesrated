import { Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoCardProps {
  ctaType: "contact" | "learn-more";
}

export const VideoCard = ({ ctaType }: VideoCardProps) => {
  return (
    <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button className="w-8 h-8 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center backdrop-blur-sm hover:bg-primary transition-colors">
          <Play className="h-4 w-4 ml-0.5" />
        </button>
        <button className="w-8 h-8 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center backdrop-blur-sm hover:bg-primary transition-colors">
          <Volume2 className="h-4 w-4" />
        </button>
      </div>

      <div className="relative aspect-[9/16] bg-gradient-to-br from-muted to-muted/50">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <div className="text-center mb-auto pt-16">
            <p className="text-lg font-bold text-foreground/90 leading-tight">
              YOU DON'T HAVE TO APOLOGIZE
              <br />
              FOR THIS IN THERAPY 🙏
            </p>
            <p className="text-sm text-foreground/60 mt-2">
              or avoid smiling there is
              <br />
              no such thing as trauma
              <br />
              dumping in session
            </p>
          </div>

          <div className="mt-auto mb-6">
            <div className="w-16 h-16 rounded-full bg-muted-foreground/20 mb-4 mx-auto" />
          </div>

          <Button 
            variant={ctaType === "contact" ? "default" : "secondary"}
            className="w-full max-w-[200px] rounded-full font-medium"
          >
            {ctaType === "contact" ? "Contact" : "Learn More"}
          </Button>
        </div>
      </div>
    </div>
  );
};
