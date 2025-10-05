import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { projects } from './utils/consts';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import use3DEffect from '@/hooks/use3DEffect';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  windowWidth: number;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ windowWidth }) => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const gradientRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustCardHeights = () => {
      if (cardsRef.current.length) {
        const maxHeight = Math.max(...cardsRef.current.map((card) => card?.offsetHeight || 0));
        cardsRef.current.forEach((card) => {
          if (card) {
            card.style.height = `${maxHeight}px`;
          }
        });
      }
    };

    adjustCardHeights();
    window.addEventListener('resize', adjustCardHeights);
    return () => window.removeEventListener('resize', adjustCardHeights);
  }, []);

  use3DEffect(cardsRef.current);

  return (
    <section id="proyectos" className="relative py-56">
      <h2 className="text-4xl md:text-5xl font-bold  pl-4 animated-text md:pl-20 md:mb-5">Nuestros Proyectos</h2>
      <div ref={gradientRef2} className="gradiente-proyectos h-80 bg-gradient-to-b from-sky-600 via-cyan-500 to-emerald-400 opacity-30 rounded-full absolute w-full md:w-[50vw] blur-[120px] md:left-1/3" style={{ zIndex: -1 }} />
      <Swiper
        modules={[Pagination, Navigation, Mousewheel]}
        breakpoints={{
          320: { slidesPerView: 1.3, spaceBetween: 20, centeredSlides: true },
          800: { slidesPerView: 2.5, spaceBetween: 30, centeredSlides: true },
          1024: { slidesPerView: 3, spaceBetween: 30, centeredSlides: false },
          1300: { slidesPerView: 4.2, spaceBetween: 40, centeredSlides: false },
        }}
        pagination={{ clickable: true }}
        navigation={false}
        mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        className="custom-swiper"
        style={{
          paddingLeft: windowWidth > 1024 ? '80px' : '0px',
          paddingRight: windowWidth > 1000 ? '80px' : '0px',
          paddingTop: '30px',
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <Link target='_blank' href={project.phase === 'concepto' ? '#' : `${project.link}`}>
              <div
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`relative card-project group mb-14 flex flex-col justify-between rounded-lg overflow-hidden border border-white/10 shadow-xl shadow-black backdrop-blur-md duration-300 p-6 ${project.phase === 'concepto' ? 'opacity-80 cursor-not-allowed filter grayscale' : ''
                  }`}
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              >
                {project.phase === 'concepto' && (
                  <div className="absolute top-9 right-9 bg-red-700 text-white text-xs px-2 py-1 rounded-full flex items-center gap-2 shadow-xl font-medium">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    Próximamente
                  </div>
                )}
                <div className="rounded-md overflow-hidden">
                  <Image src={`${project.image}`} width={800} height={800} alt="project" />
                </div>
                <div className="mt-4 text-white flex-grow">
                  <h3 className="animated-text mb-2 text-xl font-semibold">{project.title}</h3>
                  <p className="animated-text text-sm">{project.description}</p>
                  <p className={`link-underline text-blue-400 mt-4 block ${project.phase === 'concepto' ? 'pointer-events-none' : ''}`}>Ver proyecto →</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx>{`
        .link-underline {
          position: relative;
          display: inline-block;
        }
        .link-underline::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          background-color: currentColor;
          width: 0;
          transition: width 0.3s ease-in-out;
        }
        .card-project:hover .link-underline::after {
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;