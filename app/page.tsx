'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Importamos ScrollTrigger
import Nav from "../components/landpage/Nav";
import ThreeBg from "../components/landpage/ThreeBg";
import Desliza from "@/components/landpage/Desliza";
import Landpage from "@/components/landpage/Landpage";
import { HoverProvider } from "./contexts/HoverContext";
// import Link from "next/link";
// import { Icon } from "@iconify/react";

// Registramos ScrollTrigger con GSAP
gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null); // Referencia para la hero-section

  useEffect(() => {
    const tl = gsap.timeline();

    // Animar el título con una entrada suave desde abajo
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        }
      );
    }

    // Animar el párrafo justo después del título
    if (paragraphRef.current) {
      tl.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1" // Comienza antes de que termine la animación del título
      );
    }

    // Animar el botón de manera más suave y lineal
    if (buttonRef.current) {
      tl.fromTo(
        buttonRef.current,
        { opacity: 0},
        {
          opacity: 1,
          duration: 1.2,
        },
        "-=1" // Empieza junto con el párrafo
      );
    }

    // Usamos ScrollTrigger para animar el cambio de la malla en el heroSection
    if (heroSectionRef.current) {
      // Seleccionamos la malla que está en el layout
      gsap.fromTo(".grid-pattern", 
        { 
          backgroundSize: "0px 0px", // Tamaño inicial de la malla en el hero
          backgroundPosition: "center"  // Aseguramos que el fondo esté centrado
        }, 
        {
          backgroundSize: "100px 100px", // Tamaño final de la malla al salir del hero
          backgroundPosition: "center",  // Mantiene el fondo centrado mientras crece
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "bottom 80%", // Inicia la animación cuando se sale del hero-section
            end: "bottom top",   // Termina cuando el hero sale de la vista
            scrub: true, // Animación suave mientras se hace scroll
            toggleActions: "play reverse play reverse", // Reproduce y revierte al hacer scroll
          },
        }
      );
    }
  }, []);

  return (
   <HoverProvider>
     <div className="">
      <section ref={heroSectionRef} className="hero-section  relative overflow-hidden">
        <Nav />
        <div className="absolute left-1/2 -translate-x-1/2  top-52 xl:top-72 flex justify-center flex-col gap-3 items-center">
          
          <h1
            ref={titleRef}
            className="whitespace-nowrap text-center font-semibold text-[8vw] md:text-[6vw]  leading-none xl:text-6xl xl:leading-[4.5rem]"
          >
            Ciencia y tecnología <br className=" xl:block" /> a servicio de lo
            <br className=" xl:hidden" />
            <span className="bg-gradient-to-r xl:ml-3 font-bold from-[#10b981] via-[#06bfd4] to-[#268fc3] text-transparent bg-clip-text">
              extraordinario
            </span>
          </h1>
          <p
            ref={paragraphRef}
            className="text-center font-medium text-xs text-stone-50 opacity-80 xl:text-base"
          >
            Entropía es un proyecto de desarrollo e investigación científico-tecnológica.
          </p>
        </div>

        <Desliza />
      
        <ThreeBg />
      </section>
      <Landpage />
    </div>
   </HoverProvider>
  );
};

export default HomePage;
