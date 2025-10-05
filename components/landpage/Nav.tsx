"use client";
import "@/app/globals.css";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MenuPc from "./MenuPc";
import MenuMov from "./MenuMov";

const Nav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // Nuevo estado para rastrear si hay scroll
  const prevScrollPos = useRef<number>(0);
  const scrollThreshold = 30; // La cantidad de scroll hacia arriba antes de que el nav reaparezca

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Si estamos en el top de la página, mostrar siempre el navbar
      if (currentScrollPos === 0) {
        setIsVisible(true);
        setIsScrolled(false); // Si está en el top, no hay scroll
      } else {
        setIsScrolled(true); // Si hay desplazamiento, activa el fondo
        if (prevScrollPos.current < currentScrollPos && currentScrollPos > 10) {
          // Scrolleando hacia abajo, ocultar el navbar si se ha superado el umbral de 50px
          setIsVisible(false);
        } else if (prevScrollPos.current - currentScrollPos > scrollThreshold) {
          // Scrolleando hacia arriba y superando el umbral de scroll hacia arriba
          setIsVisible(true);
        }
      }

      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full ${
        isScrolled ? "bg-gradient-to-b from-black to-transparent" : "bg-transparent"
      } px-4 py-4 flex flex-row justify-between items-center transition-transform duration-300 ease-in-out fixed z-50 lg:px-16 xl:px-56 xl:py-10 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-row items-center justify-between gap-3 lg:gap-5 xl:gap-36 w-full">
        <Link href="/">
          <Image
            src='/logo-entropia-white.png'
            width={120}
            height={80}
            alt="Logo" 
            className="pl-2 w-28 md:w-32"
          />
        </Link>

        <MenuPc toggleMenu={toggleMenu}></MenuPc>
      </div>
      <div className="flex flex-row absolute z-[120]  right-3 items-center gap-3 select-none">
        <button
          className={`flex w-7 h-5 p-0.5 rounded-md lg:hidden flex-col justify-between items-center `}
          onClick={toggleMenu}
        >
          <div
            className={`h-0.5 rounded-lg bg-slate-50 w-5 transition-transform transform ${
              menuOpen ? "rotate-45 translate-y-2 scale-125" : ""
            }`}
          />
          <div
            className={`h-0.5 rounded-lg bg-slate-50 w-5 transition-opacity ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`h-0.5 rounded-lg bg-slate-50 w-5 transition-transform transform ${
              menuOpen ? "-rotate-45 -translate-y-[6px] scale-125" : ""
            }`}
          />
        </button>
      </div>
      <MenuMov menuOpen={menuOpen} toggleMenu={toggleMenu}></MenuMov>
    </nav>
  );
};

export default Nav;
