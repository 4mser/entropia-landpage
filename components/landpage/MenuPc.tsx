// components/landpage/MenuPc.tsx
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHover } from "@/app/contexts/HoverContext";
import Link from "next/link";

interface MenuPcProps {
  toggleMenu: () => void;
}

interface MenuItemProps {
  text: string;
  submenu: { title: string; href: string }[];
}

// Mapeo de iconos para los submenús
const submenuIcons: Record<string, string> = {
  "Quiénes Somos": "mdi:account-group",
  "Valores y Objetivos": "mdi:star",
  "Equipo": "mdi:account-multiple",
  "Neurabite": "mdi:brain",
  "N.I.N.A": "mdi:robot",
  "Xplorers": "mdi:rocket",
  "ARIA": "mdi:loyalty",
  "Desarrollo de Software": "mdi:code-json",
  "IA": "mdi:robot",
  "Análisis de Datos": "mdi:chart-bar",
  "Diseño UX/UI": "mdi:palette",
  "Integraciones": "mdi:connection",
  "Consultoría": "mdi:briefcase",
  "Mobile": "mdi:cellphone",
  "Eventos y Novedades": "mdi:calendar",
  "Blog": "mdi:newspaper",
  "Testimonios": "mdi:comment-quote",
  "Software": "mdi:application",
  "Neurociencia": "mdi:brain",
  "Nutrición": "mdi:food-apple"
};

const MenuItem: React.FC<MenuItemProps> = ({ text, submenu }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setHoverInfo } = useHover();

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverInfo(text);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoverInfo(null);
  };

  return (
    <li
      className="group relative flex items-center opacity-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
      <Icon icon="ep:arrow-up" rotate={2} className="ml-2 p-[2px] transition-transform group-hover:rotate-180" />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10, x: -20 }}
            animate={{ opacity: 1, y: 0, x: -20 }}
            exit={{ opacity: 0, y: -10, x: -20 }}
            className="absolute top-full pt-5"
          >
            <div 
              className="rounded-md p-[3px]" 
              style={{ 
                background: "var(--degree)", 
                animation: "gradient 7s ease infinite", 
                boxShadow: '-2px -3px 15px black' 
              }}
            >
              <ul className="flex flex-col w-fit whitespace-nowrap p-2 bg-[#010101] rounded-md text-stone-300">
                {submenu.map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{
                      x: 5,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <Link
                      href={item.href}
                      target="_blank"
                      className="lista-menu hover:text-stone-50 hover:cursor-pointer hover:bg-gradient-to-r from-zinc-950 to-transparent p-3 rounded-md flex items-center"
                    >
                      <Icon 
                        icon={submenuIcons[item.title] || "mdi:circle-small"} 
                        className="mr-2" 
                      />
                      {item.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const MenuPc: React.FC<MenuPcProps> = () => {
  const menuItems = [
    { 
      title: "Nosotros", 
      submenu: [
        { title: "Quiénes Somos", href: "/nosotros/quienes-somos" },
        { title: "Valores y Objetivos", href: "/nosotros/valores" },
        { title: "Equipo", href: "/nosotros/equipo" }
      ] 
    },
    { 
      title: "Proyectos", 
      submenu: [
        { title: "Neurabite", href: "/proyectos/neurabite" },
        { title: "N.I.N.A", href: "/proyectos/nina" },
        { title: "Xplorers", href: "/proyectos/xplorers" },
        { title: "ARIA", href: "/proyectos/aria" }
      ] 
    },
    { 
      title: "Soluciones y Servicios", 
      submenu: [
        { title: "Desarrollo de Software", href: "/servicios/desarrollo-software" },
        { title: "IA", href: "/servicios/ia" },
        { title: "Análisis de Datos", href: "/servicios/analisis-datos" },
        { title: "Diseño UX/UI", href: "/servicios/diseno-uxui" },
        { title: "Integraciones", href: "/servicios/integraciones" },
        { title: "Consultoría", href: "/servicios/consultoria" },
        { title: "Mobile", href: "/servicios/mobile" }
      ] 
    },
    { 
      title: "Recursos", 
      submenu: [
        { title: "Eventos y Novedades", href: "/recursos/eventos" },
        { title: "Blog", href: "/recursos/blog" },
        { title: "Testimonios", href: "/recursos/testimonios" }
      ] 
    },
    { 
      title: "Research Lab", 
      submenu: [
        { title: "Software", href: "/research/software" },
        { title: "Neurociencia", href: "/research/neurociencia" },
        { title: "Nutrición", href: "/research/nutricion" }
      ] 
    },
  ];

  return (
    <ul className="hidden lg:flex flex-row gap-5 text-sm font-normal">
      {menuItems.map((menuItem, index) => (
        <MenuItem key={index} text={menuItem.title} submenu={menuItem.submenu} />
      ))}
    </ul>
  );
};

export default MenuPc;