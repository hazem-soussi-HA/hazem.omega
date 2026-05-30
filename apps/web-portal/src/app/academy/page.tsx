import { Card, Badge } from "@/app/components/ui";
import { BookOpen, Clock, Award, Play } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: "devops-fundamentals",
    title: "DevOps Fundamentals",
    description: "Master CI/CD pipelines, containerization, and infrastructure as code.",
    lessons: 24,
    duration: "12h",
    level: "Beginner",
    thumbnail: "🚀",
    enrolled: 1234,
  },
  {
    id: "kubernetes-mastery",
    title: "Kubernetes Mastery",
    description: "Deploy, scale, and manage containerized applications on K8s.",
    lessons: 32,
    duration: "18h",
    level: "Intermediate",
    thumbnail: "⎈",
    enrolled: 876,
  },
  {
    id: "terraform-at-scale",
    title: "Terraform at Scale",
    description: "Multi-cloud infrastructure automation with Terraform and modules.",
    lessons: 20,
    duration: "10h",
    level: "Advanced",
    thumbnail: "🏗️",
    enrolled: 654,
  },
  {
    id: "ai-for-developers",
    title: "AI for Developers",
    description: "Build AI-powered applications using Ollama, LangChain, and RAG.",
    lessons: 18,
    duration: "9h",
    level: "Intermediate",
    thumbnail: "🤖",
    enrolled: 2341,
  },
  {
    id: "security-ops",
    title: "Security Operations",
    description: "Implement security best practices, vulnerability scanning, and compliance.",
    lessons: 16,
    duration: "8h",
    level: "Advanced",
    thumbnail: "🔒",
    enrolled: 432,
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    description: "Design scalable, resilient cloud architectures across AWS, GCP, and Azure.",
    lessons: 28,
    duration: "14h",
    level: "Intermediate",
    thumbnail: "☁️",
    enrolled: 1089,
  },
];

export default function AcademyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Academy</h1>
        <p className="text-muted">Learn cutting-edge DevOps and cloud skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/academy/${course.id}`}>
            <Card className="h-full hover:border-accent/50 transition-colors cursor-pointer group">
              <div className="text-5xl mb-4">{course.thumbnail}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" /> {course.lessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Play className="h-3 w-3" /> {course.level}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{course.enrolled} enrolled</Badge>
                <Badge variant="success">{Math.floor(Math.random() * 30 + 70)}% complete</Badge>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="inline-block">
          <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="font-semibold mb-1">Get Certified</h3>
          <p className="text-sm text-muted">Complete courses to earn certificates</p>
        </Card>
      </div>
    </div>
  );
}
