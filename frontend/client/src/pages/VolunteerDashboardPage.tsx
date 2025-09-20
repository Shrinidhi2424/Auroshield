import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Users, Clock, User, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../hooks/useAuth';
import { fetchVolunteerReports, updateReportStatus } from '../store/reportsSlice';
import type { AppDispatch, RootState } from '../store/store';

export default function VolunteerDashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { volunteerReports } = useSelector((state: RootState) => state.reports);
  const { toast } = useToast();

  const [volunteerStatus, setVolunteerStatus] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchVolunteerReports(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleStatusChange = (checked: boolean) => {
    setVolunteerStatus(checked);
    toast({
      title: checked ? 'Now Available' : 'Now Unavailable',
      description: checked 
        ? 'You will receive notifications for nearby incidents'
        : 'You will not receive new incident notifications',
    });
  };

  const handleRespond = async (reportId: string) => {
    try {
      await dispatch(updateReportStatus({ reportId, status: 'in-progress' })).unwrap();
      toast({
        title: 'Response Sent',
        description: 'You are now responding to this incident',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to update case status',
        variant: 'destructive',
      });
    }
  };

  const handleResolve = async (reportId: string) => {
    try {
      await dispatch(updateReportStatus({ reportId, status: 'resolved' })).unwrap();
      toast({
        title: 'Case Resolved',
        description: 'Thank you for helping keep the community safe!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to resolve case',
        variant: 'destructive',
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-success text-success-foreground px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-success-foreground/20"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Volunteer Dashboard</h1>
              <p className="text-success-foreground/80 text-sm">Help your community stay safe</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Status</div>
            <div className="font-semibold" data-testid="text-volunteer-status">
              {volunteerStatus ? 'Available' : 'Unavailable'}
            </div>
          </div>
        </div>
      </div>

      {/* Status Toggle */}
      <div className="p-6 bg-success/10 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Volunteer Status</h3>
            <p className="text-muted-foreground text-sm">Toggle your availability to help others</p>
          </div>
          <Switch
            checked={volunteerStatus}
            onCheckedChange={handleStatusChange}
            data-testid="switch-volunteer-status"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Impact</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success" data-testid="stat-cases-helped">24</div>
              <div className="text-muted-foreground text-xs">Cases Helped</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary" data-testid="stat-rating">4.8</div>
              <div className="text-muted-foreground text-xs">Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning" data-testid="stat-active-cases">
                {volunteerReports.length}
              </div>
              <div className="text-muted-foreground text-xs">Active Cases</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Assignments */}
        <h3 className="text-lg font-semibold text-foreground mb-4">Active Assignments</h3>
        
        {volunteerReports.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Active Cases</h3>
              <p className="text-muted-foreground">
                {volunteerStatus 
                  ? 'You\'ll be notified when there are incidents in your area that need help.'
                  : 'Turn on your availability to start receiving incident notifications.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {volunteerReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground" data-testid={`report-title-${report.id}`}>
                          Incident Report #{report.id.slice(-4)}
                        </h4>
                        <p className="text-muted-foreground text-sm" data-testid={`report-location-${report.id}`}>
                          {JSON.parse(report.location || '{}').address || 'Location unavailable'} • 2.3 km away
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span><Clock className="inline h-3 w-3 mr-1" />15 min ago</span>
                          <span>
                            <User className="inline h-3 w-3 mr-1" />
                            {report.isAnonymous ? 'Anonymous' : 'User Report'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={getPriorityColor(report.priority) as any}
                      className="capitalize"
                      data-testid={`badge-priority-${report.id}`}
                    >
                      {getPriorityIcon(report.priority)} {report.priority}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground" data-testid={`report-description-${report.id}`}>
                      {report.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {report.status === 'pending' && (
                      <Button
                        onClick={() => handleRespond(report.id)}
                        className="flex-1"
                        size="sm"
                        data-testid={`button-respond-${report.id}`}
                      >
                        Respond
                      </Button>
                    )}
                    <Button
                      onClick={() => handleResolve(report.id)}
                      variant="outline"
                      className="flex-1 text-success border-success hover:bg-success hover:text-success-foreground"
                      size="sm"
                      data-testid={`button-resolve-${report.id}`}
                    >
                      Mark Resolved
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Volunteer Guidelines */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-foreground mb-2">
              <AlertTriangle className="inline h-4 w-4 text-primary mr-2" />
              Volunteer Guidelines
            </h4>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li>• Always prioritize your own safety first</li>
              <li>• Contact authorities for serious emergencies</li>
              <li>• Maintain confidentiality of reported incidents</li>
              <li>• Update case status promptly after response</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
