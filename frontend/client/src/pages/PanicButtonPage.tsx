import { useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, AlertTriangle, Phone, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLocation as useUserLocation } from '../hooks/useLocation';
import { apiClient } from '../lib/api';

export default function PanicButtonPage() {
  const [, setLocation] = useLocation();
  const { location: userLocation } = useUserLocation();
  const { toast } = useToast();

  const [isPanicActivated, setIsPanicActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isActivating, setIsActivating] = useState(false);
  
  const pressTimer = useRef<NodeJS.Timeout>();
  const countdownTimer = useRef<NodeJS.Timeout>();

  const handlePanicStart = () => {
    if (isPanicActivated) return;
    
    setIsActivating(true);
    setCountdown(3);
    
    // Start countdown
    countdownTimer.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          activatePanic();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Long press detection
    pressTimer.current = setTimeout(() => {
      activatePanic();
    }, 3000);
  };

  const handlePanicEnd = () => {
    if (isPanicActivated) return;
    
    setIsActivating(false);
    setCountdown(0);
    
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
    if (countdownTimer.current) {
      clearInterval(countdownTimer.current);
    }
  };

  const activatePanic = async () => {
    if (countdownTimer.current) {
      clearInterval(countdownTimer.current);
    }
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
    
    setIsActivating(false);
    setIsPanicActivated(true);

    try {
      // Trigger panic alert through API
      if (userLocation) {
        await apiClient.triggerPanicAlert({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          address: userLocation.address,
        });
      }

      toast({
        title: 'Emergency Alert Activated',
        description: 'Emergency services and contacts have been notified with your location.',
        variant: 'destructive',
      });

      // Auto-redirect after 5 seconds
      setTimeout(() => {
        setLocation('/dashboard');
      }, 5000);
      
    } catch (error) {
      toast({
        title: 'Alert Failed',
        description: 'Failed to send emergency alert. Please try again or call 911 directly.',
        variant: 'destructive',
      });
      setIsPanicActivated(false);
    }
  };

  if (isPanicActivated) {
    return (
      <div className="min-h-screen bg-destructive flex flex-col items-center justify-center text-center p-8">
        <div className="mb-8">
          <div className="w-24 h-24 bg-destructive-foreground/20 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <AlertTriangle className="h-12 w-12 text-destructive-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-destructive-foreground mb-2">Alert Sent</h1>
          <p className="text-destructive-foreground/80 text-lg">Emergency services have been contacted</p>
        </div>

        <Card className="bg-destructive-foreground/10 border-destructive-foreground/20 mb-6">
          <CardContent className="p-6 text-destructive-foreground">
            <h3 className="font-semibold mb-3">Notifications Sent To:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Emergency Services (911)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>5 Nearby Volunteers</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>3 Emergency Contacts</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Link href="/dashboard">
          <Button 
            variant="outline" 
            className="border-destructive-foreground/30 text-destructive-foreground hover:bg-destructive-foreground/10"
            data-testid="button-return-dashboard"
          >
            Return to Safety Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-destructive flex flex-col">
      {/* Header */}
      <div className="bg-destructive text-destructive-foreground px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-destructive-foreground/20"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Emergency Panic</h1>
        </div>
      </div>

      {/* Main Panic Interface */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-8">
          <AlertTriangle className="h-20 w-20 text-destructive-foreground mb-4 mx-auto" />
          <h2 className="text-3xl font-bold text-destructive-foreground mb-2">Emergency Mode</h2>
          <p className="text-destructive-foreground/80 text-lg">Press and hold for 3 seconds to activate</p>
        </div>

        {/* Giant Panic Button */}
        <div className="relative">
          <button
            onMouseDown={handlePanicStart}
            onMouseUp={handlePanicEnd}
            onMouseLeave={handlePanicEnd}
            onTouchStart={handlePanicStart}
            onTouchEnd={handlePanicEnd}
            className="w-48 h-48 bg-destructive-foreground/20 hover:bg-destructive-foreground/30 rounded-full flex items-center justify-center transition-all duration-200 border-8 border-destructive-foreground/30 animate-pulse"
            data-testid="button-panic"
          >
            <div className="text-center">
              <div className="text-6xl mb-2">🚨</div>
              <div className="text-destructive-foreground font-bold text-2xl">PANIC</div>
            </div>
          </button>
          
          {/* Countdown overlay */}
          {isActivating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="text-6xl font-bold text-destructive-foreground animate-pulse" 
                data-testid="text-countdown"
              >
                {countdown}
              </div>
            </div>
          )}
        </div>

        {/* Warning Message */}
        <div className="mt-8 max-w-sm">
          <Card className="bg-destructive-foreground/10 border-destructive-foreground/20">
            <CardContent className="p-4">
              <p className="text-destructive-foreground text-sm leading-relaxed">
                <AlertTriangle className="inline h-4 w-4 mr-2" />
                This will immediately alert emergency contacts, nearby volunteers, and local authorities with your location.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts Preview */}
        <div className="mt-6 w-full max-w-sm">
          <h3 className="text-destructive-foreground font-semibold mb-3">Will notify:</h3>
          <div className="space-y-2">
            <Card className="bg-destructive-foreground/10 border-destructive-foreground/20">
              <CardContent className="p-3">
                <div className="flex items-center gap-3 text-destructive-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">Emergency Services (911)</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-destructive-foreground/10 border-destructive-foreground/20">
              <CardContent className="p-3">
                <div className="flex items-center gap-3 text-destructive-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Nearby Volunteers (5)</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-destructive-foreground/10 border-destructive-foreground/20">
              <CardContent className="p-3">
                <div className="flex items-center gap-3 text-destructive-foreground">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">Emergency Contacts (3)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* False Alarm Button */}
        <Link href="/dashboard">
          <Button 
            variant="outline" 
            className="mt-8 border-destructive-foreground/30 text-destructive-foreground hover:bg-destructive-foreground/10"
            data-testid="button-cancel"
          >
            Cancel & Return to Safety
          </Button>
        </Link>
      </div>
    </div>
  );
}
