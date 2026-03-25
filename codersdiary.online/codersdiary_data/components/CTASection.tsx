
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="relative p-12 lg:p-20 bg-blue-600 rounded-[3rem] overflow-hidden text-center group">
          {/* Decorative gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
              Ready to Become a <br />DevOps Engineer?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join the next cohort starting in 14 days. Limited seats available for personalized mentorship.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all flex items-center justify-center group/btn shadow-2xl shadow-blue-900/40">
                Enroll Now
                <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 bg-blue-700/50 backdrop-blur-sm text-white border border-blue-400/30 rounded-2xl font-bold text-lg hover:bg-blue-700/70 transition-all">
                Speak to Advisor
              </button>
            </div>
          </div>
          
          {/* Floating abstract elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
