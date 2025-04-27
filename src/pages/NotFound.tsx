
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary animate-fade-in">404</h1>
        <p className="text-xl text-card-foreground animate-fade-in" style={{animationDelay: '200ms'}}>
          Oops! We couldn't find that page.
        </p>
        <div className="animate-fade-in" style={{animationDelay: '400ms'}}>
          <Button onClick={() => navigate("/")}>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
