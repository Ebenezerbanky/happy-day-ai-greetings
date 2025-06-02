
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, RefreshCw, Copy, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  name: string;
  birthday: string;
  relationship: string;
  interests: string[];
  email?: string;
  phone?: string;
}

interface MessagePreviewProps {
  contact: Contact;
}

const MessagePreview = ({ contact }: MessagePreviewProps) => {
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateMessage = () => {
    setIsGenerating(true);
    
    // Simulate AI message generation with different templates
    const templates = [
      `🎉 Happy Birthday, ${contact.name}! 🎂 Hope your special day is filled with joy and all your favorite things. As someone who loves ${contact.interests[0] || 'life'}, I know you'll make this year amazing! Have a wonderful celebration! 🎈`,
      
      `Hey ${contact.name}! 🎊 Wishing you the happiest of birthdays! May this new year bring you endless opportunities to enjoy ${contact.interests.slice(0, 2).join(' and ') || 'all the things you love'}. You deserve all the happiness in the world! 🌟`,
      
      `Happy Birthday to an incredible ${contact.relationship.toLowerCase()}! 🎁 ${contact.name}, I hope your day is as special as you are. Here's to another year of ${contact.interests[0] || 'adventures'} and making beautiful memories! Celebrate big! 🥳`,
      
      `🎂 It's ${contact.name}'s birthday! 🎉 Sending you warm wishes and hoping your day is filled with laughter, love, and everything that makes you smile. Your passion for ${contact.interests.slice(0, 2).join(' and ') || 'life'} inspires everyone around you! Have an amazing day! ✨`
    ];

    // Simulate API delay
    setTimeout(() => {
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      setMessage(randomTemplate);
      setIsGenerating(false);
    }, 1500);
  };

  const copyMessage = async () => {
    if (message) {
      try {
        await navigator.clipboard.writeText(message);
        toast({
          title: "Message copied!",
          description: "The birthday message has been copied to your clipboard.",
        });
      } catch (err) {
        toast({
          title: "Failed to copy",
          description: "Please try copying the message manually.",
          variant: "destructive",
        });
      }
    }
  };

  const sendMessage = () => {
    toast({
      title: "Message sent!",
      description: `Birthday message sent to ${contact.name}${contact.email ? ` at ${contact.email}` : ''}.`,
    });
  };

  useEffect(() => {
    generateMessage();
  }, [contact.id]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-800 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-600" />
          AI Generated Message
        </h3>
        <Button 
          onClick={generateMessage} 
          size="sm" 
          variant="outline"
          disabled={isGenerating}
          className="border-purple-200 text-purple-600 hover:bg-purple-50"
        >
          {isGenerating ? (
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3 mr-1" />
          )}
          Regenerate
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-4">
          {isGenerating ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Sparkles className="h-8 w-8 text-purple-600 animate-pulse mx-auto mb-2" />
                <p className="text-sm text-gray-600">AI is crafting a personalized message...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-800 leading-relaxed">{message}</p>
              
              <div className="flex flex-wrap gap-2">
                {contact.interests.slice(0, 3).map((interest, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-purple-100 text-purple-700"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={copyMessage} 
                  size="sm" 
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button 
                  onClick={sendMessage} 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Send className="h-3 w-3 mr-1" />
                  Send
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagePreview;
