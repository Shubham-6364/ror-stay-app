
import React from 'react';
import { BookOpen, Cpu, Route, Users, Briefcase, Award } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) => (
  <div className="group p-8 glass rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Industry-focused curriculum",
      description: "Direct mapping to real-world DevOps roles. No fluff, just the skills that companies are hiring for today.",
      color: "bg-blue-600 shadow-lg shadow-blue-600/20"
    },
    {
      icon: Cpu,
      title: "Hands-on projects",
      description: "Build real infrastructure. You won't just watch videos; you'll provision cloud resources and manage clusters.",
      color: "bg-emerald-600 shadow-lg shadow-emerald-600/20"
    },
    {
      icon: Route,
      title: "Beginner to Advanced",
      description: "We start from the foundations of Linux and networking, taking you all the way to Kubernetes orchestration.",
      color: "bg-purple-600 shadow-lg shadow-purple-600/20"
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Learn from practicing DevOps Engineers. Get your doubts cleared by professionals who do this for a living.",
      color: "bg-amber-600 shadow-lg shadow-amber-600/20"
    },
    {
      icon: Briefcase,
      title: "Career Guidance",
      description: "Personalized resume reviews and interview preparation to ensure you land your dream DevOps role.",
      color: "bg-rose-600 shadow-lg shadow-rose-600/20"
    },
    {
      icon: Award,
      title: "Capstone Projects",
      description: "Demonstrate your expertise with complex, real-world projects that stand out in your portfolio.",
      color: "bg-indigo-600 shadow-lg shadow-indigo-600/20"
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-base font-bold text-blue-500 uppercase tracking-widest mb-4">Why CodersDiary?</h2>
          <h3 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">Elevate Your Engineering Standard</h3>
          <p className="text-lg text-slate-400">We bridge the gap between traditional learning and industry expectations with a focused, practical approach.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            // Fix: Explicitly pass props to avoid TS error with spread and key prop
            <FeatureCard 
              key={idx} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              color={feature.color} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
