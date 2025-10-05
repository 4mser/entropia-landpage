import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdOutlineMail } from "react-icons/md";

// Registrar plugins solo en cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Cta: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación para todos los elementos con clase animate
      (gsap.utils.toArray('.animate') as HTMLElement[]).forEach((el, index) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // Animación especial para el botón
      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current,
          { scale: 0.95 },
          {
            scale: 1,
            duration: 1.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: buttonRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative p-4 mb-40 md:p-20 xl:px-60 text-center overflow-hidden"
    >
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-500 rounded-full filter blur-[100px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500 rounded-full filter blur-[100px] animate-float-delay"></div>
      </div>

      <div className="relative p-8 rounded-2xl backdrop-blur-lg border border-white/20 shadow-2xl shadow-black/30">
        <div className="py-16 md:py-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white animate">
            ¿Quieres llevar tu proyecto al{' '}
            <span className="bg-gradient-to-r from-[#10b981] via-[#16c7da] to-[#31a9e4] bg-clip-text text-transparent animate-underline">
              siguiente nivel
            </span>? 🚀
          </h2>
          
          <p className="mb-10 text-gray-300/90 max-w-2xl mx-auto text-lg animate">
            Descubre cómo podemos ayudarte a lograrlo.
          </p>
          
          {/* Botón mejorado con más interactividad */}
          <div className="flex justify-center w-full animate">
            <a
              ref={buttonRef}
              href="mailto:contacto@entropiatech.cl?subject=ENTROPIA%20TECHNOLOGIES"
              className="relative rounded-full w-full max-w-xs overflow-hidden p-px group hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-shadow duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#10b981] via-[#06bfd4] to-[#268fc3] group-hover:opacity-90 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center justify-center bg-black/60 group-hover:bg-black/40 transition-all duration-300 rounded-full py-3 px-6 text-white font-medium">
                <span className="relative z-10 flex items-center text-md">
                  Contáctanos
                  <MdOutlineMail className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" size={20} />
                </span>
              </div>
              
              {/* Efecto de brillo al hacer hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-1/2 w-1/2 h-full bg-white/10 filter blur-md transform -translate-x-1/2"></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;