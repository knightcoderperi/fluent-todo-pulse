
import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function ThemeToggle() {
  const { profile, updateProfile } = useAuth();
  
  useEffect(() => {
    // Set initial theme
    document.documentElement.className = profile?.theme || 'dark';
  }, [profile?.theme]);

  const toggleTheme = async () => {
    const newTheme = profile?.theme === 'dark' ? 'light' : 'dark';
    await updateProfile({ theme: newTheme });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
