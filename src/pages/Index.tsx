
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      title: 'Task Management',
      description: 'Create, organize and track tasks with ease',
    },
    {
      title: 'Priority Levels',
      description: 'Assign priority levels to focus on what matters',
    },
    {
      title: 'Status Tracking',
      description: 'Track progress from to-do to completion',
    },
    {
      title: 'Intuitive Interface',
      description: 'Clean and modern interface for a better experience',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">TaskFlow</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/login')} 
            variant="outline"
          >
            Log In
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-accent">
          <div className="container space-y-10 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
                  Streamline Your Task Management
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-fade-in" style={{animationDelay: '200ms'}}>
                  Boost your productivity with our intuitive task management platform.
                  Organize, prioritize, and track your tasks with ease.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '400ms'}}>
                <Button className="animate-fade-in" size="lg" onClick={() => navigate('/login')}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in">
                  Features
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-fade-in" style={{animationDelay: '100ms'}}>
                  Everything you need to manage your tasks effectively
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {features.map((feature, index) => (
                <div key={index} className="flex animate-fade-in" style={{animationDelay: `${200 + index * 100}ms`}}>
                  <div className="flex items-center space-x-4 rounded-lg border p-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <div className="space-y-1">
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center animate-fade-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join TaskFlow today and transform your productivity
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" size="lg" onClick={() => navigate('/login')}>
                  Sign Up Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t items-center px-4 md:px-6">
        <p className="text-xs text-muted-foreground">
          © 2025 TaskFlow. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
