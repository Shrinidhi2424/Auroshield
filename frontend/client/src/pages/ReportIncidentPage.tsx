import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useDispatch } from 'react-redux';
import { ArrowLeft, MapPin, Mic, Camera, Upload, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../hooks/useAuth';
import { useLocation as useUserLocation } from '../hooks/useLocation';
import { submitReport } from '../store/reportsSlice';
import type { AppDispatch } from '../store/store';

export default function ReportIncidentPage() {
  const [, setLocation] = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { location: userLocation } = useUserLocation();
  const { toast } = useToast();

  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVoiceRecord = async () => {
    try {
      // Mock voice recording - implement with Web Audio API or media recorder
      toast({
        title: 'Voice Recording',
        description: 'Voice recording functionality will be implemented with Web Audio API',
      });
      setHasVoiceNote(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to record voice note',
        variant: 'destructive',
      });
    }
  };

  const handlePhotoUpload = async () => {
    try {
      // Mock photo upload - implement with File API or camera access
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          setHasPhoto(true);
          toast({
            title: 'Photo Added',
            description: `Photo "${file.name}" has been attached`,
          });
        }
      };
      input.click();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload photo',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide a description of the incident',
        variant: 'destructive',
      });
      return;
    }

    if (!userLocation) {
      toast({
        title: 'Error',
        description: 'Location is required. Please enable location services.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const reportData = {
        userId: isAnonymous ? null : user?.uid,
        description,
        location: JSON.stringify({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          address: userLocation.address || 'Unknown location',
        }),
        priority,
        isAnonymous,
        hasVoiceNote,
        hasPhoto,
      };

      await dispatch(submitReport(reportData)).unwrap();
      
      toast({
        title: 'Report Submitted',
        description: 'Your incident report has been submitted successfully. Authorities will be notified if necessary.',
      });
      
      setLocation('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Submission Failed',
        description: error.message || 'Failed to submit report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-xl font-bold">Report Incident</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Anonymous Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Anonymous Report</h3>
                <p className="text-muted-foreground text-sm">Your identity won't be shared</p>
              </div>
              <Switch
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
                data-testid="switch-anonymous"
              />
            </div>
          </CardContent>
        </Card>

        {/* Incident Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-foreground">
            Describe the incident
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="resize-none"
            placeholder="Please provide details about what happened, when, and any other relevant information..."
            data-testid="textarea-description"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Location</Label>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium" data-testid="text-location">
                  {userLocation?.address || 'Getting current location...'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-primary"
                data-testid="button-change-location"
              >
                <MapPin className="h-3 w-3 mr-1" />
                Change location
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Media Attachments */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Add Evidence (Optional)</h3>
          
          {/* Voice Note */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mic className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-foreground">Voice Note</h4>
                    <p className="text-muted-foreground text-sm">Record audio description</p>
                  </div>
                </div>
                <Button
                  onClick={handleVoiceRecord}
                  size="sm"
                  variant={hasVoiceNote ? "secondary" : "default"}
                  data-testid="button-voice-record"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  {hasVoiceNote ? 'Recorded' : 'Record'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Camera className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium text-foreground">Photo Evidence</h4>
                    <p className="text-muted-foreground text-sm">Upload relevant photos</p>
                  </div>
                </div>
                <Button
                  onClick={handlePhotoUpload}
                  variant="outline"
                  size="sm"
                  data-testid="button-photo-upload"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {hasPhoto ? 'Added' : 'Upload'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Level */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Priority Level</Label>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={priority === 'low' ? 'default' : 'outline'}
              onClick={() => setPriority('low')}
              className={`py-6 flex-col gap-2 ${priority === 'low' ? 'bg-success hover:bg-success/90' : 'text-success border-success/30 hover:bg-success/10'}`}
              data-testid="button-priority-low"
            >
              <div className="text-2xl">🟢</div>
              <div className="text-sm font-medium">Low</div>
            </Button>
            <Button
              variant={priority === 'medium' ? 'default' : 'outline'}
              onClick={() => setPriority('medium')}
              className={`py-6 flex-col gap-2 ${priority === 'medium' ? 'bg-warning hover:bg-warning/90' : 'text-warning border-warning/30 hover:bg-warning/10'}`}
              data-testid="button-priority-medium"
            >
              <div className="text-2xl">🟡</div>
              <div className="text-sm font-medium">Medium</div>
            </Button>
            <Button
              variant={priority === 'high' ? 'default' : 'outline'}
              onClick={() => setPriority('high')}
              className={`py-6 flex-col gap-2 ${priority === 'high' ? 'bg-destructive hover:bg-destructive/90' : 'text-destructive border-destructive/30 hover:bg-destructive/10'}`}
              data-testid="button-priority-high"
            >
              <div className="text-2xl">🔴</div>
              <div className="text-sm font-medium">High</div>
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full py-4 text-lg font-semibold shadow-lg"
            disabled={isSubmitting}
            data-testid="button-submit-report"
          >
            <Send className="h-5 w-5 mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
          <p className="text-muted-foreground text-xs text-center mt-2">
            Your report will be reviewed and appropriate authorities will be notified if necessary
          </p>
        </div>
      </div>
    </div>
  );
}
