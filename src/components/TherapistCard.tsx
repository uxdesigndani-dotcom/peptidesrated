import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface TherapistCardProps {
  name: string;
  specialty: string;
  approach: string;
  matchReason: string;
  videoMessage: string;
}

export const TherapistCard = ({ 
  name, 
  specialty, 
  approach, 
  matchReason, 
  videoMessage 
}: TherapistCardProps) => {
  return (
    <Card className="p-6 hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center flex-shrink-0">
          <Heart className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{specialty}</p>
          <Badge variant="secondary" className="text-xs">
            {approach}
          </Badge>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-foreground/80 mb-2">Why this match:</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{matchReason}</p>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <p className="text-sm italic text-foreground/90">"{videoMessage}"</p>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1">Contact</Button>
        <Button variant="secondary" className="flex-1">Learn More</Button>
      </div>
    </Card>
  );
};
