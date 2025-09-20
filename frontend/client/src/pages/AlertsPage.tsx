import { Link } from 'wouter';
import { ArrowLeft, Bell, AlertTriangle, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AlertsPage() {
  // Mock alerts data - will be replaced with real data from API
  const alerts = [
    {
      id: '1',
      title: 'Safety Alert: High Crime Activity',
      description: 'Increased security incidents reported in downtown area. Avoid walking alone after dark.',
      location: 'Downtown District',
      priority: 'high',
      timestamp: '2 hours ago',
      type: 'safety'
    },
    {
      id: '2',
      title: 'Community Update: Area Resolved',
      description: 'Previous safety concerns in Park Avenue area have been addressed by local authorities.',
      location: 'Park Avenue',
      priority: 'low',
      timestamp: '4 hours ago',
      type: 'update'
    },
    {
      id: '3',
      title: 'Weather Alert: Severe Storm Warning',
      description: 'Severe thunderstorm expected in the area. Seek shelter and avoid outdoor activities.',
      location: 'City-wide',
      priority: 'medium',
      timestamp: '6 hours ago',
      type: 'weather'
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getAlertIcon = (type: string, priority: string) => {
    if (type === 'weather') return '🌩️';
    if (type === 'update') return '✅';
    if (priority === 'high') return '🔴';
    if (priority === 'medium') return '🟡';
    return '🟢';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-warning text-warning-foreground px-6 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-warning-foreground/20"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Safety Alerts</h1>
            <p className="text-warning-foreground/80 text-sm">Stay informed about your area</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Alert Summary */}
        <Card className="mb-6 bg-warning/10 border-warning/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-warning" />
              <div>
                <h3 className="font-semibold text-foreground">Active Alerts</h3>
                <p className="text-muted-foreground text-sm">
                  {alerts.length} active alerts in your area
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Active Alerts</h3>
                <p className="text-muted-foreground">
                  You're all caught up! You'll be notified when there are new safety alerts in your area.
                </p>
              </CardContent>
            </Card>
          ) : (
            alerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                        <span className="text-lg">{getAlertIcon(alert.type, alert.priority)}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1" data-testid={`alert-title-${alert.id}`}>
                          {alert.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-2" data-testid={`alert-description-${alert.id}`}>
                          {alert.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={getPriorityColor(alert.priority) as any}
                      className="capitalize"
                      data-testid={`alert-priority-${alert.id}`}
                    >
                      {alert.priority}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                      data-testid={`button-view-${alert.id}`}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                      data-testid={`button-dismiss-${alert.id}`}
                    >
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Alert Preferences */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-foreground mb-2">
              <Bell className="inline h-4 w-4 text-primary mr-2" />
              Alert Settings
            </h4>
            <p className="text-muted-foreground text-sm mb-3">
              Customize which types of alerts you want to receive
            </p>
            <Button variant="outline" size="sm" data-testid="button-alert-settings">
              Manage Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
