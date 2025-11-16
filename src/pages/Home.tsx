import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen page-transition">
      <AnimatedBackground />
      <Nav />
      
      {/* Hero Section */}
      <section className="container min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              Get Better
              <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Grades
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Paste your grades. Get AI tips. Improve fast.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => setLocation("/analyze")}
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
            >
              Start Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation("/about")}
              className="text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <Card className="glass max-w-4xl mx-auto p-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Improve?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of students getting better grades
          </p>
          <Button
            size="lg"
            onClick={() => setLocation("/analyze")}
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started Free
          </Button>
        </Card>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        Made for students
      </footer>
    </div>
  );
}
