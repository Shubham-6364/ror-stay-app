
import React from 'react';
import { Terminal, Github, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Terminal size={24} className="text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">Coders<span className="text-blue-400">Diary</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Providing industry-ready DevOps training for students and professionals. Bridging the gap between knowledge and career.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 glass rounded-lg text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 glass rounded-lg text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 glass rounded-lg text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">DevOps Roadmap 2025</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Free Study Guides</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Blog & News</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Success Stories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">All Courses</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Mentorship</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-sm text-slate-400">
                <Mail size={16} className="text-blue-400" />
                <span>hello@codersdiary.dev</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-slate-400">
                <Phone size={16} className="text-blue-400" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-slate-400">
                <MapPin size={16} className="text-blue-400" />
                <span>Tech Hub, Cloud Street, SRE</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2025 CodersDiary. Built for Engineers by Engineers.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
