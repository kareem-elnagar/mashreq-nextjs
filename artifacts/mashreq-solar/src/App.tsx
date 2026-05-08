import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import Home from "@/pages/Home";
import ProjectsPage from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import SystemsPage from "@/pages/Systems";
import ContactPage from "@/pages/Contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/projects/:slug">
            {(params) => <ProjectDetail slug={params.slug} />}
          </Route>
          <Route path="/systems" component={SystemsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <footer className="bg-gray-50 border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          <div>
            <div className="font-bold text-xl text-primary tracking-tight">MASHREQ</div>
            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              Solar systems that keep working when it matters.
            </p>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Mashreq Engineering. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
