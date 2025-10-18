import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Paperclip, Globe, RotateCcw, Send } from "lucide-react";

const topics = ["Anxiety", "Relationships", "Burnout", "Self-esteem"];

export const QuestionCard = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
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
          onChange={(e) => setMessage(e.target.value)}
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
            <Button variant="ghost" size="icon" className="h-9 w-9 text-card-dark-foreground/60 hover:text-card-dark-foreground hover:bg-card-dark-foreground/10">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
