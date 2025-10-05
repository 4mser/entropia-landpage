"use client";
import { useEffect, useRef } from "react";

// Definir el tipo de las partículas
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

const Automata: React.FC = () => {
  // Definir el tipo de referencia de canvasRef
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles: Particle[] = [];

  // Función para dibujar una partícula
  const drawParticle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    size: number
  ) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
  };

  // Función para crear una partícula
  const createParticle = (x: number, y: number, color: string): Particle => {
    return { x, y, vx: 0, vy: 0, color };
  };

  // Función para generar un número aleatorio
  const random = (): number => {
    return Math.random() * window.innerWidth;
  };

  // Función para crear un grupo de partículas
  const createParticleGroup = (number: number, color: string): Particle[] => {
    return Array.from({ length: number }, () =>
      createParticle(random(), random(), color)
    );
  };

  // Aplicar fuerzas entre partículas
  const applyForces = (particles1: Particle[], particles2: Particle[], g: number) => {
    for (let i = 0; i < particles1.length; i++) {
      let fx = 0;
      let fy = 0;
      const a = particles1[i]; 

      for (let j = 0; j < particles2.length; j++) {
        const b = particles2[j]; 
        const dx = a.x - b.x; 
        const dy = a.y - b.y; 
        const d = Math.sqrt(dx * dx + dy * dy); 

        if (d > 0 && d < 20) {
          const F = (g * 1) / d;
          fx += F * dx;
          fy += F * dy;
        }
      }

      a.vx = (a.vx + fx) * 0.7;
      a.vy = (a.vy + fy) * 0.7;
      a.x += a.vx;

      if (a.x <= 0 || a.x >= window.innerWidth) {
        a.vx *= -1;
      }

      a.y += a.vy;

      if (a.y <= 0 || a.y >= 100) {
        // Limitar la altura a 100 px
        a.vy *= -1;
      }
    }
  };

  // Función para actualizar el canvas
  const updateCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Asegurar que el canvas esté disponible
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Asegurar que el contexto esté disponible

    // Ajustar el alto del canvas
    canvas.height = 300;

    // Aplicar las fuerzas
    applyForces(particles, particles, -0.032);
    applyForces(particles, particles, -0.17);
    applyForces(particles, particles, 0.04);
    applyForces(particles, particles, -0.1);
    applyForces(particles, particles, -0.34);
    applyForces(particles, particles, 0.15);
    applyForces(particles, particles, -0.2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawParticle(ctx, 0, 0, "#020202", canvas.width);

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      drawParticle(ctx, particle.x, particle.y, particle.color, 3);

      // Asegurar que las partículas se mantengan dentro del canvas
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    }

    requestAnimationFrame(updateCanvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Asegurar que el canvas esté disponible

    // Ajustar el ancho del canvas al contenedor padre
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = 100;

    const lilacParticles = createParticleGroup(70, "#3b3b3b");
    const blueParticles = createParticleGroup(70, "#34383a");
    const mintParticles = createParticleGroup(70, "#2b2b2b");

    particles.push(...lilacParticles, ...blueParticles, ...mintParticles);

    updateCanvas();

    // Manejar el redimensionamiento de la ventana
    const handleResize = () => {
      canvas.height = 100;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ createParticleGroup, updateCanvas, particles ]);

  return (
    <div className="w-full absolute -z-10 left-0  bottom-0  h-[80px]">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Automata;
