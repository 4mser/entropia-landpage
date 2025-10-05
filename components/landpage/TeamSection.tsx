import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { projects, team } from './utils/consts';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import use3DEffect from '@/hooks/use3DEffect';

gsap.registerPlugin(ScrollTrigger);

interface TeamSectionProps {
  windowWidth: number;
}

const TeamSection: React.FC<TeamSectionProps> = ({ windowWidth }) => {
  const teamRef = useRef<HTMLDivElement>(null);
  const gradientTeamRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const teamCardsRef = useRef<HTMLDivElement[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const adjustCardHeights = () => {
      if (cardsRef.current.length) {
        const maxHeight = Math.max(...cardsRef.current.map(card => card?.offsetHeight || 0));
        cardsRef.current.forEach(card => {
          if (card) card.style.height = `${maxHeight}px`;
        });
      }
      if (teamCardsRef.current.length) {
        const maxTeamHeight = Math.max(...teamCardsRef.current.map(card => card?.offsetHeight || 0));
        teamCardsRef.current.forEach(card => {
          if (card) card.style.height = `${maxTeamHeight}px`;
        });
      }
    };
    adjustCardHeights();
    window.addEventListener('resize', adjustCardHeights);
    return () => window.removeEventListener('resize', adjustCardHeights);
  }, [projects, team]);

  use3DEffect(cardsRef.current);
  use3DEffect(teamCardsRef.current);

  // Helper para recalcular altura al terminar de cargar imágenes
  const onImgLoaded = () => {
    window.dispatchEvent(new Event('resize'));
  };

  // ====== CLASE DE IMAGEN: en desktop -> B/N hasta hover; en mobile -> según activeIndex ======
  const imgClass = (index: number) => {
    const base =
      'h-full min-h-56 max-h-full flex-1 object-cover transition duration-500 ease-in-out will-change-[filter]';
    const isDesktop = windowWidth >= 1024;

    if (isDesktop) {
      // lg+: siempre en gris; se colorea al hover del card (.group)
      return `${base} lg:grayscale lg:group-hover:grayscale-0`;
    }
    // mobile/tablet: tu comportamiento original por slide activo
    return `${base} ${activeIndex === index ? 'grayscale-0' : 'grayscale'}`;
  };

  return (
    <section ref={teamRef} className="text-white relative">
      <h2 className="text-4xl md:text-5xl font-bold pl-4 animated-text md:pl-20">Nuestro Equipo</h2>
      <div
        ref={gradientTeamRef}
        className="gradiente-proyectos h-80 bg-gradient-to-b from-sky-600 via-cyan-500 to-emerald-400 opacity-30 rounded-full absolute w-full md:w-[50vw] blur-[120px] md:left-1/3"
        style={{ zIndex: -1 }}
      />
      <Swiper
        modules={[Pagination, Navigation, Mousewheel]}
        breakpoints={{
          320: { slidesPerView: 1.15, spaceBetween: 0 },
          800: { slidesPerView: 2.5, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30, centeredSlides: false },
          1300: { slidesPerView: 3.5, spaceBetween: 40, centeredSlides: false },
        }}
        pagination={false}
        navigation={false}
        mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        className="custom-swiper"
        onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
        style={{
          paddingLeft: windowWidth > 1024 ? '80px' : '0px',
          paddingRight: windowWidth > 1000 ? '80px' : '0px',
          paddingTop: '50px',
          paddingBottom: '50px',
        }}
      >
        {team.map((member, index) => {
          const hasImage = Boolean(member.image);

          return (
            <SwiperSlide key={index}>
              <div
                ref={el => { if (el) teamCardsRef.current[index] = el; }}
                className="card-member group mb-14 flex flex-col overflow-hidden border border-white/20 shadow-xl shadow-black backdrop-blur-md duration-300 p-4 md:p-7"
              >
                {index % 2 === 0 ? (
                  <>
                    {/* Texto */}
                    <div className="text-white mb-5">
                      <div className="flex items-center flex-wrap mb-2">
                        <h3 className="animated-text text-3xl font-semibold whitespace-nowrap mr-3">{member.name}</h3>
                        <p className="animated-text text-sm border border-white/40 w-fit px-2 rounded-md text-center">{member.role}</p>
                      </div>
                      <div className="transition-all duration-300 ease-in-out">
                        <p className="animated-text text-xs text-white/90">{member.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {member.skills?.map((skill, i) => (
                          <span key={i} className="text-white/80 text-[11px] px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">{skill}</span>
                        ))}
                      </div>
                    </div>

                    {/* Imagen */}
                    {hasImage && (
                      <Image
                        src={member.image}
                        width={800}
                        height={800}
                        alt={member.name}
                        onLoadingComplete={onImgLoaded}
                        className={imgClass(index)}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {/* Imagen primero */}
                    {hasImage && (
                      <Image
                        src={member.image}
                        width={800}
                        height={800}
                        alt={member.name}
                        onLoadingComplete={onImgLoaded}
                        className={`${imgClass(index)} mb-5`}
                      />
                    )}

                    {/* Texto */}
                    <div className="text-white">
                      <div className="flex items-center flex-wrap mb-2">
                        <h3 className="animated-text text-3xl font-semibold whitespace-nowrap mr-3">{member.name}</h3>
                        <p className="animated-text text-sm border border-white/40 w-fit px-2 rounded-md text-center">{member.role}</p>
                      </div>
                      <div className="transition-all duration-300 ease-in-out">
                        <p className="animated-text text-xs text-white/90">{member.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {member.skills?.map((skill, i) => (
                          <span key={i} className="text-white/80 text-[11px] px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default TeamSection;
