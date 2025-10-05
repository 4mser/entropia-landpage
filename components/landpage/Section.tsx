// src/components/Section.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  bgColor = 'bg-dark-bg',
  textColor = 'text-white',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section id={id} className={`${bgColor} py-20 px-4`} ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-5xl font-bold mb-12 text-center ${textColor} drop-shadow-lg`}>
          {title}
        </h2>
        <div className="space-y-16">{children}</div>
      </div>
    </section>
  );
};

export default Section;
