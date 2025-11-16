import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useState } from "react";

import { toast } from "sonner";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Sparkles, BookOpen, TrendingUp, Lightbulb } from "lucide-react";

export default function Analyze() {
  const [, setLocation] = useLocation();
  const [gradeData, setGradeData] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const charCount = gradeData.length;
  const wordCount = gradeData.trim().split(/\s+/).filter(Boolean).length;

  const handleAnalyze = async () => {
    if (!gradeData.trim()) {
      toast.error("Please enter some grade data");
      return;
    }
    
    setIsLoading(true);
    try {
      // Call Flask backend API
      const response = await fetch(
        `http://localhost:8000/api/analyze?data=${encodeURIComponent(gradeData)}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to analyze grades");
      }

      const result = await response.text();
      setLocation(`/results?result=${encodeURIComponent(result)}`);
    } catch (error) {
      toast.error("Failed to analyze grades. Make sure Flask backend is running on port 8000.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleAnalyze();
    }
  };

  const exampleGrades = `Math - 85% - Missing 2 assignments
English - 78% - Grammar needs work  
Science - 92% - Doing great
History - 80% - Need to participate more`;

  const loadExample = () => {
    setGradeData(exampleGrades);
  };



  return (
    <div className="min-h-screen page-transition">
      <AnimatedBackground />
      <Nav />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader />
          <p className="mt-8 text-lg text-muted-foreground">Analyzing your grades...</p>
        </div>
      ) : (
        <div className="container py-20">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Analysis</span>
              </div>
              <h1 className="text-5xl font-bold">Paste Your Grades</h1>
              <p className="text-xl text-muted-foreground">
                Add your grades and notes. We'll help you improve.
              </p>
            </div>

            {/* Main Card */}
            <Card className="glass p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Grades</label>
                <Textarea
                  value={gradeData}
                  onChange={(e) => setGradeData(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Math - 85% - Missing 2 assignments&#10;English - 78% - Grammar needs work&#10;Science - 92% - Doing great"
                  className="min-h-[300px] text-base resize-none bg-background/50"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{wordCount} words</span>
                  <span>{charCount} characters</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={!gradeData.trim() || isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze Grades
                </Button>
                <Button
                  onClick={() => setGradeData("")}
                  variant="outline"
                  size="lg"
                  disabled={!gradeData.trim()}
                >
                  Clear
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Press <kbd className="px-2 py-1 rounded bg-background/50 border border-border">Ctrl</kbd> +{" "}
                <kbd className="px-2 py-1 rounded bg-background/50 border border-border">Enter</kbd> to analyze
              </p>
            </Card>

            {/* Tips Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="glass p-6 space-y-2">
                <BookOpen className="w-8 h-8 text-blue-500" />
                <h3 className="font-semibold">Be Specific</h3>
                <p className="text-sm text-muted-foreground">
                  Include subject names, percentages, and any notes
                </p>
              </Card>

              <Card className="glass p-6 space-y-2">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <h3 className="font-semibold">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Come back weekly to see how you're improving
                </p>
              </Card>

              <Card className="glass p-6 space-y-2 cursor-pointer hover:scale-105 transition-transform" onClick={loadExample}>
                <Lightbulb className="w-8 h-8 text-yellow-500" />
                <h3 className="font-semibold">Try Example</h3>
                <p className="text-sm text-muted-foreground">
                  Click to load sample grades
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
