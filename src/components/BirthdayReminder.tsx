
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Gift, Send } from 'lucide-react';

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
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                <Send className="h-3 w-3 mr-1" />
                Send
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BirthdayReminder;
