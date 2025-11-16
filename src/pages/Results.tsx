import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Copy, Download, Share2, Sparkles, ArrowRight, Lightbulb } from "lucide-react";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Streamdown } from "streamdown";

export default function Results() {
  const [, setLocation] = useLocation();
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = params.get("result");
    
    if (!result) {
      setLocation("/analyze");
    } else {
      setResults(result);
      setLoading(false);
    }
  }, [setLocation]);



  const copy = () => {
    navigator.clipboard.writeText(results);
    toast.success("Copied to clipboard!");
  };



  const download = () => {
    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grade-analysis-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AnimatedBackground />
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🎓</div>
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-transition">
      <AnimatedBackground />
      <Nav />
      
      <div className="container py-20">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Analysis Complete</span>
            </div>
            <h1 className="text-5xl font-bold">Your Analysis</h1>
            <p className="text-xl text-muted-foreground">
              AI-powered insights to help you improve
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">

            <Button variant="outline" size="lg" onClick={copy}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="lg" onClick={download}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Results Card */}
          <Card className="glass p-8 md:p-12">
            <div className="prose prose-invert max-w-none">
              <Streamdown>{results}</Streamdown>
            </div>
          </Card>

          {/* Tips Card */}
          <Card className="glass p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">Quick Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Save this analysis and review it weekly</li>
                  <li>• Focus on one subject at a time</li>
                  <li>• Track your progress with regular check-ins</li>
                  <li>• Share results with your teacher or tutor</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* CTA Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              size="lg" 
              onClick={() => setLocation("/analyze")} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
            >
              Analyze More Grades
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setLocation("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>


    </div>
  );
}
