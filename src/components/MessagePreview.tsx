
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, RefreshCw, Copy, Send, Mail } from 'lucide-react';
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
  const [isSending, setIsSending] = useState(false);
  const [senderEmail, setSenderEmail] = useState('');
  const [senderName, setSenderName] = useState('');
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

  const sendMessage = async () => {
    if (!contact.email) {
      toast({
        title: "No email address",
        description: "This contact doesn't have an email address.",
        variant: "destructive",
      });
      return;
    }

    if (!senderEmail || !senderName) {
      toast({
        title: "Missing sender info",
        description: "Please enter your name and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    try {
      // Using EmailJS service for sending emails
      const emailData = {
        to_name: contact.name,
        to_email: contact.email,
        from_name: senderName,
        from_email: senderEmail,
        message: message,
        subject: `🎉 Happy Birthday ${contact.name}!`
      };

      // For now, we'll simulate the email sending
      console.log('Sending email:', emailData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message sent successfully!",
        description: `Birthday message sent to ${contact.name} at ${contact.email}`,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending the birthday message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
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
            <div className="space-y-4">
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
              
              {/* Sender Information */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="h-4 w-4" />
                  Sender Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="senderName" className="text-xs text-gray-600">Your Name</Label>
                    <Input
                      id="senderName"
                      placeholder="Your name"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="senderEmail" className="text-xs text-gray-600">Your Email</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={copyMessage} 
                  size="sm" 
                  variant="outline"
                  className="flex-1"
                  disabled={isSending}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button 
                  onClick={sendMessage} 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSending || !contact.email}
                >
                  {isSending ? (
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                    <Send className="h-3 w-3 mr-1" />
                  )}
                  {isSending ? 'Sending...' : 'Send Email'}
                </Button>
              </div>
              
              {!contact.email && (
                <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                  No email address available for this contact
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagePreview;
