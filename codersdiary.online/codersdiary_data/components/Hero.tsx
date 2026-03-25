
import React from 'react';
import { ChevronRight, ShieldCheck, Zap, Cloud } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 glass rounded-full border border-blue-500/30 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Registration Open for 2025</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
              Build Your Career in <span className="text-gradient">DevOps</span> with Real-World Training
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Hands-on DevOps training for students and IT professionals. Learn cloud, CI/CD, containers, and automation from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center group transition-all">
                Start Your DevOps Journey
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 glass text-white rounded-xl font-bold border border-white/10 hover:border-white/20 transition-all">
                View Curriculum
              </button>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 opacity-60">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span className="text-sm font-medium">Industry Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap size={18} className="text-amber-500" />
                <span className="text-sm font-medium">100% Hands-on</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cloud size={18} className="text-blue-500" />
                <span className="text-sm font-medium">AWS/Cloud focus</span>
              </div>
            </div>
          </div>

          {/* Visual - Terminal UI */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            <div className="glass rounded-xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="text-xs font-mono text-slate-500">codersdiary — pipeline</div>
                <div className="w-10"></div>
              </div>
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm leading-relaxed text-blue-50 bg-slate-950/50">
                <div className="mb-2"><span className="text-emerald-400">➜</span> <span className="text-blue-400">~</span> codersdiary deploy --prod</div>
                <div className="text-slate-500 mb-2">Analyzing infrastructure requirements...</div>
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-slate-400">[1/4]</span>
                  <span className="text-blue-300">Provisioning Terraform resources...</span>
                  <span className="text-emerald-400 font-bold ml-auto">DONE</span>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-slate-400">[2/4]</span>
                  <span className="text-blue-300">Building Docker images...</span>
                  <span className="text-emerald-400 font-bold ml-auto">DONE</span>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-slate-400">[3/4]</span>
                  <span className="text-blue-300">Deploying to Kubernetes...</span>
                  <span className="text-emerald-400 font-bold ml-auto">DONE</span>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-slate-400">[4/4]</span>
                  <span className="text-blue-300">Configuring GitHub Actions...</span>
                  <span className="text-emerald-400 font-bold ml-auto">DONE</span>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <span className="text-emerald-400 font-bold">SUCCESS:</span> System ready at <span className="underline decoration-emerald-500/30">https://your-career.dev</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
