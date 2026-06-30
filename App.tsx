import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ClientEnrollment from "./pages/ClientEnrollment";
import CommunityEnrollment from "./pages/CommunityEnrollment";
import NewClientEnrollment from "./pages/NewClientEnrollment";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/enroll/client" component={ClientEnrollment} />
      <Route path="/enroll/community" component={CommunityEnrollment} />
      <Route path="/enroll/new-client" component={NewClientEnrollment} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
