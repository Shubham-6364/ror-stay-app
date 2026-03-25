
import React from 'react';
import { Layers, Terminal, Github, Container, Server, Code, BarChart, Settings } from 'lucide-react';

const SkillItem = ({ name, icon: Icon, tags }: { name: string, icon: any, tags: string[] }) => (
  <div className="p-6 glass rounded-2xl border border-white/5 flex flex-col items-center text-center group transition-all hover:bg-slate-900">
    <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 transition-all">
      <Icon size={28} className="text-blue-400 group-hover:text-white" />
    </div>
    <h4 className="font-bold text-lg mb-2">{name}</h4>
    <div className="flex flex-wrap justify-center gap-2">
      {tags.map((tag, i) => (
        <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-800 rounded-full text-slate-400 font-medium">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const TechStack: React.FC = () => {
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
          <div className="flex space-x-2">
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 text-sm font-bold rounded-lg border border-blue-500/20">End-to-End</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            // Fix: Explicitly pass props to avoid TS error with spread and key prop
            <SkillItem 
              key={idx} 
              name={skill.name} 
              icon={skill.icon} 
              tags={skill.tags} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
