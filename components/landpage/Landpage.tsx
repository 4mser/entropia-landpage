'use client';
import React, { useState } from 'react';
import ExplanatorySection from './ExplanatorySection';
import ProjectsSection from './ProjectsSection';
import TeamSection from './TeamSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Landpage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="text-white overflow-hidden">
      <ExplanatorySection />
      {/* <ServicesSection /> */}
      <ProjectsSection windowWidth={windowWidth} />
      <TeamSection windowWidth={windowWidth} />
      <ContactSection />
      {/* <RLab /> */}
      <Footer />
    </main>
  );
};

export default Landpage;