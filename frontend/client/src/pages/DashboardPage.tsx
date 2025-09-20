import { useEffect } from 'react';
import { Link } from 'wouter';
import { useDispatch, useSelector } from 'react-redux';
import { Bell, Shield, Plus, AlertTriangle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from '../hooks/useLocation';
import { fetchReports } from '../store/reportsSlice';
import type { AppDispatch, RootState } from '../store/store';

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { location, error: locationError } = useLocation();
  const { reports } = useSelector((state: RootState) => state.reports);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchReports(user.uid));
    }
  }, [dispatch, user?.uid]);

  const activeAlerts = 3; // Mock data - will be replaced with real data
  const currentRiskLevel = "medium"; // Mock data

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-destructive bg-destructive/20';
      case 'medium': return 'text-warning bg-warning/20';
      case 'low': return 'text-success bg-success/20';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">AuroShield AI</h1>
            <p className="text-primary-foreground/80 text-sm">Stay Safe, Stay Protected</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/alerts">
              <div className="relative" data-testid="button-alerts">
                <Bell className="h-6 w-6" />
                {activeAlerts > 0 && (
                  <Badge 
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                    data-testid="badge-alert-count"
                  >
                    {activeAlerts}
                  </Badge>
                )}
              </div>
            </Link>
            <Link href="/profile">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 bg-primary-foreground/20 hover:bg-primary-foreground/30"
                data-testid="button-profile"
              >
                <Shield className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Danger Level Status */}
      <div className="p-6 bg-gradient-to-r from-warning/20 to-warning/10 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Current Area Status</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl">{getRiskIcon(currentRiskLevel)}</span>
              <span className="text-warning font-medium capitalize">{currentRiskLevel} Risk Detected</span>
            </div>
            <p className="text-muted-foreground text-sm">Based on recent reports nearby</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Panic Button */}
          <Link href="/panic">
            <Card className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-200 cursor-pointer shadow-lg animate-pulse">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                <div className="font-bold text-lg">PANIC</div>
                <div className="text-sm opacity-90">Emergency Help</div>
              </CardContent>
            </Card>
          </Link>

          {/* Report Incident */}
          <Link href="/report">
            <Card className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 cursor-pointer shadow-lg">
              <CardContent className="p-6 text-center">
                <Plus className="h-8 w-8 mx-auto mb-2" />
                <div className="font-bold text-lg">Report</div>
                <div className="text-sm opacity-90">New Incident</div>
              </CardContent>
            </Card>
          </Link>

          {/* View Alerts */}
          <Link href="/alerts">
            <Card className="bg-warning text-warning-foreground hover:bg-warning/90 transition-all duration-200 cursor-pointer shadow-lg">
              <CardContent className="p-6 text-center">
                <Bell className="h-8 w-8 mx-auto mb-2" />
                <div className="font-bold text-lg">Alerts</div>
                <div className="text-sm opacity-90">View Active</div>
              </CardContent>
            </Card>
          </Link>

          {/* Volunteer Dashboard */}
          <Link href="/volunteer">
            <Card className="bg-success text-success-foreground hover:bg-success/90 transition-all duration-200 cursor-pointer shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <div className="font-bold text-lg">Help</div>
                <div className="text-sm opacity-90">Volunteer</div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Danger Heatmap */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Area Safety Map</h3>
        <Card className="shadow-lg">
          <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden rounded-t-lg">
            {/* Mock map with danger zones */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-16 left-0 w-full h-0.5 bg-gray-400"></div>
              <div className="absolute top-32 left-0 w-full h-0.5 bg-gray-400"></div>
              <div className="absolute top-48 left-0 w-full h-0.5 bg-gray-400"></div>
              <div className="absolute left-16 top-0 h-full w-0.5 bg-gray-400"></div>
              <div className="absolute left-32 top-0 h-full w-0.5 bg-gray-400"></div>
              <div className="absolute left-48 top-0 h-full w-0.5 bg-gray-400"></div>
            </div>
            
            {/* Danger zone markers */}
            <div className="absolute top-8 left-12 w-3 h-3 bg-destructive rounded-full" title="High danger zone"></div>
            <div className="absolute top-12 left-20 w-3 h-3 bg-destructive rounded-full" title="High danger zone"></div>
            <div className="absolute top-24 left-32 w-3 h-3 bg-warning rounded-full" title="Medium danger zone"></div>
            <div className="absolute top-40 left-8 w-3 h-3 bg-warning rounded-full" title="Medium danger zone"></div>
            <div className="absolute top-32 left-44 w-3 h-3 bg-success rounded-full" title="Safe zone"></div>
            <div className="absolute top-48 left-36 w-3 h-3 bg-success rounded-full" title="Safe zone"></div>

            {/* Current location pin */}
            <div className="absolute top-28 left-28 w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <CardContent className="p-4 bg-muted/50 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span className="text-muted-foreground">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-muted-foreground">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-muted-foreground">Safe Zone</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <p className="text-xs text-muted-foreground mt-2">
          * Map will be replaced with live data from Mapbox/Google Maps API
        </p>
      </div>

      {/* Recent Activity */}
      <div className="p-6 pb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">Suspicious Activity Reported</h4>
                  <p className="text-muted-foreground text-sm">Main St & 5th Ave • 15 min ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">Safety Alert: Avoid Park Area</h4>
                  <p className="text-muted-foreground text-sm">Central Park vicinity • 1 hour ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
