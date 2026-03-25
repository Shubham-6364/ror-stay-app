
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ name, role, content, image }: { name: string, role: string, content: string, image: string }) => (
  <div className="p-8 glass rounded-2xl border border-white/5 relative flex flex-col h-full group">
    <Quote size={40} className="absolute top-4 right-4 text-white/5 group-hover:text-blue-500/10 transition-colors" />
    <div className="flex mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
    <p className="text-slate-300 italic mb-8 flex-grow leading-relaxed">
      "{content}"
    </p>
    <div className="flex items-center space-x-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/20" />
      <div>
        <h4 className="font-bold text-white leading-tight">{name}</h4>
        <p className="text-xs text-slate-500">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "SRE at Fortune 500",
      content: "I was a manual QA for 4 years. CodersDiary gave me the roadmap and confidence to switch to DevOps. The Kubernetes labs were a game-changer.",
      image: "https://picsum.photos/seed/person1/100/100"
    },
    {
      name: "Sneha Patel",
      role: "DevOps Engineer at Tech Unicorn",
      content: "The industry-standard projects helped me clear my technical interviews with ease. Mentors are really helpful and available when you're stuck.",
      image: "https://picsum.photos/seed/person2/100/100"
    },
    {
      name: "Arjun Mehta",
      role: "Fullstack Developer",
      content: "The bridge between development and operations was made so clear. Now I can manage my own infrastructure using Terraform and AWS.",
      image: "https://picsum.photos/seed/person3/100/100"
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Built for Success</h2>
          <p className="text-lg text-slate-400">Hear from those who transformed their careers through our platform.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            // Fix: Explicitly pass props to avoid TS error with spread and key prop
            <TestimonialCard 
              key={idx} 
              name={t.name} 
              role={t.role} 
              content={t.content} 
              image={t.image} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
