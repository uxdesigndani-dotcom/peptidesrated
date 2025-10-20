import { Button } from "@/components/ui/button";

interface VideoCardProps {
  videoLink: string;
  contactLink: string;
  category?: string;
}

export const VideoCard = ({ videoLink, contactLink, category }: VideoCardProps) => {
  // Extract Vimeo video ID from URL
  const getVimeoId = (url: string): string => {
    const match = url.match(/vimeo\.com\/(?:manage\/videos\/)?(\d+)/);
    return match ? match[1] : "";
  };

  const vimeoId = getVimeoId(videoLink);

  const handleContact = () => {
    window.open(contactLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
      {/* Category Badge */}
      {category && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-primary/80 text-primary-foreground text-xs font-medium backdrop-blur-sm">
            {category}
          </span>
        </div>
      )}

      <div className="relative aspect-[9/16] bg-gradient-to-br from-muted to-muted/50">
        {vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Video not available</p>
          </div>
        )}
        
        {/* Overlay with CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <Button 
            onClick={handleContact}
            variant="default"
            className="w-full rounded-full font-medium"
          >
            Contact Therapist
          </Button>
        </div>
      </div>
    </div>
  );
};
