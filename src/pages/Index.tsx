import { useState, useMemo } from "react";
import { ChatCard } from "@/components/ChatCard";
import { VideoCard } from "@/components/VideoCard";
import { TherapistCard } from "@/components/TherapistCard";
import { getRandomVideosByCategories, therapistVideos } from "@/data/therapistVideos";

interface Therapist {
  name: string;
  specialty: string;
  approach: string;
  matchReason: string;
  videoMessage: string;
}

const Index = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [messageTopics, setMessageTopics] = useState<string[]>([]);
  
  // Combine selected topics from badges and detected topics from message
  const allTopics = useMemo(() => {
    const combined = [...new Set([...selectedTopics, ...messageTopics])];
    return combined;
  }, [selectedTopics, messageTopics]);
  
  // Get videos based on all topics (from badges + message), or show random featured videos
  const displayVideos = allTopics.length > 0 
    ? getRandomVideosByCategories(allTopics, 6)
    : therapistVideos.slice(0, 6).sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight">
            Where finding a therapist<br />feels human
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Short videos and verified profiles that help you connect before you commit
          </p>
        </div>

        {/* Chat Card */}
        <div className="mb-16 md:mb-24">
          <ChatCard 
            onTherapistsFound={setTherapists}
            onTopicsChange={setSelectedTopics}
            onMessageTopicsDetected={setMessageTopics}
          />
        </div>

      </div>

      {/* Below the fold section with different background */}
      <div className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* AI-Matched Therapists */}
          {therapists.length > 0 && (
            <div className="mb-16 md:mb-24">
              <h2 className="text-3xl md:text-4xl font-normal text-center mb-12">
                Your personalized AI matches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {therapists.map((therapist, index) => (
                  <TherapistCard key={index} {...therapist} />
                ))}
              </div>
            </div>
          )}

          {/* Video Grid */}
          <div>
            <h2 className="text-2xl md:text-3xl font-normal text-center mb-8 text-foreground">
              {allTopics.length > 0 
                ? `Therapist videos for ${allTopics.join(", ")}`
                : "Featured therapist videos"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {displayVideos.map((video) => (
                <VideoCard 
                  key={video.id}
                  videoLink={video.videoLink}
                  contactLink={video.contactLink}
                  category={video.category}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
