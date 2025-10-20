import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Therapist {
  name: string;
  specialty: string;
  approach: string;
  matchReason: string;
  videoMessage: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  topics?: string[];
}

interface ChatCardProps {
  onTherapistsFound: (therapists: Therapist[]) => void;
  onTopicsChange: (topics: string[]) => void;
  onMessageTopicsDetected: (topics: string[]) => void;
}

const topics = ["Anxiety", "Relationships", "Burnout", "Self-esteem"];

export const ChatCard = ({ onTherapistsFound, onTopicsChange, onMessageTopicsDetected }: ChatCardProps) => {
  const { toast } = useToast();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm here to help you find the right therapist. What's been on your mind lately? You can tell me what you're working through, or select some topics below."
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => {
      const newTopics = prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic];
      onTopicsChange(newTopics);
      return newTopics;
    });
  };

  const detectAndSuggestTherapists = async (conversationContext: string, userMessage: string) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key is not configured");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { 
            role: "system", 
            content: `You are a compassionate therapist matching AI. Based on the conversation, recommend 3 therapist profiles.

For each therapist, provide:
- name: Full name
- specialty: Their main area of expertise
- approach: Therapeutic approach (CBT, DBT, trauma-informed, etc.)
- matchReason: Why they'd be a good fit (2-3 sentences)
- videoMessage: A warm first message they might say (1-2 sentences)`
          },
          { role: "user", content: conversationContext }
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
                  }
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
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const functionCall = data.choices?.[0]?.message?.function_call;
    
    if (functionCall) {
      const result = JSON.parse(functionCall.arguments);
      return result.therapists;
    }
    return null;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage("");
    
    // Add user message
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error("OpenAI API key is not configured");
      }

      // Prepare conversation context
      const conversationHistory = newMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Get AI response and topic detection
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { 
              role: "system", 
              content: `You are a compassionate mental health assistant helping people find the right therapist. 

Your role is to:
1. Listen empathetically and ask follow-up questions to understand their needs
2. Identify which topics they're discussing: Anxiety, Relationships, Burnout, or Self-esteem
3. After understanding their situation (usually after 2-3 exchanges), offer to show them matching therapist profiles

Be warm, supportive, and conversational. Don't be too clinical. Keep responses concise (2-3 sentences max).

When you detect topics from the conversation, respond with a JSON object at the end of your message in this format:
[TOPICS: Topic1, Topic2]

For example:
"I hear that work has been really overwhelming lately. Burnout can feel so draining. Would you like me to show you some therapist profiles who specialize in this?
[TOPICS: Burnout]"`
            },
            ...conversationHistory
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "I'm here to help. Can you tell me more about what you're experiencing?";

      // Extract topics from AI response
      const topicMatch = aiResponse.match(/\[TOPICS: ([^\]]+)\]/);
      let cleanResponse = aiResponse;
      let detectedTopics: string[] = [];

      if (topicMatch) {
        const topicsStr = topicMatch[1];
        detectedTopics = topicsStr.split(',').map((t: string) => t.trim()).filter((t: string) => 
          topics.includes(t)
        );
        cleanResponse = aiResponse.replace(/\[TOPICS: [^\]]+\]/, '').trim();
        
        // Update detected topics for video display
        onMessageTopicsDetected(detectedTopics);
      }

      // Add AI response
      setMessages([...newMessages, { 
        role: "assistant", 
        content: cleanResponse,
        topics: detectedTopics
      }]);

      // Check if AI is suggesting therapists (check for keywords like "show you", "therapist profiles", etc.)
      const shouldShowTherapists = cleanResponse.toLowerCase().includes("therapist") && 
                                    cleanResponse.toLowerCase().includes("show");

      if (shouldShowTherapists && newMessages.length >= 3) {
        // Generate therapist matches
        const fullContext = newMessages.map(m => `${m.role}: ${m.content}`).join('\n');
        const therapists = await detectAndSuggestTherapists(fullContext, userMessage);
        
        if (therapists && therapists.length > 0) {
          onTherapistsFound(therapists);
          toast({
            title: "Found your matches!",
            description: `I've found ${therapists.length} therapists who might be a great fit`,
          });
        }
      }

    } catch (error) {
      console.error("Error in chat:", error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      
      setMessages([...newMessages, { 
        role: "assistant", 
        content: "I apologize, I'm having trouble connecting right now. Could you try again?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card-dark text-card-dark-foreground rounded-3xl p-8 shadow-card-hover">
        {/* Header */}
        <div className="flex items-start gap-3 mb-6">
          <div className="w-6 h-6 rounded-full bg-card-dark-foreground/10 flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-3 h-3 rounded-full bg-card-dark-foreground" />
          </div>
          <h3 className="text-lg font-normal">Let's find the right therapist for you</h3>
        </div>

        {/* Topic Badges */}
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

        {/* Chat Messages */}
        <ScrollArea className="h-[300px] mb-4 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-card-dark-foreground/10 text-card-dark-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-card-dark-foreground/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-card-dark-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-card-dark-foreground/10">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-card-dark-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-card-dark-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-card-dark-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="space-y-3">
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="min-h-[80px] bg-card-dark border-card-dark-foreground/20 text-card-dark-foreground placeholder:text-card-dark-foreground/40 resize-none"
          />

          <div className="flex items-center justify-between">
            <p className="text-xs text-card-dark-foreground/60">
              Press Enter to send, Shift+Enter for new line
            </p>
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
              size="icon" 
              className="h-9 w-9 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

