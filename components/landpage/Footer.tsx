import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | HTMLDivElement)[]>([]);
  const columnsRef = useRef<HTMLDivElement[]>([]);

  const addToRefs = (el: HTMLAnchorElement | HTMLDivElement | null) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  const addColumnToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      columnsRef.current[index] = el;
    }
  };

  useEffect(() => {
    const hoverHandlers = new WeakMap();

    const ctx = gsap.context(() => {
      // Animación de entrada del footer
      gsap.from(footerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse',
        },
      });

      // Animación de entrada de las columnas
      columnsRef.current.forEach((column, i) => {
        gsap.from(column, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'back.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Animaciones hover para enlaces
      linksRef.current.forEach((link) => {
        const enterHandler = () => {
          gsap.to(link, {
            scale: 1.05,
            color: '#ffffff',
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const leaveHandler = () => {
          gsap.to(link, {
            scale: 1,
            color: '#a0aec0',
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        link.addEventListener('mouseenter', enterHandler);
        link.addEventListener('mouseleave', leaveHandler);

        hoverHandlers.set(link, { enter: enterHandler, leave: leaveHandler });
      });
    }, footerRef);

    return () => {
      const links = linksRef.current;
      links.forEach((link) => {
        const handlers = hoverHandlers.get(link);
        if (handlers) {
          link.removeEventListener('mouseenter', handlers.enter);
          link.removeEventListener('mouseleave', handlers.leave);
        }
      });
      ctx.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative backdrop-blur-md pt-16 pb-12 text-gray-300 overflow-hidden border-t border-white/10"
    >
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:60px_60px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Columna 1: Logo y descripción */}
          <div 
            ref={(el) => addColumnToRefs(el, 0)}
            className="flex flex-col items-start"
          >
            <div className="flex items-center mb-6">
              <Image
                src="/logo-entropia-white.png"
                width={120}
                height={60}
                alt="ARIA Logo"
                className="mr-4 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-sm mb-6">
            Estructuramos el desorden. Diseñamos el futuro.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://twitter.com" 
                target="_blank"
                ref={addToRefs}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon icon="mdi:twitter" className="w-5 h-5" />
              </Link>
              <Link 
                href="https://instagram.com/entropiacl" 
                target="_blank"
                ref={addToRefs}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon icon="mdi:instagram" className="w-5 h-5" />
              </Link>
              <Link 
                href="https://linkedin.com" 
                target="_blank"
                ref={addToRefs}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon icon="mdi:linkedin" className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div 
            ref={(el) => addColumnToRefs(el, 1)}
            className="flex flex-col"
          >
            <h3 className="text-white font-semibold text-lg mb-6">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  ref={addToRefs}
                  className="text-sm hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
            
             
              <li>
                <Link 
                  href="/contact" 
                  ref={addToRefs}
                  className="text-sm hover:text-white transition-colors"
                >
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link 
                  href="/demo" 
                  ref={addToRefs}
                  className="text-sm hover:text-white transition-colors"
                >
                  Trabaja con nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div 
            ref={(el) => addColumnToRefs(el, 2)}
            className="flex flex-col"
          >
            <h3 className="text-white font-semibold text-lg mb-6">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icon icon="mdi:email-outline" className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">contacto@entropiatech.cl</span>
              </li>
              <li className="flex items-start">
                <Icon icon="mdi:phone-outline" className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">+56 9 37287950</span>
              </li>
              <li className="flex items-start">
                <Icon icon="mdi:map-marker-outline" className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Valdivia y Santiago, Chile</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal + Newsletter */}
          {/* <div 
            ref={(el) => addColumnToRefs(el, 3)}
            className="flex flex-col"
          >
            <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-3 mb-8">
              <li>
                <Link 
                  href="/privacy" 
                  ref={addToRefs}
                  className="text-sm hover:text-white transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  ref={addToRefs}
                  className="text-sm hover:text-white transition-colors"
                >
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookies" 
                  ref={addToRefs}
                  className="text-sm hover:text-white transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>

            <div>
              <h3 className="text-white font-semibold text-lg mb-3">Mantengámonos en contacto</h3>
              <p className="text-sm mb-4">
                Suscríbete para recibir actualizaciones y novedades.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="bg-transparent border-t border-b border-l border-white/20 text-white text-sm px-4 py-2 rounded-l-md focus:outline-none  w-full"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-r-md hover:opacity-90 transition-opacity text-sm font-medium"
                >
                  <Icon icon="mdi:send" className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div> */}
        </div>

        {/* Sección inferior */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            {/* <Link href="https://www.entropiatech.cl" target="_blank" className="flex items-center">
              <span className="text-xs mr-3">Un producto de:</span>
              <Image
                src="/logo-entropia-white.png"
                width={100}
                height={40}
                alt="Entropía Tech"
                className="hover:scale-105 transition-all animate-hue-rotate duration-300"
              />
            </Link> */}
          </div>
          
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} ENTROPIA TECHNOLOGIES SPA.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;