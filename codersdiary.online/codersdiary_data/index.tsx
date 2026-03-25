
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Terminal, Menu, X, ChevronRight, ShieldCheck, Zap, Cloud, 
  BookOpen, Cpu, Route, Users, Briefcase, Award, Layers, 
  Github, Container, Server, Code, BarChart, Settings,
  GraduationCap, Code2, Database, UserCheck, Video, Disc,
  Laptop, Rocket, FileCheck, Search, CheckCircle2, Star, 
  Quote, ArrowRight, Linkedin, Youtube, Mail, MapPin, Phone,
  ExternalLink, BadgeCheck
} from 'lucide-react';

// --- Navbar Component ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Terminal size={24} className="text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">Coders<span className="text-blue-400">Diary</span></span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#curriculum" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Curriculum</a>
          <a href="#why-us" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Why CodersDiary</a>
          <a href="#mentorship" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Mentorship</a>
          <a href="#outcomes" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Outcomes</a>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
            Enroll Now
          </button>
        </div>
        <button className="md:hidden text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/10 p-6 flex flex-col space-y-4">
          <a href="#curriculum" className="text-lg text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>Curriculum</a>
          <a href="#why-us" className="text-lg text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>Why CodersDiary</a>
          <a href="#mentorship" className="text-lg text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>Mentorship</a>
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">Start Your Journey</button>
        </div>
      )}
    </nav>
  );
};

// --- Hero Component ---
const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[128px] pointer-events-none"></div>
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 glass rounded-full border border-blue-500/30 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Registration Open for 2026</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            Build Your Career in <span className="text-gradient">DevOps</span> with Real-World Training
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Hands-on DevOps training for students and IT professionals. Learn cloud, CI/CD, containers, and automation from industry experts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center group transition-all">
              Start Your DevOps Journey <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 glass text-white rounded-xl font-bold border border-white/10 hover:border-white/20 transition-all">View Curriculum</button>
          </div>
          <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 opacity-60">
            <div className="flex items-center space-x-2"><ShieldCheck size={18} className="text-emerald-500" /><span className="text-sm font-medium">Industry Certified</span></div>
            <div className="flex items-center space-x-2"><Zap size={18} className="text-amber-500" /><span className="text-sm font-medium">100% Hands-on</span></div>
            <div className="flex items-center space-x-2"><Cloud size={18} className="text-blue-500" /><span className="text-sm font-medium">AWS/Cloud focus</span></div>
          </div>
        </div>
        <div className="flex-1 w-full max-w-2xl lg:max-w-none">
          <div className="glass rounded-xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="text-xs font-mono text-slate-500">codersdiary — pipeline</div>
              <div className="w-10"></div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed text-blue-50 bg-slate-950/50">
              <div className="mb-2"><span className="text-emerald-400">➜</span> <span className="text-blue-400">~</span> codersdiary deploy --prod</div>
              <div className="text-slate-500 mb-2">Analyzing infrastructure...</div>
              <div className="flex items-center space-x-4 mb-2"><span className="text-slate-400">[1/4]</span> <span className="text-blue-300">Provisioning Terraform resources...</span> <span className="text-emerald-400 font-bold ml-auto">DONE</span></div>
              <div className="flex items-center space-x-4 mb-2"><span className="text-slate-400">[2/4]</span> <span className="text-blue-300">Building Docker images...</span> <span className="text-emerald-400 font-bold ml-auto">DONE</span></div>
              <div className="flex items-center space-x-4 mb-2"><span className="text-slate-400">[3/4]</span> <span className="text-blue-300">Deploying to Kubernetes...</span> <span className="text-emerald-400 font-bold ml-auto">DONE</span></div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mt-4">
                <span className="text-emerald-400 font-bold">SUCCESS:</span> System ready at <span className="underline decoration-emerald-500/30">https://your-career.dev</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Features Component ---
const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="group p-8 glass rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    { icon: BookOpen, title: "Industry-focused curriculum", description: "Direct mapping to real-world DevOps roles. No fluff, just the skills that companies are hiring for today.", color: "bg-blue-600 shadow-lg shadow-blue-600/20" },
    { icon: Cpu, title: "Hands-on projects", description: "Build real infrastructure. You won't just watch videos; you'll provision cloud resources and manage clusters.", color: "bg-emerald-600 shadow-lg shadow-emerald-600/20" },
    { icon: Route, title: "Beginner to Advanced", description: "We start from the foundations of Linux and networking, taking you all the way to Kubernetes orchestration.", color: "bg-purple-600 shadow-lg shadow-purple-600/20" },
    { icon: Users, title: "Expert Mentorship", description: "Learn from practicing DevOps Engineers. Get your doubts cleared by professionals who do this for a living.", color: "bg-amber-600 shadow-lg shadow-amber-600/20" },
    { icon: Briefcase, title: "Career Guidance", description: "Personalized resume reviews and interview preparation to ensure you land your dream DevOps role.", color: "bg-rose-600 shadow-lg shadow-rose-600/20" },
    { icon: Award, title: "Capstone Projects", description: "Demonstrate your expertise with complex, real-world projects that stand out in your portfolio.", color: "bg-indigo-600 shadow-lg shadow-indigo-600/20" }
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
          {features.map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
};

// --- Tech Stack ---
const SkillItem = ({ name, icon: Icon, tags }) => (
  <div className="p-6 glass rounded-2xl border border-white/5 flex flex-col items-center text-center group transition-all hover:bg-slate-900">
    <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 transition-all">
      <Icon size={28} className="text-blue-400 group-hover:text-white" />
    </div>
    <h4 className="font-bold text-lg mb-2">{name}</h4>
    <div className="flex flex-wrap justify-center gap-2">
      {tags.map((tag, i) => <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-800 rounded-full text-slate-400 font-medium">{tag}</span>)}
    </div>
  </div>
);

const TechStack = () => {
  const skills = [
    { name: "Linux & OS", icon: Terminal, tags: ["Shell", "Networking", "Security"] },
    { name: "VCS", icon: Github, tags: ["Git", "GitHub", "Branching"] },
    { name: "Containers", icon: Container, tags: ["Docker", "K8s", "Registries"] },
    { name: "CI/CD", icon: Settings, tags: ["Jenkins", "Actions", "Pipelines"] },
    { name: "Cloud Platforms", icon: Server, tags: ["AWS", "Azure", "Serverless"] },
    { name: "IaC", icon: Layers, tags: ["Terraform", "Ansible", "Pulumi"] },
    { name: "Observability", icon: BarChart, tags: ["Prometheus", "Grafana", "ELK"] },
    { name: "SRE", icon: Code, tags: ["Go", "Python", "Automation"] },
  ];
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Comprehensive Toolset Coverage</h2>
            <p className="text-lg text-slate-400">Master the modern DevOps toolchain used by world-class engineering teams.</p>
          </div>
          <div className="flex space-x-2"><span className="px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-bold rounded-lg border border-blue-500/20">End-to-End</span></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((s, i) => <SkillItem key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
};

// --- Target Audience ---
const AudienceCard = ({ icon: Icon, title, role }) => (
  <div className="flex items-start space-x-4 p-6 glass rounded-xl border border-white/5 hover:border-emerald-500/20 transition-all">
    <div className="mt-1 p-2 bg-emerald-500/10 rounded-lg"><Icon size={20} className="text-emerald-500" /></div>
    <div><h4 className="font-bold text-white mb-1">{title}</h4><p className="text-sm text-slate-400">{role}</p></div>
  </div>
);

const TargetAudience = () => (
  <section className="py-24 bg-slate-900/30">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Designed for Every Phase of Your Career</h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">Whether you're just starting your journey or looking to pivot your established career, our curriculum adapts to your background.</p>
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
        </div>
      </div>
    </div>
  </section>
);

// --- Mentorship Section ---
const Mentorship = () => {
  return (
    <section id="mentorship" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-base font-bold text-blue-500 uppercase tracking-widest mb-4">The Mentorship Advantage</h2>
          <h3 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">Learn from Industry Veterans</h3>
          <p className="text-lg text-slate-400">Don't just learn from documentation. Learn from the experiences of professionals who manage production scale infrastructure.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-[2rem] border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-2/5 relative">
              <img 
                src="https://picsum.photos/seed/shubham/600/800" 
                alt="Shubham Rajawat" 
                className="w-full h-full object-cover min-h-[400px] lg:min-h-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/20"></div>
              <div className="absolute bottom-6 left-6 lg:hidden">
                <h4 className="text-3xl font-bold text-white">Shubham Rajawat</h4>
                <p className="text-blue-400 font-medium">Senior DevOps Engineer</p>
              </div>
            </div>
            <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
              <div className="hidden lg:block mb-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
                  <BadgeCheck size={16} className="text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Head Mentor</span>
                </div>
                <h4 className="text-4xl font-extrabold text-white mb-2">Shubham Rajawat</h4>
                <p className="text-xl text-blue-400 font-medium">Senior DevOps & Cloud Architect</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5">
                    <Award size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">4+ Years Experience</h5>
                    <p className="text-sm text-slate-400">Dedicated to DevOps, Cloud Native, and SRE practices.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5">
                    <Layers size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">Production Expert</h5>
                    <p className="text-sm text-slate-400">Experience with Kubernetes, AWS, Terraform, and scaling high-traffic systems.</p>
                  </div>
                </div>

                <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 italic text-slate-300 leading-relaxed relative">
                  <Quote size={32} className="absolute -top-2 -left-2 text-white/5" />
                  "My goal at CodersDiary is to cut through the noise and teach you exactly what works in production. I've seen countless engineers struggle with the 'theory-gap'—we're here to close it through 100% hands-on learning."
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {['Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Docker', 'SRE'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono text-slate-400 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="pt-6">
                  <button className="inline-flex items-center text-blue-400 hover:text-blue-300 font-bold group">
                    Connect on LinkedIn <ExternalLink size={16} className="ml-2 group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Learning Experience ---
const ExpItem = ({ icon: Icon, title, text }) => (
  <div className="flex gap-6 items-start">
    <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-white/5"><Icon size={24} className="text-blue-400" /></div>
    <div><h4 className="text-lg font-bold mb-2">{title}</h4><p className="text-slate-400 leading-relaxed">{text}</p></div>
  </div>
);

const LearningExperience = () => (
  <section id="curriculum" className="py-24 bg-slate-950">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">A New Standard of Learning</h2>
        <p className="text-lg text-slate-400">Not just a course, but a holistic ecosystem designed for maximum knowledge retention.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        <ExpItem icon={Video} title="Interactive Live Training" text="Engage in real-time with instructors. Ask questions, participate in discussions, and code along live." />
        <ExpItem icon={Disc} title="LMS Access for Life" text="Get lifetime access to high-quality recordings, study materials, and documentation." />
        <ExpItem icon={Laptop} title="Hands-on Lab Practice" text="Real cloud environments provided. Provision servers and deploy apps in real-time settings." />
        <ExpItem icon={Rocket} title="Production-Grade Capstone" text="End the course by building a complex CI/CD environment for a microservices architecture." />
        <ExpItem icon={FileCheck} title="Review & Assignments" text="Weekly assignments with personalized feedback from mentors to track your progress." />
        <ExpItem icon={Search} title="Interview Masterclasses" text="Dedicated sessions on how to tackle DevOps interviews at top-tier product companies." />
      </div>
    </div>
  </section>
);

// --- Career Outcomes ---
const OutcomeItem = ({ title }) => (
  <div className="flex items-center space-x-3 text-slate-300"><CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" /><span className="font-medium">{title}</span></div>
);

const CareerOutcomes = () => (
  <section id="outcomes" className="py-24 bg-slate-900/50">
    <div className="container mx-auto px-6">
      <div className="glass p-12 lg:p-16 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">Tangible Results for <br /><span className="text-blue-400">Your Engineering Career</span></h2>
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              <OutcomeItem title="Job-ready DevOps skills" />
              <OutcomeItem title="Mock Interview Drill" />
              <OutcomeItem title="Real project experience" />
              <OutcomeItem title="Production Environment access" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 glass bg-white/5 rounded-3xl border border-white/10 text-center"><div className="text-4xl font-extrabold text-white mb-2">120%</div><div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Avg. Salary Hike</div></div>
            <div className="p-8 glass bg-white/5 rounded-3xl border border-white/10 text-center mt-8"><div className="text-4xl font-extrabold text-white mb-2">500+</div><div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Success Stories</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Testimonials ---
const TestimonialCard = ({ name, role, content, image }) => (
  <div className="p-8 glass rounded-2xl border border-white/5 relative flex flex-col h-full group">
    <Quote size={40} className="absolute top-4 right-4 text-white/5 group-hover:text-blue-500/10 transition-colors" />
    <div className="flex mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}</div>
    <p className="text-slate-300 italic mb-8 flex-grow leading-relaxed">"{content}"</p>
    <div className="flex items-center space-x-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/20" />
      <div><h4 className="font-bold text-white leading-tight">{name}</h4><p className="text-xs text-slate-500">{role}</p></div>
    </div>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    { name: "Rahul Sharma", role: "SRE at Fortune 500", content: "I was a manual QA for 4 years. CodersDiary gave me the roadmap and confidence to switch to DevOps. The Kubernetes labs were a game-changer.", image: "https://picsum.photos/seed/person1/100/100" },
    { name: "Sneha Patel", role: "DevOps Engineer at Tech Unicorn", content: "The industry-standard projects helped me clear my technical interviews with ease. Mentors are really helpful.", image: "https://picsum.photos/seed/person2/100/100" },
    { name: "Arjun Mehta", role: "Fullstack Developer", content: "The bridge between development and operations was made so clear. Now I can manage my own infrastructure.", image: "https://picsum.photos/seed/person3/100/100" }
  ];
  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-12">Built for Success</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>
    </section>
  );
};

// --- CTA Section ---
const CTASection = () => (
  <section className="py-24 bg-slate-950">
    <div className="container mx-auto px-6">
      <div className="relative p-12 lg:p-20 bg-blue-600 rounded-[3rem] overflow-hidden text-center group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8">Ready to Become a <br />DevOps Engineer?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">Join the next cohort starting in 14 days. Limited seats available for personalized mentorship.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all flex items-center justify-center group/btn shadow-2xl shadow-blue-900/40">Enroll Now <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" /></button>
            <button className="w-full sm:w-auto px-10 py-5 bg-blue-700/50 backdrop-blur-sm text-white border border-blue-400/30 rounded-2xl font-bold text-lg hover:bg-blue-700/70 transition-all">Speak to Advisor</button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Footer Component ---
const Footer = () => (
  <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5 text-center">
    <div className="container mx-auto px-6">
      <div className="flex items-center justify-center space-x-2 mb-8">
        <div className="p-2 bg-blue-600 rounded-lg"><Terminal size={24} className="text-white" /></div>
        <span className="text-xl font-extrabold tracking-tight">Coders<span className="text-blue-400">Diary</span></span>
      </div>
      <p className="text-slate-500 text-sm">© 2025 CodersDiary. Built for Engineers by Engineers.</p>
    </div>
  </footer>
);

// --- Main App ---
const App = () => (
  <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
    <div className="fixed inset-0 bg-grid pointer-events-none z-0"></div>
    <div className="relative z-10">
      <Navbar />
      <Hero />
      <Features />
      <TechStack />
      <TargetAudience />
      <Mentorship />
      <LearningExperience />
      <CareerOutcomes />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  </div>
);

// --- Render ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<React.StrictMode><App /></React.StrictMode>);
}
