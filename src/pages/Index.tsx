
import React, { useState } from 'react';
import { Calendar, Users, MessageCircle, Plus, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContactCard from '@/components/ContactCard';
import BirthdayReminder from '@/components/BirthdayReminder';
import AddContact from '@/components/AddContact';
import MessagePreview from '@/components/MessagePreview';

interface Contact {
  id: string;
  name: string;
  birthday: string;
  relationship: string;
  interests: string[];
  email?: string;
  phone?: string;
}

const Index = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      birthday: '2024-06-05',
      relationship: 'Friend',
      interests: ['photography', 'traveling', 'coffee'],
      email: 'sarah@example.com'
    },
    {
      id: '2',
      name: 'Mike Chen',
      birthday: '2024-06-08',
      relationship: 'Colleague',
      interests: ['coding', 'gaming', 'music'],
      email: 'mike@example.com'
    },
    {
      id: '3',
      name: 'Emma Davis',
      birthday: '2024-06-15',
      relationship: 'Family',
      interests: ['cooking', 'reading', 'yoga'],
      email: 'emma@example.com'
    }
  ]);

  const [showAddContact, setShowAddContact] = useState(false);

  const addContact = (newContact: Omit<Contact, 'id'>) => {
    const contact: Contact = {
      ...newContact,
      id: Date.now().toString()
    };
    setContacts([...contacts, contact]);
    setShowAddContact(false);
  };

  const getUpcomingBirthdays = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return contacts.filter(contact => {
      const birthday = new Date(contact.birthday);
      const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
      return thisYearBirthday >= today && thisYearBirthday <= nextWeek;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              BirthdayAI
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Never miss a birthday again! Our AI creates personalized birthday messages for your loved ones.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{contacts.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-pink-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Upcoming Birthdays</CardTitle>
              <Calendar className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-700">{getUpcomingBirthdays().length}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-yellow-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Messages Sent</CardTitle>
              <MessageCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">24</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-100">Dashboard</TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-purple-100">Contacts</TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-purple-100">AI Messages</TabsTrigger>
            <TabsTrigger value="reminders" className="data-[state=active]:bg-purple-100">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    Upcoming Birthdays
                  </CardTitle>
                  <CardDescription>Birthdays coming up in the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getUpcomingBirthdays().length > 0 ? (
                      getUpcomingBirthdays().map(contact => (
                        <BirthdayReminder key={contact.id} contact={contact} />
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No birthdays in the next 7 days</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-pink-600" />
                    AI Message Preview
                  </CardTitle>
                  <CardDescription>See how AI will personalize birthday messages</CardDescription>
                </CardHeader>
                <CardContent>
                  {contacts.length > 0 && (
                    <MessagePreview contact={contacts[0]} />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Manage Contacts</h2>
              <Button 
                onClick={() => setShowAddContact(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>

            {showAddContact && (
              <AddContact 
                onAdd={addContact} 
                onCancel={() => setShowAddContact(false)} 
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map(contact => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">AI Message Generator</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contacts.slice(0, 4).map(contact => (
                <Card key={contact.id} className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <CardDescription>{contact.relationship}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MessagePreview contact={contact} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Birthday Reminders</h2>
            <div className="space-y-4">
              {contacts.map(contact => (
                <BirthdayReminder key={contact.id} contact={contact} showDate />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
