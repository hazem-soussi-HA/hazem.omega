"use client";

import { notFound } from "next/navigation";
import { Card, Badge } from "@/app/components/ui";
import { getProgress } from "@/lib/supabaseClient";
import { BookOpen, CheckCircle, Circle, Play } from "lucide-react";
import { useState, useEffect } from "react";

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  thumbnail: string;
}

const courses: Record<string, Course> = {
  "devops-fundamentals": {
    id: "devops-fundamentals",
    title: "DevOps Fundamentals",
    description: "Master CI/CD pipelines, containerization, and infrastructure as code.",
    thumbnail: "🚀",
    lessons: [
      { id: "intro", title: "Introduction to DevOps", content: "# DevOps Fundamentals\\n\\nDevOps is a set of practices that combines software development (Dev) and IT operations (Ops).\\n\\n## Key Principles\\n- Continuous Integration (CI)\\n- Continuous Deployment (CD)\\n- Infrastructure as Code (IaC)\\n- Monitoring and Feedback" },
      { id: "cicd", title: "CI/CD Pipelines", content: "# CI/CD Pipelines\\n\\nLearn how to automate your build, test, and deployment processes.\\n\\n## Tools Covered\\n- GitHub Actions\\n- Jenkins\\n- GitLab CI\\n- ArgoCD" },
      { id: "docker", title: "Docker Fundamentals", content: "# Docker Fundamentals\\n\\nContainerization is at the heart of modern DevOps.\\n\\n## Topics\\n- Dockerfiles\\n- Docker Compose\\n- Multi-stage builds\\n- Container networking" },
      { id: "terraform", title: "Infrastructure as Code", content: "# Infrastructure as Code\\n\\nManage your infrastructure using code.\\n\\n## Terraform Basics\\n- Providers\\n- Resources\\n- State management\\n- Modules" },
    ],
  },
  "kubernetes-mastery": {
    id: "kubernetes-mastery",
    title: "Kubernetes Mastery",
    description: "Deploy, scale, and manage containerized applications on K8s.",
    thumbnail: "⎈",
    lessons: [
      { id: "intro", title: "Kubernetes Overview", content: "# Kubernetes Overview\\n\\nKubernetes is the de facto standard for container orchestration.\\n\\n## Architecture\\n- Control Plane\\n- Nodes\\n- Pods\\n- Services" },
      { id: "pods", title: "Working with Pods", content: "# Pods\\n\\nPods are the smallest deployable units in Kubernetes." },
      { id: "services", title: "Services & Networking", content: "# Services & Networking\\n\\nExpose your applications with Kubernetes Services." },
    ],
  },
  "ai-for-developers": {
    id: "ai-for-developers",
    title: "AI for Developers",
    description: "Build AI-powered applications using Ollama, LangChain, and RAG.",
    thumbnail: "🤖",
    lessons: [
      { id: "intro", title: "Introduction to AI Development", content: "# AI for Developers\\n\\nBuild intelligent applications with modern AI tools." },
      { id: "ollama", title: "Ollama Setup", content: "# Ollama Setup\\n\\nRun LLMs locally with Ollama." },
      { id: "rag", title: "RAG Implementation", content: "# RAG - Retrieval Augmented Generation\\n\\nCombine LLMs with your own data." },
    ],
  },
};

interface Props {
  params: { courseId: string };
}

export default function AcademyCoursePage({ params }: Props) {
  const course = courses[params.courseId];
  if (!course) notFound();

  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadProgress = async () => {
      // In production, load from Supabase
    };
    loadProgress();
  }, []);

  const toggleComplete = (lessonId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  };

  const progress = Math.round((completed.size / course.lessons.length) * 100);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <Card className="sticky top-20">
            <div className="text-4xl mb-3">{course.thumbnail}</div>
            <h2 className="text-lg font-bold mb-1">{course.title}</h2>
            <p className="text-xs text-muted mb-4">{course.description}</p>
            <div className="mb-4">
              <div className="flex justify-between text-xs text-muted mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <nav className="space-y-1">
              {course.lessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(idx)}
                  className={`w-full flex items-center gap-2 text-left text-sm px-2 py-1.5 rounded ${
                    activeLesson === idx ? "bg-accent/20 text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  {completed.has(lesson.id) ? (
                    <CheckCircle className="h-4 w-4 text-neon-green shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0" />
                  )}
                  {lesson.title}
                </button>
              ))}
            </nav>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <Badge variant="secondary">Lesson {activeLesson + 1} of {course.lessons.length}</Badge>
                <h2 className="text-xl font-bold mt-2">{course.lessons[activeLesson].title}</h2>
              </div>
              <button
                onClick={() => toggleComplete(course.lessons[activeLesson].id)}
                className="flex items-center gap-1 text-sm text-neon-green hover:text-neon-green/80"
              >
                <CheckCircle className="h-4 w-4" />
                {completed.has(course.lessons[activeLesson].id) ? "Completed" : "Mark Complete"}
              </button>
            </div>

            {/* Video placeholder */}
            <div className="aspect-video bg-gradient-to-br from-card-foreground/20 to-accent/10 rounded-lg mb-6 flex items-center justify-center">
              <Play className="h-12 w-12 text-accent/50" />
            </div>

            {/* Lesson Content */}
            <div className="prose prose-invert max-w-none">
              {course.lessons[activeLesson].content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mt-6 mb-3">{line.slice(2)}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold mt-4 mb-2">{line.slice(3)}</h2>;
                if (line.startsWith('- ')) return <li key={i} className="ml-4 text-muted">{line.slice(2)}</li>;
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="text-muted">{line}</p>;
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
                disabled={activeLesson === 0}
                className="text-sm text-muted disabled:opacity-30"
              >
                Previous Lesson
              </button>
              <button
                onClick={() => setActiveLesson(Math.min(course.lessons.length - 1, activeLesson + 1))}
                disabled={activeLesson === course.lessons.length - 1}
                className="text-sm text-accent disabled:opacity-30"
              >
                Next Lesson
              </button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
