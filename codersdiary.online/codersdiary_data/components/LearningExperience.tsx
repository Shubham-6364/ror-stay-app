
import React from 'react';
import { Video, Disc, Laptop, Rocket, FileCheck, Search } from 'lucide-react';

const ExpItem = ({ icon: Icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="flex gap-6 items-start">
    <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-white/5">
      <Icon size={24} className="text-blue-400" />
    </div>
    <div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-slate-400 leading-relaxed">{text}</p>
    </div>
  </div>
);

const LearningExperience: React.FC = () => {
  return (
    <section id="curriculum" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">A New Standard of Learning</h2>
          <p className="text-lg text-slate-400">Not just a course, but a holistic ecosystem designed for maximum knowledge retention.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <ExpItem 
            icon={Video} 
            title="Interactive Live Training" 
            text="Engage in real-time with instructors. Ask questions, participate in discussions, and code along live." 
          />
          <ExpItem 
            icon={Disc} 
            title="LMS Access for Life" 
            text="Get lifetime access to high-quality recordings, study materials, and documentation." 
          />
          <ExpItem 
            icon={Laptop} 
            title="Hands-on Lab Practice" 
            text="Real cloud environments provided. Provision servers and deploy apps in real-time settings." 
          />
          <ExpItem 
            icon={Rocket} 
            title="Production-Grade Capstone" 
            text="End the course by building a complex CI/CD environment for a microservices architecture." 
          />
          <ExpItem 
            icon={FileCheck} 
            title="Review & Assignments" 
            text="Weekly assignments with personalized feedback from mentors to track your progress." 
          />
          <ExpItem 
            icon={Search} 
            title="Interview Masterclasses" 
            text="Dedicated sessions on how to tackle DevOps interviews at top-tier product companies." 
          />
        </div>
      </div>
    </section>
  );
};

export default LearningExperience;
