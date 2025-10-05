'use client'
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SinWaveProps {
  explSectionRef: React.RefObject<HTMLElement>;
}

const SinWave: React.FC<SinWaveProps> = ({ explSectionRef }) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef(200);
  const opacityRef = useRef(0);
  const stepTamañoRef = useRef(4);
  const rotationRef = useRef(0); // Nueva referencia para la rotación

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const sketch = (p: p5) => {
      const rotateEnabled = true;
      let dragRotateEnabled = window.innerWidth >= 768;
      const zoom = 1;

      const colors = [
        p.color(255, 255, 255)
      ];

      let colorIndex = 0;
      let colorTransition = 0;

      const updateStepTamaño = () => {
        stepTamañoRef.current = window.innerWidth >= 768 ? 4 : 2;
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL).parent(sketchRef.current!);
        p.angleMode(p.DEGREES);
        updateStepTamaño();
      };

      p.draw = () => {
        p.clear();
        p.noFill();
        p.strokeWeight(opacityRef.current);

        if (rotateEnabled || dragRotateEnabled) {
          if (dragRotateEnabled) {
            const dx = p.map(p.mouseX, 0, p.width, -180, 200);
            const dy = p.map(p.mouseY, 0, p.height, -180, 180);
            p.rotateY(dx);
            p.rotateX(dy);
          } else {
            p.rotateX(p.frameCount / 10);
            p.rotateY(rotationRef.current); // Usar rotationRef para la rotación en Y
          }
        }

        const nextColorIndex = (colorIndex + 1) % colors.length;
        const currentColor = p.lerpColor(colors[colorIndex], colors[nextColorIndex], colorTransition);
        p.stroke(currentColor);

        colorTransition += 0.01;
        if (colorTransition >= 1) {
          colorTransition = 0;
          colorIndex = nextColorIndex;
        }

        const step = step1Ref.current; // Vertices
        const step2 = 70; // Anillos
        const step3 = 35; // Velocidad Rotación
        const step4 = 50; // Altura
        const step5 = 2; // Velocidad Eje Y
        const step6 = 10; // Amplitud

        for (let i = 0; i < step2; i++) {
          p.rotate(p.frameCount / step3);

          p.beginShape();
          for (let j = 0; j < 360; j += step) {
            const rad = i * stepTamañoRef.current;
            const x = rad * p.cos(j);
            const y = rad * p.sin(j);
            const z = p.sin(p.frameCount * step5 + i * step6) * step4;
            p.vertex(x * zoom, y * zoom, z * zoom);
          }
          p.endShape(p.CLOSE);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        updateStepTamaño();
        dragRotateEnabled = window.innerWidth >= 768;
      };
    };

    const myP5 = new p5(sketch);
    return () => myP5.remove();
  }, []);

  useEffect(() => {
    if (explSectionRef.current && typeof window !== 'undefined') {
      const startTrigger = window.innerWidth >= 768 ? 'top 60%' : 'top 15%';
      const endTrigger = window.innerWidth >= 768 ? 'bottom 50%' : 'bottom 20%';

      gsap.to(step1Ref, {
        current: 10,
        scrollTrigger: {
          trigger: explSectionRef.current,
          start: startTrigger,
          end: endTrigger,
          scrub: 1,
        },
      });

      gsap.to(opacityRef, {
        current: 1,
        scrollTrigger: {
          trigger: explSectionRef.current,
          start: startTrigger,
          end: endTrigger,
          scrub: 1,
        },
      });

      // Configurar ScrollTrigger para la rotación
      gsap.to(rotationRef, {
        current: 360, // Rotación completa de 360 grados
        scrollTrigger: {
          trigger: explSectionRef.current,
          start: startTrigger,
          end: endTrigger,
          scrub: 1,
        },
      });
    }
  }, [explSectionRef]);

  if (typeof window === 'undefined') {
    return null;
  }

  return <div ref={sketchRef} className="h-[20rem]  flex justify-center items-center absolute md:h-[100dvh] opacity-40 md:opacity-50 md:translate-x-96 md:-translate-y-40 right-0 bottom-0 md:top-0" />;
};

export default SinWave;