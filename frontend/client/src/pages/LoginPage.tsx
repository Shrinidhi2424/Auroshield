import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmail, signInWithGoogle, clearError } from '../store/authSlice';
import { useAuth } from '../hooks/useAuth';
import type { AppDispatch, RootState } from '../store/store';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation('/dashboard');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      await dispatch(signInWithEmail({ email, password })).unwrap();
      toast({
        title: 'Success',
        description: 'Successfully signed in!',
      });
      setLocation('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in',
        variant: 'destructive',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(signInWithGoogle()).unwrap();
      // User will be redirected and handled by redirect result
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in with Google',
        variant: 'destructive',
      });
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: 'Password Reset',
      description: 'Password reset functionality will be implemented with Firebase Auth',
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/10 to-accent/20">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">AuroShield AI</h1>
            <p className="text-muted-foreground mt-2">Your safety companion</p>
          </div>

          {/* Login Form */}
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your email"
                      data-testid="input-email"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      placeholder="Enter your password"
                      data-testid="input-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                  data-testid="button-signin"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              {/* Social Login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  className="w-full mt-4"
                  disabled={loading}
                  data-testid="button-google-signin"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center space-y-2">
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-primary text-sm hover:underline"
                  data-testid="link-forgot-password"
                >
                  Forgot your password?
                </button>
                <div>
                  <span className="text-muted-foreground text-sm">Don't have an account? </span>
                  <Link href="/signup" className="text-primary text-sm hover:underline" data-testid="link-signup">
                    Sign up
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
