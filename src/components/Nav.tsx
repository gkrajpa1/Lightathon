import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Nav({ showBack = false }: { showBack?: boolean }) {
  const [location, setLocation] = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => setLocation("/")} 
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          {showBack && <ArrowLeft className="w-5 h-5" />}
          <span className={showBack ? "text-xl font-bold" : "text-2xl font-bold"}>
            Grade Analyzer
          </span>
        </button>
        
        <div className="flex gap-6">
          {[
            { path: "/", label: "Home" },
            { path: "/analyze", label: "Analyze" },
            { path: "/about", label: "About" }
          ].map(({ path, label }) => (
            <button
              key={path}
              onClick={() => setLocation(path)}
              className={`text-sm transition-colors ${
                location === path ? "text-primary" : "hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
