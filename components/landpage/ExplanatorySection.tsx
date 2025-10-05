import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

const SinWave = dynamic(() => import('@/components/SinWave'), { ssr: false });


gsap.registerPlugin(ScrollTrigger);

const ExplanatorySection: React.FC = () => {
  const explSectionRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (explSectionRef.current && gradientRef.current) {
      gsap.fromTo(
        explSectionRef.current.querySelectorAll('h2, p'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: explSectionRef.current,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        gradientRef.current,
        { x: 200, opacity: 0, y: 200 },
        {
          x: 20,
          y: 0,
          opacity: 0.3,
          scrollTrigger: {
            trigger: explSectionRef.current,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 2,
          },
        }
      );
    }
  }, []);

  return (
    <section ref={explSectionRef} className="relative w-full md:h-[80dvh] pb-96 md:py-48 text-white">
      <div className="flex flex-col gap-0 px-4 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold ">
              Soluciones que evolucionan al ritmo de los{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-sky-600 text-transparent bg-clip-text" style={{ textShadow: '0px 0px 20px rgba(52, 211, 153, 0.2)' }}>
                desafíos
              </span>
            </h2>
            <p className="text-md font-normal text-neutral-100 md:text-lg mt-2 mb-6">
              Nuestro trabajo se centra en el desarrollo de herramientas tecnológicas avanzadas, respaldadas por investigación científica rigurosa. Combinamos inteligencia artificial, software especializado y métodos científicos para crear soluciones que abordan desafíos complejos con un enfoque innovador y práctico.
            </p>
            <div ref={gradientRef} className="w-full md:w-80 gradient-ref h-80 bg-gradient-to-b from-sky-600 via-cyan-500 to-emerald-400 rounded-full -z-[2] absolute left-44 top-32 blur-[120px]"></div>
          </div>
        </div>
        <SinWave explSectionRef={explSectionRef} />
      </div>
    </section>
  );
};

export default ExplanatorySection;