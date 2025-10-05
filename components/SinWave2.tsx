'use client'

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import p5 from 'p5';

gsap.registerPlugin(ScrollTrigger);

const SinWave2: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  // Estados de control de rotación, zoom y visibilidad de controles
  const [rotateEnabled, setRotateEnabled] = useState(true); // Rotación automática
  const [dragRotateEnabled, setDragRotateEnabled] = useState(true); // Rotación touch
  const [elementsVisible, setElementsVisible] = useState(false); // Visibilidad de controles de sliders
  const [textColor, setTextColor] = useState({ r: 255, g: 255, b: 255 }); // Color sincronizado para el texto

  // Estados individuales para cada slider
  const [step, setStep] = useState(100);
  const [step2, setStep2] = useState(70);
  const [step3, setStep3] = useState(35);
  const [step4, setStep4] = useState(50);
  const [step5, setStep5] = useState(2);
  const [step6, setStep6] = useState(10);
  const [step7, setStep7] = useState(0);
  const [step8, setStep8] = useState(10);
  const [tamaño, setTamaño] = useState(2);

  // useRef para almacenar una copia de los valores de configuración para evitar parpadeos
  const config = useRef({
    step: 100,
    step2: 70,
    step3: 35,
    step4: 50,
    step5: 2,
    step6: 10,
    step7: 0,
    step8: 10,
    tamaño: 3,
  });

  // Sincronización de valores del estado a config.current (sin parpadeos)
  useEffect(() => {
    config.current = {
      step,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
      tamaño,
    };
  }, [step, step2, step3, step4, step5, step6, step7, step8, tamaño]);

  // useEffect para inicializar el sketch de p5.js
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL).parent(sketchRef.current!);
        p.angleMode(p.DEGREES);
      };

      p.draw = () => {
        p.clear();
        p.noFill();

        const { step, step2, step3, step4, step5, step6, step7, step8, tamaño } = config.current;

        // Aplicación de la rotación en el sketch
        if (rotateEnabled || dragRotateEnabled) {
          if (dragRotateEnabled) {
            const dx = p.map(p.mouseX, 0, p.width, -180, 200);
            const dy = p.map(p.mouseY, 0, p.height, -180, 180);
            p.rotateY(dx);
            p.rotateX(dy);
          } else {
            p.rotateX(p.frameCount / 10);
            p.rotateY(p.frameCount / 10);
          }
        }

        // Generación de color del objeto p5
        for (let i = step8; i < step2; i++) {
          const r = p.map(p.sin(p.frameCount / 10), -1, 1, 100, 250);
          const g = p.map(i, 10, 50, 100, step7);
          const b = p.map(p.cos(p.frameCount), -1, 1, 200, step7);

          // Actualización del color del texto en cada fotograma
          setTextColor({ r, g, b });

          p.stroke(r, g, b);
          p.rotate(p.frameCount / step3);

          p.beginShape();
          for (let j = 0; j < 360; j += step) {
            const rad = i * tamaño;
            const x = rad * p.cos(j);
            const y = rad * p.sin(j);
            const z = p.sin(p.frameCount * step5 + i * step6) * step4;

            p.vertex(x * 1, y * 1, z * 1);
          }
          p.endShape(p.CLOSE);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    const myP5 = new p5(sketch);
    return () => myP5.remove();
  }, [rotateEnabled, dragRotateEnabled]);

  // useEffect para evitar el desplazamiento de la pantalla al interactuar con el lienzo en dispositivos móviles
  useEffect(() => {
    const preventTouchMove = (event: TouchEvent) => {
      if (sketchRef.current && sketchRef.current.contains(event.target as Node)) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventTouchMove);
    };
  }, []);

  // Alterna la visibilidad de los controles
  const toggleVisibility = () => setElementsVisible(!elementsVisible);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className='w-full h-[100dvh] overflow-hidden'>
      {/* Contenedor para el lienzo de p5.js */}
      <div ref={sketchRef} className="w-full h-[100dvh] -translate-y-12 overflow-hidden" />

      <Link href="/" className='fixed top-5 left-3 md:left-8'>
        <Image
          src='/ENTROPIA.png'
          width={200}
          height={80}
          alt="Logo"
          className='w-40 md:w-52'
        />
      </Link>
      {/* Botón para mostrar/ocultar los controles de sliders */}
      <button
        onClick={toggleVisibility}
        className="fixed top-4 right-3 md:right-8 p-2 w-10 h-10 md:w-12 md:h-12 transition opacity-80 hover:opacity-100"
      >
        <Image src="gear.svg" width={40} height={40} alt="gear" className='' />
      </button>

      {/* Controles de sliders, visibles solo cuando `elementsVisible` es true */}
      {elementsVisible && (
        <div className="fixed p-4 md:p-0 z-30 backdrop-blur-md md:backdrop-blur-none left-0 md:left-auto rounded-t-3xl  border-t border-white/10 md:border-white/0 md:right-8 bottom-0 md:top-20 space-y-2 w-full md:w-fit md:space-y-4 text-white text-xs md:text-sm">
          <div className="flex items-center">
            <label className="mr-2">Vertices</label>
            <input
              type="range"
              min="10"
              max="400"
              value={step}
              onChange={(e) => setStep(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Anillos</label>
            <input
              type="range"
              min="1"
              max="100"
              value={step2}
              onChange={(e) => setStep2(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Velocidad Rotación</label>
            <input
              type="range"
              min="1"
              max="50"
              value={step3}
              onChange={(e) => setStep3(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Altura</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={step4}
              onChange={(e) => setStep4(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Velocidad Eje Y</label>
            <input
              type="range"
              min="0"
              max="5"
              value={step5}
              onChange={(e) => setStep5(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Amplitud</label>
            <input
              type="range"
              min="0"
              max="200"
              value={step6}
              onChange={(e) => setStep6(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Color</label>
            <input
              type="range"
              min="1"
              max="250"
              value={step7}
              onChange={(e) => setStep7(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Iteraciones Negativas</label>
            <input
              type="range"
              min="-100"
              max="0"
              value={step8}
              onChange={(e) => setStep8(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Tamaño</label>
            <input
              type="range"
              min="1"
              max="10"
              value={tamaño}
              onChange={(e) => setTamaño(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <button
            onClick={() => setRotateEnabled(!rotateEnabled)}
            className="w-full py-2 mt-2  rounded-md hover:bg-gray-900 border border-white/20 backdrop-blur-md transition"
          >
            {rotateEnabled ? 'Desactivar Rotación Automática' : 'Activar Rotación Automática'}
          </button>
          <button
            onClick={() => setDragRotateEnabled(!dragRotateEnabled)}
            className="w-full py-2 mt-2  rounded-md hover:bg-gray-900 border border-white/20 backdrop-blur-md transition"
          >
            {dragRotateEnabled ? 'Desactivar Rotación Touch' : 'Activar Rotación Touch'}
          </button>
        </div>
      )}

      {/* Texto 404 con gradiente dinámico sincronizado */}
      <h1
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center p-20 text-4xl md:text-6xl font-semibold text-transparent"
        style={{
          textShadow: `0px 0px 1px rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, 0.8), 0px 0px 30px rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, 0.5)`,
        }}
      >
        OOPS!
      </h1>
      <p className='absolute bottom-0 left-1/2 -translate-x-1/2 text-center p-12 text-nowrap'>404 - Page Not Found</p>
    </div>
  );
};

export default SinWave2;
