import { Zap, Brain, ChartBar, Lock, Phone, Target } from "lucide-react";

export const steps = [
  {
    step: "01",
    title: "Paste your content",
    description:
      "Add any text, article, lecture notes or just a topic you want to study.",
  },
  {
    step: "02",
    title: "AI generates questions",
    description:
      "Our model analyses the material and creates a tailored set of questions instantly.",
  },
  {
    step: "03",
    title: "Take the quiz",
    description:
      "Answer at your own pace, get immediate feedback and see your score.",
  },
  {
    step: "04",
    title: "Review & repeat",
    description:
      "Check which areas need more attention and retake the quiz to reinforce learning.",
  },
] as const;

export const features = [
  {
    icon: Zap,
    title: "Instant generation",
    description:
      "Paste any text and get a full quiz in under 3 seconds. No manual work, no fuss.",
  },
  {
    icon: Brain,
    title: "Smart questions",
    description:
      "Our AI understands context and generates meaningful multiple-choice questions, not just keyword matches.",
  },
  {
    icon: ChartBar,
    title: "Track your progress",
    description:
      "Review your results, spot weak spots and improve over time with detailed per-quiz analytics.",
  },
  {
    icon: Lock,
    title: "Private by default",
    description:
      "Your quizzes belong to you. Share only what you want, keep the rest private.",
  },
  {
    icon: Phone,
    title: "Works everywhere",
    description:
      "Fully responsive — create and take quizzes from any device, any time.",
  },
  {
    icon: Target,
    title: "Customisable difficulty",
    description:
      "Choose the difficulty level and number of questions to match your learning goals.",
  },
] as const;
