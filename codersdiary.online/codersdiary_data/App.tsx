
import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import TechStack from './components/TechStack.tsx';
import TargetAudience from './components/TargetAudience.tsx';
import LearningExperience from './components/LearningExperience.tsx';
import CareerOutcomes from './components/CareerOutcomes.tsx';
import Testimonials from './components/Testimonials.tsx';
import CTASection from './components/CTASection.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      <div className="fixed inset-0 bg-grid pointer-events-none z-0"></div>
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <TechStack />
          <TargetAudience />
          <LearningExperience />
          <CareerOutcomes />
          <Testimonials />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
