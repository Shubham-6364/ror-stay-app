
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const OutcomeItem = ({ title }: { title: string }) => (
  <div className="flex items-center space-x-3 text-slate-300">
    <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
    <span className="font-medium">{title}</span>
  </div>
);

const CareerOutcomes: React.FC = () => {
  return (
    <section id="outcomes" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="glass p-12 lg:p-16 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[100px] pointer-events-none"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">Tangible Results for <br /><span className="text-blue-400">Your Engineering Career</span></h2>
              <p className="text-xl text-slate-400 mb-10">
                Our success is measured by your transition. We provide the tools, you provide the dedication.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                <OutcomeItem title="Job-ready DevOps skills" />
                <OutcomeItem title="Mock Interview Drill" />
                <OutcomeItem title="Real project experience" />
                <OutcomeItem title="Production Environment access" />
                <OutcomeItem title="Resume & LinkedIn Review" />
                <OutcomeItem title="Confidence to Lead Teams" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 glass bg-white/5 rounded-3xl border border-white/10 text-center">
                <div className="text-4xl font-extrabold text-white mb-2">120%</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Avg. Salary Hike</div>
              </div>
              <div className="p-8 glass bg-white/5 rounded-3xl border border-white/10 text-center mt-8">
                <div className="text-4xl font-extrabold text-white mb-2">500+</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Success Stories</div>
              </div>
              <div className="p-8 glass bg-white/5 rounded-3xl border border-white/10 text-center">
                <div className="text-4xl font-extrabold text-white mb-2">50+</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Hiring Partners</div>
              </div>
              <div className="p-8 glass bg-white/5 rounded-3xl border border-white/10 text-center mt-8">
                <div className="text-4xl font-extrabold text-white mb-2">100%</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Practical Labs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerOutcomes;
