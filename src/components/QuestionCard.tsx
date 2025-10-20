import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Paperclip, Globe, RotateCcw, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Therapist {
  name: string;
  specialty: string;
  approach: string;
  matchReason: string;
  videoMessage: string;
}

interface QuestionCardProps {
  onTherapistsFound: (therapists: Therapist[]) => void;
  onTopicsChange: (topics: string[]) => void;
  onMessageTopicsDetected: (topics: string[]) => void;
}

const topics = ["Anxiety", "Relationships", "Burnout", "Self-esteem"];

// Keywords for each topic to detect in messages
const topicKeywords: Record<string, string[]> = {
  "Anxiety": ["anxiety", "anxious", "worried", "worry", "panic", "nervous", "stress", "stressed", "fear", "fearful", "scared", "overwhelmed"],
  "Relationships": ["relationship", "relationships", "partner", "marriage", "married", "dating", "boyfriend", "girlfriend", "spouse", "divorce", "breakup", "family", "communication"],
  "Burnout": ["burnout", "burn out", "burnt out", "burned out", "burning out", "exhausted", "exhaustion", "tired", "overworked", "work stress", "career stress", "job stress", "workload", "fatigue", "drained"],
  "Self-esteem": ["self-esteem", "self esteem", "confidence", "self-worth", "self worth", "insecure", "insecurity", "self-doubt", "doubt myself", "not good enough", "worthless"]
};

// Function to detect topics from message text
const detectTopicsFromMessage = (text: string): string[] => {
  const lowerText = text.toLowerCase();
  const detectedTopics: string[] = [];
  
  Object.entries(topicKeywords).forEach(([topic, keywords]) => {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      detectedTopics.push(topic);
    }
  });
  
  return detectedTopics;
};

export const QuestionCard = ({ onTherapistsFound, onTopicsChange, onMessageTopicsDetected }: QuestionCardProps) => {
  const { toast } = useToast();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Detect topics from message as user types
  const handleMessageChange = (text: string) => {
    setMessage(text);
    const detectedTopics = detectTopicsFromMessage(text);
    onMessageTopicsDetected(detectedTopics);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => {
      const newTopics = prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic];
      onTopicsChange(newTopics);
      return newTopics;
    });
  };

  const handleSearch = async () => {
    if (!message.trim() && selectedTopics.length === 0) {
      toast({
        title: "Please share what you're working through",
        description: "Add a message or select topics to get personalized matches",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error("OpenAI API key is not configured");
      }

      const topicsText = selectedTopics.length > 0 ? `Topics: ${selectedTopics.join(", ")}` : "";
      const messageText = message.trim() ? `Message: "${message.trim()}"` : "";
      const userContext = [topicsText, messageText].filter(Boolean).join("\n");

      const systemPrompt = `You are a compassionate therapist matching AI. Based on what someone shares about what they're working through, recommend 3 therapist profiles that would be a great match.

For each therapist, provide:
- name: Full name
- specialty: Their main area of expertise (related to what the user shared)
- approach: Brief description of their therapeutic approach (CBT, DBT, trauma-informed, etc.)
- matchReason: Why they'd be a good fit for this person (2-3 sentences, personal and specific)
- videoMessage: A warm, supportive first message they might say (1-2 sentences)

Make recommendations feel personal and thoughtful. Focus on creating human connections.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Help me find a therapist. Here's what I'm working through:\n\n${userContext}` }
          ],
          functions: [
            {
              name: "suggest_therapists",
              description: "Suggest 3 matching therapist profiles",
              parameters: {
                type: "object",
                properties: {
                  therapists: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        specialty: { type: "string" },
                        approach: { type: "string" },
                        matchReason: { type: "string" },
                        videoMessage: { type: "string" }
                      },
                      required: ["name", "specialty", "approach", "matchReason", "videoMessage"]
                    },
                    minItems: 3,
                    maxItems: 3
                  }
                },
                required: ["therapists"]
              }
            }
          ],
          function_call: { name: "suggest_therapists" }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const functionCall = data.choices?.[0]?.message?.function_call;
      
      if (!functionCall) {
        throw new Error("No recommendations received from AI");
      }

      const result = JSON.parse(functionCall.arguments);
      const therapists = result.therapists;

      if (therapists && Array.isArray(therapists) && therapists.length > 0) {
        onTherapistsFound(therapists);
        toast({
          title: "Found your matches!",
          description: `We found ${therapists.length} therapists who would be a great fit`,
        });
      }
    } catch (error) {
      console.error("Error matching therapists:", error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card-dark text-card-dark-foreground rounded-3xl p-8 shadow-card-hover">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-6 h-6 rounded-full bg-card-dark-foreground/10 flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-card-dark-foreground" />
          </div>
          <h3 className="text-lg font-normal">What are you working through today?</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {topics.map((topic) => (
            <Badge
              key={topic}
              variant={selectedTopics.includes(topic) ? "default" : "secondary"}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </Badge>
          ))}
        </div>

        <Textarea
          placeholder="I've been feeling anxious at work ..."
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          className="min-h-[100px] bg-card-dark border-card-dark-foreground/20 text-card-dark-foreground placeholder:text-card-dark-foreground/40 resize-none mb-4"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-card-dark-foreground/60 hover:text-card-dark-foreground hover:bg-card-dark-foreground/10">
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-card-dark-foreground/60 hover:text-card-dark-foreground hover:bg-card-dark-foreground/10">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-card-dark-foreground/60 hover:text-card-dark-foreground hover:bg-card-dark-foreground/10">
              <Globe className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-card-dark-foreground/60 hover:text-card-dark-foreground hover:bg-card-dark-foreground/10">
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              size="icon" 
              className="h-9 w-9 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
