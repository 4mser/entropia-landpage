'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InteractiveSection: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      // Animación de entrada
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
        }
      );

      // Interacción con el cursor para simular 3D y gradiente
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / 20; // Efecto 3D menos marcado
        const deltaY = (y - centerY) / 20; // Efecto 3D menos marcado

        gsap.to(card, {
          rotationY: deltaX,
          rotationX: -deltaY,
          scale: 1.03, // Ligero escalado
          boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)', // Box shadow en hover
          transformPerspective: 800,
          background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 10, 240, 0.2), transparent 70%)`, // Gradiente que sigue al cursor
          duration: 0.3,
        });
      });

      // Restablecer cuando el cursor salga de la tarjeta
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          boxShadow: 'none', // Eliminar el box shadow al salir
          background: `radial-gradient(circle at 50% 50%, rgba(255, 10, 240, 0.2), transparent 70%)`, // Restablecer gradiente al centro
          duration: 0.5,
        });
      });
    });
  }, []);

  const projects = [
    {
      title: 'Neurabite',
      description:
        'Mejorando el estado de ánimo y la cognición mediante repostería innovadora.',
      image: '/assets/neurabite.jpg',
    },
    {
      title: 'N.I.N.A',
      description:
        'Algoritmo nutricional inteligente para optimizar la salud mental y cognitiva.',
      image: '/assets/nina.jpg',
    },
    {
      title: 'Xplorers',
      description:
        'Plataforma de exploración interactiva que gamifica la exploración de ciudades, naturaleza y biodiversidad.',
      image: '/assets/xplorers.jpg',
    },
    {
      title: 'Deep Eye',
      description:
        'Herramienta para conectar a personas con expertos en salud mental, con análisis personalizado y diagnóstico digital.',
      image: '/assets/deep-eye.jpg',
    },
    {
      title: 'ARIA',
      description:
        'Software avanzado para la gestión inteligente de restaurantes, bares y cafeterías. Optimiza operaciones con IA.',
      image: '/assets/aria.jpg',
    }
  ];
  

  return (
    <section className="relative min-h-screen bg-neutral-950 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-12 py-20">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="relative bg-gray-800 rounded-2xl overflow-hidden"
            style={{
              '--x': '50%',
              '--y': '50%',
              background: `radial-gradient(circle at var(--x) var(--y), rgba(255, 10, 240, 0.2), transparent 70%)`,
            } as React.CSSProperties}
          >
            <div
              className="h-72 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="p-5 text-white">
              <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InteractiveSection;
