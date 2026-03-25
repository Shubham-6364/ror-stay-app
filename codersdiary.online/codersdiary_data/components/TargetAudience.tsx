
import React from 'react';
import { GraduationCap, Code2, Database, ShieldCheck, UserCheck } from 'lucide-react';

const AudienceCard = ({ icon: Icon, title, role }: { icon: any, title: string, role: string }) => (
  <div className="flex items-start space-x-4 p-6 glass rounded-xl border border-white/5 hover:border-emerald-500/20 transition-all">
    <div className="mt-1 p-2 bg-emerald-500/10 rounded-lg">
      <Icon size={20} className="text-emerald-500" />
    </div>
    <div>
      <h4 className="font-bold text-white mb-1">{title}</h4>
      <p className="text-sm text-slate-400">{role}</p>
    </div>
  </div>
);

const TargetAudience: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Designed for Every Phase of Your Career</h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Whether you're just starting your journey or looking to pivot your established career, our curriculum adapts to your background.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <AudienceCard icon={GraduationCap} title="Fresh Graduates" role="Looking for first high-pay role" />
              <AudienceCard icon={Code2} title="Developers" role="Upskilling to Cloud Native" />
              <AudienceCard icon={Database} title="System Admins" role="Moving to Automation & SRE" />
              <AudienceCard icon={ShieldCheck} title="QA Engineers" role="Advancing to DevTestOps" />
              <AudienceCard icon={UserCheck} title="Career Switchers" role="Entering the tech industry" />
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video glass rounded-2xl overflow-hidden border border-white/10 relative group">
              <img src="https://picsum.photos/seed/devops1/800/600" alt="Learning environment" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 flex flex-col justify-end p-8">
                <div className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded w-fit mb-4">Live Mentorship</div>
                <h4 className="text-2xl font-bold mb-2 italic">"The transition was seamless thanks to the structured roadmap."</h4>
                <p className="text-slate-300">Join 500+ successful alumni.</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
