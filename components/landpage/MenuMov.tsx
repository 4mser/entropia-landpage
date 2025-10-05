'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { Icon } from '@iconify/react';

/* ===================== Iconos locales (sin pop-in) ===================== */
/* Subitems */
import accountGroup from '@iconify-icons/mdi/account-group';
import star from '@iconify-icons/mdi/star';
import accountMultiple from '@iconify-icons/mdi/account-multiple';
import brain from '@iconify-icons/mdi/brain';
import robot from '@iconify-icons/mdi/robot';
import rocket from '@iconify-icons/mdi/rocket';
import foodForkDrink from '@iconify-icons/mdi/food-fork-drink';
import codeJson from '@iconify-icons/mdi/code-json';
import chartBar from '@iconify-icons/mdi/chart-bar';
import palette from '@iconify-icons/mdi/palette';
import connection from '@iconify-icons/mdi/connection';
import briefcase from '@iconify-icons/mdi/briefcase';
import cellphone from '@iconify-icons/mdi/cellphone';
import calendar from '@iconify-icons/mdi/calendar';
import newspaper from '@iconify-icons/mdi/newspaper';
import commentQuote from '@iconify-icons/mdi/comment-quote';
import application from '@iconify-icons/mdi/application';
import foodApple from '@iconify-icons/mdi/food-apple';

/* Secciones / UI */
import handshakeOutline from '@iconify-icons/mdi/handshake-outline';
import rocketLaunchOutline from '@iconify-icons/mdi/rocket-launch-outline';
import toolboxOutline from '@iconify-icons/mdi/toolbox-outline';
import bookshelf from '@iconify-icons/mdi/bookshelf';
import flaskOutline from '@iconify-icons/mdi/flask-outline';
import magnify from '@iconify-icons/mdi/magnify';
import closeCircle from '@iconify-icons/mdi/close-circle';
import chevronRight from '@iconify-icons/mdi/chevron-right';
import chevronUp from '@iconify-icons/mdi/chevron-up';
import folderOutline from '@iconify-icons/mdi/folder-outline';
import circleSmall from '@iconify-icons/mdi/circle-small';
/* ====================================================================== */

interface MenuMovProps {
  menuOpen: boolean;
  toggleMenu: () => void;
}

type SubItem = { title: string; href: string };

type Section = {
  id: string;
  title: string;
  icon?: string; // Iconify name (mdi:*)
  submenu: SubItem[];
};

/* ————————————————————————————————————————————————————————————————
   ICON MAP: convierte 'mdi:*' en objeto de icono (sin fetch)
——————————————————————————————————————————————————————————————— */
const ICONS: Record<string, any> = {
  'mdi:account-group': accountGroup,
  'mdi:star': star,
  'mdi:account-multiple': accountMultiple,
  'mdi:brain': brain,
  'mdi:robot': robot,
  'mdi:rocket': rocket,
  'mdi:food-fork-drink': foodForkDrink,
  'mdi:code-json': codeJson,
  'mdi:chart-bar': chartBar,
  'mdi:palette': palette,
  'mdi:connection': connection,
  'mdi:briefcase': briefcase,
  'mdi:cellphone': cellphone,
  'mdi:calendar': calendar,
  'mdi:newspaper': newspaper,
  'mdi:comment-quote': commentQuote,
  'mdi:application': application,
  'mdi:food-apple': foodApple,

  'mdi:handshake-outline': handshakeOutline,
  'mdi:rocket-launch-outline': rocketLaunchOutline,
  'mdi:toolbox-outline': toolboxOutline,
  'mdi:bookshelf': bookshelf,
  'mdi:flask-outline': flaskOutline,
  'mdi:magnify': magnify,
  'mdi:close-circle': closeCircle,
  'mdi:chevron-right': chevronRight,
  'mdi:chevron-up': chevronUp,
  'mdi:folder-outline': folderOutline,
  'mdi:circle-small': circleSmall,
};

const getIcon = (name?: string) => (name && ICONS[name]) || circleSmall;

/* ————————————————————————————————————————————————————————————————
   ICONOS por defecto para subitems (extensible)
——————————————————————————————————————————————————————————————— */
const SUB_ICONS: Record<string, string> = {
  'Quiénes Somos': 'mdi:account-group',
  'Valores y Objetivos': 'mdi:star',
  'Equipo': 'mdi:account-multiple',
  'Neurabite': 'mdi:brain',
  'N.I.N.A': 'mdi:robot',
  'Xplorers': 'mdi:rocket',
  'ARIA': 'mdi:food-fork-drink',
  'Desarrollo de Software': 'mdi:code-json',
  'IA': 'mdi:robot',
  'Análisis de Datos': 'mdi:chart-bar',
  'Diseño UX/UI': 'mdi:palette',
  'Integraciones': 'mdi:connection',
  'Consultoría': 'mdi:briefcase',
  'Mobile': 'mdi:cellphone',
  'Eventos y Novedades': 'mdi:calendar',
  'Blog': 'mdi:newspaper',
  'Testimonios': 'mdi:comment-quote',
  'Software': 'mdi:application',
  'Neurociencia': 'mdi:brain',
  'Nutrición': 'mdi:food-apple',
};

/* ————————————————————————————————————————————————————————————————
   DATA
——————————————————————————————————————————————————————————————— */
const MENU_DATA: Section[] = [
  {
    id: 'nosotros',
    title: 'Nosotros',
    icon: 'mdi:handshake-outline',
    submenu: [
      { title: 'Quiénes Somos', href: '/nosotros/quienes-somos' },
      { title: 'Valores y Objetivos', href: '/nosotros/valores' },
      { title: 'Equipo', href: '/nosotros/equipo' },
    ],
  },
  {
    id: 'proyectos',
    title: 'Proyectos',
    icon: 'mdi:rocket-launch-outline',
    submenu: [
      { title: 'Neurabite', href: '/proyectos/neurabite' },
      { title: 'N.I.N.A', href: '/proyectos/nina' },
      { title: 'Xplorers', href: '/proyectos/xplorers' },
      { title: 'ARIA', href: '/proyectos/aria' },
    ],
  },
  {
    id: 'servicios',
    title: 'Soluciones y Servicios',
    icon: 'mdi:toolbox-outline',
    submenu: [
      { title: 'Desarrollo de Software', href: '/servicios/desarrollo-software' },
      { title: 'IA', href: '/servicios/ia' },
      { title: 'Análisis de Datos', href: '/servicios/analisis-datos' },
      { title: 'Diseño UX/UI', href: '/servicios/diseno-uxui' },
      { title: 'Integraciones', href: '/servicios/integraciones' },
      { title: 'Consultoría', href: '/servicios/consultoria' },
      { title: 'Mobile', href: '/servicios/mobile' },
    ],
  },
  {
    id: 'recursos',
    title: 'Recursos',
    icon: 'mdi:bookshelf',
    submenu: [
      { title: 'Eventos y Novedades', href: '/recursos/eventos' },
      { title: 'Blog', href: '/recursos/blog' },
      { title: 'Testimonios', href: '/recursos/testimonios' },
    ],
  },
  {
    id: 'lab',
    title: 'Research Lab',
    icon: 'mdi:flask-outline',
    submenu: [
      { title: 'Software', href: '/research/software' },
      { title: 'Neurociencia', href: '/research/neurociencia' },
      { title: 'Nutrición', href: '/research/nutricion' },
    ],
  },
];

/* ————————————————————————————————————————————————————————————————
   HELPERS
——————————————————————————————————————————————————————————————— */
function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = locked ? 'hidden' : prev || '';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [locked]);
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded px-0.5 py-0 text-cyan-200/95 bg-cyan-300/10 border border-cyan-400/25">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

/* ————————————————————————————————————————————————————————————————
   COMPONENTE PRINCIPAL (FULLSCREEN)
——————————————————————————————————————————————————————————————— */
const MenuMov: React.FC<MenuMovProps> = ({ menuOpen, toggleMenu }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useBodyScrollLock(menuOpen);

  // Accesibilidad: ESC y trap de foco
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleMenu();
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    queueMicrotask(() => closeBtnRef.current?.focus());
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, toggleMenu]);

  const sections = useMemo(() => MENU_DATA, []);

  const flatResults = useMemo(() => {
    if (!query.trim()) return [] as Array<{ parent: Section; item: SubItem }>;
    const q = query.toLowerCase();
    const out: Array<{ parent: Section; item: SubItem }> = [];
    for (const s of sections) {
      for (const it of s.submenu) {
        if (it.title.toLowerCase().includes(q)) out.push({ parent: s, item: it });
      }
    }
    return out;
  }, [query, sections]);

  /* ——— Animaciones ——— */
  const scrim: Variants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    show: {
      opacity: 1,
      backdropFilter: 'blur(16px)',
      transition: { duration: reduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: reduced ? 0 : 0.18 } },
  };

  // Panel desde la derecha
  const sheet: Variants = {
    hidden: { x: '100%', opacity: 1 },
    show: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', mass: 0.7, stiffness: 220, damping: 28 },
    },
    exit: { x: '100%', opacity: 1, transition: { duration: reduced ? 0 : 0.18 } },
  };

  const listParent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.035 } },
  };

  const listItem: Variants = {
    hidden: { y: 8, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: reduced ? 0 : 0.16 } },
  };

  const toggleSection = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleDragEnd = useCallback(
    (_: any, info: { offset: { y: number } }) => {
      if (info.offset.y > 60) toggleMenu();
    },
    [toggleMenu]
  );

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil"
          initial="hidden"
          animate="show"
          exit="exit"
          className="lg:hidden fixed inset-0 z-[110]"
        >
          {/* SCRIM + BLUR animado (suave) */}
          <motion.div
            variants={scrim}
            className="absolute inset-0 pointer-events-none bg-black/40"
            style={{ willChange: 'backdrop-filter, opacity' }}
          />

          {/* Panel FULLSCREEN */}
          <motion.aside
            ref={panelRef}
            variants={sheet}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.04}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 h-[100dvh] w-screen"
          >
            {/* Fondo y layout */}
            <div
              className="h-full w-full flex flex-col backdrop-blur-xl"
              style={{
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="shrink-0 z-10 flex items-center gap-3 px-4 py-5 border-b border-white/10 bg-gradient-to-br from-cyan-400/10 via-emerald-400/10 to-cyan-600/5">
                <div className="flex-1">
                  <p className="text-[11px] tracking-widest uppercase text-white/50">Navegación</p>
                  <h3 className="text-white font-semibold">Explora el sitio</h3>
                </div>
                {/* <button
                  ref={closeBtnRef}
                  onClick={toggleMenu}
                  aria-label="Cerrar menú"
                  className="p-2 rounded-xl border border-white/10 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                >
                  <Icon icon={getIcon('mdi:close')} className="w-6 h-6 text-white/90" />
                </button> */}
              </div>

              {/* Search */}
              <div className="px-4 pt-3 pb-2">
                <label htmlFor="menu-search" className="sr-only">
                  Buscar
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <Icon icon={magnify} className="w-5 h-5 text-white/70" />
                  <input
                    id="menu-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar secciones o páginas…"
                    className="w-full bg-transparent outline-none placeholder:text-white/40 text-white/90"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      aria-label="Limpiar búsqueda"
                      className="p-1 rounded-lg hover:bg-white/10"
                    >
                      <Icon icon={closeCircle} className="w-5 h-5 text-white/60" />
                    </button>
                  )}
                </div>
              </div>

              {/* Contenido scrollable */}
              <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-6">
                {query ? (
                  <motion.ul variants={listParent} initial="hidden" animate="show" className="px-2 pt-2 space-y-1">
                    {/* Resultados */}
                    {/* Si no hay resultados */}
                    {flatResults.length === 0 && (
                      <li className="text-white/60 text-sm px-2 py-4">Sin resultados para “{query}”.</li>
                    )}
                    {flatResults.map(({ parent, item }) => (
                      <motion.li key={`${parent.id}-${item.title}`} variants={listItem}>
                        <Link
                          href={item.href}
                          onClick={toggleMenu}
                          className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 hover:bg-white/[0.06]"
                        >
                          <span className="shrink-0 grid place-content-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 border border-cyan-300/20">
                            <Icon icon={getIcon(SUB_ICONS[item.title] || 'mdi:circle-small')} className="w-5 h-5 text-cyan-200" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-white truncate">
                              <Highlight text={item.title} query={query} />
                            </p>
                            <p className="text-xs text-white/50 truncate">
                              en <span className="text-white/70">{parent.title}</span>
                            </p>
                          </div>
                          <Icon icon={chevronRight} className="ml-auto w-5 h-5 text-white/60 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <motion.ul variants={listParent} initial="hidden" animate="show" className="px-2 pt-2 space-y-2">
                    {sections.map((sec) => (
                      <motion.li
                        key={sec.id}
                        variants={listItem}
                        className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
                      >
                        <button
                          onClick={() => toggleSection(sec.id)}
                          aria-expanded={openId === sec.id}
                          aria-controls={`section-${sec.id}`}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5"
                        >
                          <span className="shrink-0 grid place-content-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400/15 via-emerald-400/15 to-cyan-400/10 border border-cyan-300/20">
                            <Icon icon={getIcon(sec.icon || 'mdi:folder-outline')} className="w-5 h-5 text-white/80" />
                          </span>
                          <span className="flex-1 text-left text-white font-medium">{sec.title}</span>
                          <span className="text-[11px] text-white/50 mr-2">{sec.submenu.length}</span>
                          <Icon
                            icon={chevronUp}
                            className={`w-5 h-5 text-white/70 transition-transform ${openId === sec.id ? '' : 'rotate-180'}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {openId === sec.id && (
                            <motion.ul
                              id={`section-${sec.id}`}
                              key={`content-${sec.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: reduced ? 0 : 0.18 }}
                              className="px-2 pb-2 space-y-1"
                            >
                              {sec.submenu.map((it) => (
                                <li key={it.title}>
                                  <Link
                                    href={it.href}
                                    onClick={toggleMenu}
                                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5"
                                  >
                                    <span className="shrink-0 grid place-content-center w-8 h-8 rounded-md bg-white/[0.03] border border-white/10">
                                      <Icon icon={getIcon(SUB_ICONS[it.title] || 'mdi:circle-small')} className="w-5 h-5 text-emerald-200" />
                                    </span>
                                    <span className="text-white/90 group-hover:text-white">{it.title}</span>
                                    <Icon icon={chevronRight} className="ml-auto w-5 h-5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}

                {/* CTA / Footer del menú */}
                <div className="px-4 mt-4">
                  <Link
                    href="/contacto"
                    onClick={toggleMenu}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-cyan-600/10 px-4 py-3 text-cyan-200 hover:text-cyan-100 hover:from-cyan-500/15 hover:via-emerald-500/15 hover:to-cyan-600/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                  >
                    <Icon icon={commentQuote} className="w-5 h-5" />
                    <span className="font-medium">Conversemos sobre tu proyecto</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(MenuMov);
