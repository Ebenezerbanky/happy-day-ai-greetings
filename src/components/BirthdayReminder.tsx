
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Gift, Send, RefreshCw, Mail } from 'lucide-react';
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

interface BirthdayReminderProps {
  contact: Contact;
  showDate?: boolean;
}

const BirthdayReminder = ({ contact, showDate = false }: BirthdayReminderProps) => {
  const [showSendForm, setShowSendForm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [senderEmail, setSenderEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      ...(showDate ? { year: 'numeric' } : {})
    });
  };

  const getDaysUntilBirthday = () => {
    const today = new Date();
    const birthday = new Date(contact.birthday);
    const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    
    if (thisYearBirthday < today) {
      thisYearBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const timeDiff = thisYearBirthday.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff;
  };

  const daysUntil = getDaysUntilBirthday();
  const isToday = daysUntil === 0;
  const isTomorrow = daysUntil === 1;

  const getTimeText = () => {
    if (isToday) return "Today!";
    if (isTomorrow) return "Tomorrow";
    return `${daysUntil} days`;
  };

  const sendQuickMessage = async () => {
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
      const quickMessage = `🎉 Happy Birthday, ${contact.name}! 🎂 Wishing you a wonderful day filled with joy and celebration! Hope your special day is amazing! 🎈`;
      
      const emailData = {
        to_name: contact.name,
        to_email: contact.email,
        from_name: senderName,
        from_email: senderEmail,
        message: quickMessage,
        subject: `🎉 Happy Birthday ${contact.name}!`
      };

      console.log('Sending quick birthday message:', emailData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Birthday message sent!",
        description: `Quick birthday message sent to ${contact.name}`,
      });
      
      setShowSendForm(false);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Failed to send message",
        description: "There was an error sending the message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-md ${
      isToday ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300' :
      isTomorrow ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' :
      'bg-white/60 border-gray-200'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${
              isToday ? 'bg-yellow-500' : 
              isTomorrow ? 'bg-blue-500' : 
              'bg-purple-500'
            }`}>
              {isToday ? (
                <Gift className="h-4 w-4 text-white" />
              ) : (
                <Calendar className="h-4 w-4 text-white" />
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800">{contact.name}</h3>
              <p className="text-sm text-gray-600">
                {formatDate(contact.birthday)} • {contact.relationship}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              className={`${
                isToday ? 'bg-yellow-500 text-white' :
                isTomorrow ? 'bg-blue-500 text-white' :
                'bg-purple-500 text-white'
              }`}
            >
              {getTimeText()}
            </Badge>
            
            {(isToday || isTomorrow) && (
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setShowSendForm(!showSendForm)}
                disabled={!contact.email}
              >
                <Send className="h-3 w-3 mr-1" />
                Send
              </Button>
            )}
          </div>
        </div>
        
        {showSendForm && (isToday || isTomorrow) && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Mail className="h-4 w-4" />
              Send Quick Birthday Message
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`senderName-${contact.id}`} className="text-xs text-gray-600">Your Name</Label>
                <Input
                  id={`senderName-${contact.id}`}
                  placeholder="Your name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label htmlFor={`senderEmail-${contact.id}`} className="text-xs text-gray-600">Your Email</Label>
                <Input
                  id={`senderEmail-${contact.id}`}
                  type="email"
                  placeholder="your@email.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSendForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={sendQuickMessage}
                disabled={isSending || !senderEmail || !senderName}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isSending ? (
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <Send className="h-3 w-3 mr-1" />
                )}
                {isSending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </div>
        )}
        
        {!contact.email && (isToday || isTomorrow) && (
          <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
            No email address available for this contact
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BirthdayReminder;
