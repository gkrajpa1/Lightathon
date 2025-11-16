import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import Nav from "@/components/Nav";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Sparkles, Zap, Heart, ArrowRight } from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();

  const sections = [
    {
      icon: Sparkles,
      title: "What It Does",
      text: "You paste your grades. AI looks at them. It tells you what to fix. That's it.",
      color: "blue"
    },
    {
      icon: Zap,
      title: "How It Works",
      items: [
        "Copy your grades from anywhere",
        "Paste them in the analyzer",
        "Get tips on how to improve",
        "Follow the advice"
      ],
      color: "purple"
    },
    {
      icon: Heart,
      title: "Who Made This",
      text: "Built for students who want better grades without the stress. No fancy stuff. Just helpful advice.",
      color: "pink"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
    pink: "bg-pink-500/10 text-pink-500"
  };

  return (
    <div className="min-h-screen page-transition">
      <AnimatedBackground />
      <Nav />
      
      <div className="container py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold">About This Tool</h1>
            <p className="text-2xl text-muted-foreground">Simple. Fast. Helpful.</p>
          </div>

          {/* Sections */}
          <div className="grid md:grid-cols-1 gap-6">
            {sections.map(({ icon: Icon, title, text, items, color }) => (
              <Card key={title} className="glass p-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">{title}</h3>
                </div>
                {text && <p className="text-foreground/80 leading-relaxed text-lg">{text}</p>}
                {items && (
                  <ul className="space-y-3 text-foreground/80 text-lg">
                    {items.map(item => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="glass p-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground">
              Start analyzing your grades in seconds
            </p>
            <Button 
              size="lg" 
              onClick={() => setLocation("/analyze")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 group"
            >
              Try It Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
