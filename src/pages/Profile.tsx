
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BadgeCheck, Clock, FileText, Award } from 'lucide-react';

interface RoastHistoryItem {
  id: string;
  date: string;
  intensity: string;
  score: number;
  status: 'completed' | 'pending';
  title: string;
}

// Sample roast history data
const roastHistory: RoastHistoryItem[] = [
  {
    id: '1',
    date: '2025-05-01',
    intensity: 'Savage',
    score: 73,
    status: 'completed',
    title: 'Software Engineer Resume'
  },
  {
    id: '2',
    date: '2025-04-28',
    intensity: 'Medium',
    score: 85,
    status: 'completed',
    title: 'Product Manager Application'
  },
  {
    id: '3',
    date: '2025-04-25',
    intensity: 'Mild',
    score: 92,
    status: 'completed',
    title: 'Marketing Specialist Resume'
  }
];

// Badge achievements data
const achievements = [
  {
    name: 'Resume Rookie',
    description: 'Got your first resume roasted',
    earned: true
  },
  {
    name: 'Heat Seeker',
    description: 'Try all intensity levels',
    earned: true
  },
  {
    name: 'Feedback Collector',
    description: 'Receive 5 different roasts',
    earned: false
  },
  {
    name: 'Savage Survivor',
    description: 'Complete a savage roast with >80% score',
    earned: false
  }
];

const Profile: React.FC = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 items-start md:items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center">
              {user.hasImage ? (
                <img 
                  src={user.imageUrl}
                  alt={user.fullName || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-4xl font-bold text-white">
                  {user.firstName?.[0] || user.username?.[0] || '?'}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.fullName || user.username}</h1>
              <div className="text-muted-foreground">{user.emailAddresses[0]?.emailAddress}</div>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full flex items-center">
                  <BadgeCheck className="w-4 h-4 mr-1" /> Premium Member
                </div>
                <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center">
                  <FileText className="w-4 h-4 mr-1" /> 3 Roasts
                </div>
                <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
                  <Award className="w-4 h-4 mr-1" /> 2 Badges
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => navigate('/roaster')}
              className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700"
            >
              New Roast
            </Button>
          </div>
          
          {/* Tabs Content */}
          <Tabs defaultValue="history">
            <TabsList className="mb-6">
              <TabsTrigger value="history">Roast History</TabsTrigger>
              <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
            
            {/* Roast History Tab */}
            <TabsContent value="history" className="space-y-4">
              {roastHistory.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                    <CardDescription>{item.intensity} Intensity</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Roast Score</span>
                      <span className="text-sm font-bold">{item.score}%</span>
                    </div>
                    <Progress 
                      value={item.score} 
                      className={`h-2 ${
                        item.score > 80 
                          ? 'bg-green-100 [&>div]:bg-green-500' 
                          : item.score > 60 
                            ? 'bg-amber-100 [&>div]:bg-amber-500'
                            : 'bg-red-100 [&>div]:bg-red-500'
                      }`}
                    />
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/roast/${item.id}`)}
                      className="w-full"
                    >
                      View Roast Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            {/* Badges Tab */}
            <TabsContent value="badges">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((badge, index) => (
                  <Card 
                    key={index} 
                    className={`border ${badge.earned ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}
                  >
                    <CardHeader className="pb-2">
                      <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                        badge.earned 
                          ? 'bg-gradient-to-r from-amber-400 to-red-500' 
                          : 'bg-gray-200'
                      }`}>
                        <Award className={`w-8 h-8 ${badge.earned ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="text-center">
                      <h3 className="font-bold text-lg mb-1">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </CardContent>
                    
                    <CardFooter className="pt-2 justify-center">
                      <div className={`text-xs font-medium px-3 py-1 rounded-full ${
                        badge.earned 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {badge.earned ? 'Earned' : 'Locked'}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Email Notifications</p>
                        <div className="flex items-center justify-between p-4 rounded-md border">
                          <span className="text-sm">Receive roast completion emails</span>
                          <div className="w-10 h-5 bg-amber-500 rounded-full relative cursor-pointer">
                            <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">Profile Information</p>
                        <Button variant="outline" size="sm" className="text-sm">
                          Update Profile Information
                        </Button>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">Account Management</p>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" className="text-sm">
                            Change Password
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50 text-sm">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
