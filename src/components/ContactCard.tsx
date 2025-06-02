
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, Phone, Heart } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  birthday: string;
  relationship: string;
  interests: string[];
  email?: string;
  phone?: string;
}

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric'
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
  const isUpcoming = daysUntil <= 7;

  return (
    <Card className={`bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
      isUpcoming ? 'border-yellow-300 bg-yellow-50/80' : 'border-purple-200'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              {contact.name}
            </CardTitle>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {contact.relationship}
            </p>
          </div>
          {isUpcoming && (
            <Badge className="bg-yellow-500 text-white">
              {daysUntil === 0 ? 'Today!' : `${daysUntil} days`}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(contact.birthday)}</span>
        </div>
        
        {contact.email && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span className="truncate">{contact.email}</span>
          </div>
        )}
        
        {contact.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{contact.phone}</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mt-3">
          {contact.interests.map((interest, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-purple-100 text-purple-700"
            >
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
