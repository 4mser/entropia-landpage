import React, { useRef, useEffect, useState } from 'react';
import { FiCode, FiSmartphone, FiLayers, FiUsers, FiCpu, FiShare2, FiBarChart2 } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import use3DEffect from '@/hooks/use3DEffect';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const services = [
    {
      title: 'Desarrollo de Software',
      icon: <FiCode className="text-2xl" />,
      description: 'Soluciones tecnológicas a medida para necesidades empresariales complejas.',
      items: ['Web Apps', 'Mobile Apps', 'PWAs', 'Multiplataforma'],
      color: 'from-cyan-500 to-violet-600',
    },
    {
      title: 'Inteligencia Artificial',
      icon: <FiCpu className="text-2xl" />,
      description: 'Soluciones de IA avanzada para transformar tu negocio.',
      items: ['Redes Neuronales Especializadas', 'Computer Vision', 'Procesamiento de Lenguaje Natural', 'Modelos Predictivos'],
      color: 'from-fuchsia-500 to-purple-600',
    },
    {
      title: 'Análisis de Datos',
      icon: <FiBarChart2 className="text-2xl" />,
      description: 'Extracción de insights valiosos de tus datos.',
      items: ['Big Data', 'Business Intelligence', 'Dashboards', 'ETL'],
      color: 'from-cyan-500 to-emerald-600',
    },
    {
      title: 'Diseño UX/UI',
      icon: <FiLayers className="text-2xl" />,
      description: 'Experiencias de usuario intuitivas y memorables.',
      items: ['User Research', 'Prototipado', 'Design Systems', 'Testing'],
      color: 'from-purple-500 to-fuchsia-600',
    },
    {
      title: 'Integraciones Avanzadas',
      icon: <FiShare2 className="text-2xl" />,
      description: 'Conexión perfecta entre todos tus sistemas y APIs.',
      items: ['APIs REST/GraphQL', 'Webhooks', 'Web Services', 'Data Pipelines'],
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Consultoría Tech',
      icon: <FiUsers className="text-2xl" />,
      description: 'Transformación digital con estrategias personalizadas.',
      items: ['Arquitectura', 'Estrategia', 'Automatización', 'Evaluación'],
      color: 'from-emerald-500 to-teal-600',
    },
    {
      title: 'Mobile Solutions',
      icon: <FiSmartphone className="text-2xl" />,
      description: 'Aplicaciones móviles de alto rendimiento.',
      items: ['iOS/Android', 'Apps Híbridas', 'Optimización', 'Hardware'],
      color: 'from-rose-500 to-pink-600',
    },
  ];

  /* -----------------------------   Effects   ----------------------------- */
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const adjustCardHeights = () => {
      if (cardsRef.current.length) {
        const validCards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        const heights = validCards.map((card) => card.offsetHeight);
        const maxHeight = Math.max(...heights);
        validCards.forEach((card) => {
          card.style.height = `${maxHeight}px`;
        });
      }
    };
    adjustCardHeights();
    window.addEventListener('resize', adjustCardHeights);
    return () => window.removeEventListener('resize', adjustCardHeights);
  }, []);

  use3DEffect(cardsRef.current);

  /* -----------------------------   Render   ----------------------------- */
  return (
    <section id="servicios" className="relative py-56">
      <h2 className="text-4xl md:text-5xl font-bold pl-4 animated-text md:pl-20 md:mb-5">Nuestros Servicios</h2>
      <div
        ref={gradientRef}
        className="gradiente-servicios h-80 bg-gradient-to-b from-emerald-600 via-teal-600 to-cyan-400 opacity-30 rounded-full absolute w-full md:w-[50vw] blur-[120px] md:left-1/3"
        style={{ zIndex: -1 }}
      />

      <Swiper
        modules={[Pagination, Navigation, Mousewheel]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20, centeredSlides: false },
          1024: { slidesPerView: 3, spaceBetween: 30, centeredSlides: false },
          1300: { slidesPerView: 4.2, spaceBetween: 40, centeredSlides: false },
        }}
        pagination={{ clickable: true }}
        navigation={false}
        mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        className="custom-swiper"
        style={{
          paddingLeft: isMobile ? '20px' : '80px',
          paddingRight: isMobile ? '20px' : '80px',
          paddingTop: '30px',
        }}
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div
              ref={(el) => {
                if (el) cardsRef.current[index] = el; // **sin valor de retorno para evitar el error de tipo**
              }}
              className="relative card-service group mb-14 flex flex-col rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-black backdrop-blur-md duration-300 p-6"
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
              {/* Sutil gradiente de fondo */}
              <div className={`absolute inset-0 bg-gradient-to-br  opacity-5 -z-10 rounded-lg`} />

              {/* Ícono gigante decorativo en BOTTOM‑RIGHT y que sube en hover */}
              <div className="absolute bottom-4 right-4 pointer-events-none transform-gpu translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:opacity-10">
                {React.cloneElement(service.icon, {
                  className: 'text-[7rem] md:text-[8rem] opacity-100',
                })}
              </div>

              {/* Header con ícono pequeño (front) y título */}
              <div className="flex items-start mb-6 relative z-10">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color} mr-4`}>{service.icon}</div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>

              {/* Contenido */}
              <div className="flex-grow mb-6 relative z-10">
                <p className="text-white/80 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className={`bg-gradient-to-br ${service.color} w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0`} />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
        .card-service:hover .link-underline::after {
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
