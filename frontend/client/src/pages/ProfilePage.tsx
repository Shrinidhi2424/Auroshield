import { Link } from 'wouter';
import { useDispatch } from 'react-redux';
import { 
  ArrowLeft, 
  User, 
  Shield, 
  Bell, 
  Lock, 
  Users, 
  MapPin, 
  HelpCircle,
  AlertTriangle,
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../store/authSlice';
import type { AppDispatch } from '../store/store';

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEmergencyReset = () => {
    toast({
      title: 'Emergency Settings',
      description: 'Emergency settings reset functionality will be implemented',
      variant: 'destructive',
    });
  };

  const menuItems = [
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage alert preferences',
      onClick: () => toast({ title: 'Coming Soon', description: 'Notification settings will be available soon' }),
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Account security settings',
      onClick: () => toast({ title: 'Coming Soon', description: 'Privacy settings will be available soon' }),
    },
    {
      icon: Users,
      title: 'Emergency Contacts',
      description: 'Manage emergency contacts',
      onClick: () => toast({ title: 'Coming Soon', description: 'Emergency contacts management will be available soon' }),
    },
    {
      icon: MapPin,
      title: 'Location Settings',
      description: 'Location and mapping preferences',
      onClick: () => toast({ title: 'Coming Soon', description: 'Location settings will be available soon' }),
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and support',
      onClick: () => toast({ title: 'Coming Soon', description: 'Help center will be available soon' }),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-primary-foreground/20"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Profile & Settings</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* User Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-primary" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground" data-testid="text-user-name">
                  {user?.displayName || 'User'}
                </h2>
                <p className="text-muted-foreground" data-testid="text-user-email">
                  {user?.email || 'user@example.com'}
                </p>
                <Badge variant="outline" className="mt-1">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified User
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" data-testid="button-edit-profile">
              <User className="h-3 w-3 mr-1" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Safety Stats */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Your Safety Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary" data-testid="stat-reports-submitted">12</div>
                <div className="text-muted-foreground text-sm">Reports Submitted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success" data-testid="stat-people-helped">8</div>
                <div className="text-muted-foreground text-sm">People Helped</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Menu */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground mb-3">Settings</h3>
          
          {menuItems.map((item, index) => (
            <Card key={index} className="hover:bg-accent cursor-pointer transition-colors">
              <CardContent 
                className="p-4"
                onClick={item.onClick}
                data-testid={`menu-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <span className="text-foreground font-medium">{item.title}</span>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-muted-foreground rotate-180" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Danger Actions */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full text-warning border-warning hover:bg-warning hover:text-warning-foreground"
            onClick={handleEmergencyReset}
            data-testid="button-emergency-reset"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Reset Emergency Settings
          </Button>

          <Button
            variant="outline"
            className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={handleLogout}
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* App Info */}
        <div className="text-center text-muted-foreground text-sm pt-4">
          <p>AuroShield AI v1.0.0</p>
          <p>Your safety is our priority</p>
        </div>
      </div>
    </div>
  );
}
