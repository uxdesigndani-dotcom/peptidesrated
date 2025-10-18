import { useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { VideoCard } from "@/components/VideoCard";
import { TherapistCard } from "@/components/TherapistCard";

interface Therapist {
  name: string;
  specialty: string;
  approach: string;
  matchReason: string;
  videoMessage: string;
}

const Index = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight">
            Where finding a therapist feels human
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Short videos and verified profiles that help you connect before you commit
          </p>
        </div>

        {/* Question Card */}
        <div className="mb-16 md:mb-24">
          <QuestionCard onTherapistsFound={setTherapists} />
        </div>

        {/* AI-Matched Therapists */}
        {therapists.length > 0 && (
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-normal text-center mb-12">
              Your personalized matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {therapists.map((therapist, index) => (
                <TherapistCard key={index} {...therapist} />
              ))}
            </div>
          </div>
        )}

        {/* Example Video Grid */}
        {therapists.length === 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-normal text-center mb-8 text-muted-foreground">
              Featured therapist videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <VideoCard ctaType="contact" />
              <VideoCard ctaType="learn-more" />
              <VideoCard ctaType="learn-more" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
