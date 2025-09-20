import { Switch, Route } from "wouter";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ReportIncidentPage from './pages/ReportIncidentPage';
import PanicButtonPage from './pages/PanicButtonPage';
import VolunteerDashboardPage from './pages/VolunteerDashboardPage';
import ProfilePage from './pages/ProfilePage';
import AlertsPage from './pages/AlertsPage';
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </Route>
      <Route path="/report">
        <ProtectedRoute>
          <ReportIncidentPage />
        </ProtectedRoute>
      </Route>
      <Route path="/panic">
        <ProtectedRoute>
          <PanicButtonPage />
        </ProtectedRoute>
      </Route>
      <Route path="/volunteer">
        <ProtectedRoute>
          <VolunteerDashboardPage />
        </ProtectedRoute>
      </Route>
      <Route path="/profile">
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      </Route>
      <Route path="/alerts">
        <ProtectedRoute>
          <AlertsPage />
        </ProtectedRoute>
      </Route>
      <Route path="/">
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Layout>
              <Toaster />
              <Router />
            </Layout>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
