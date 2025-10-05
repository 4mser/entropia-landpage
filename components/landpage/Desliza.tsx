// components/landpage/Desliza.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useHover } from '@/app/contexts/HoverContext';

const Desliza: React.FC = () => {
  const { hoverInfo } = useHover();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);

      const handleScroll = () => {
        setIsVisible(window.scrollY === 0);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient]);

  const handleClick = () => {
    if (window.innerWidth < 768) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  if (!isClient) return null;

  return (
    <section className='relative'>
      <div
        className={`fixed transition-all duration-100 ease-in-out ${
          isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 -translate-x-full translate-y-0'
        } ${window.innerWidth < 768 ? 'bottom-0  left-1/2 -translate-x-1/2' : ''}`}
        style={{
          transform: `translate3d(${position.x - 76}px, ${position.y - 76}px, 0)`,
          transition: 'transform 0.3s ease-out, opacity 0.7s ease-in-out',
          zIndex: `${window.innerWidth < 768 ? 10 : 0}`
        }}
      >
        <div
          className={`rounded-full shadow-custom2 lg:shadow-custom3 transition duration-300 p-[4px] ${hoverInfo ? 'scale-[0]' : 'scale-50 md:scale-110'} cursor-pointer ${window.innerWidth < 768 ? 'scale-[0.65]' : ''}`}
          style={{
            background: 'var(--degree)',
            animation: 'gradient 7s ease infinite',
          }}
          onClick={handleClick} // Evento en el círculo exterior
        >
          <div
            className={`relative w-36 h-36 flex items-center justify-center rounded-full ${
              hoverInfo ? 'bg-[#020202]/30' : 'bg-[#020202]'
            } cursor-pointer`}
            onClick={handleClick} // Evento en el círculo interior
          >
            {/* Círculo Exterior */}
            <div
              className={`absolute w-36 h-36 border border-white/10 rounded-full flex items-center justify-center transition-opacity duration-200 ${
                hoverInfo ? 'opacity-0' : 'opacity-100'
              } cursor-pointer`}
            >
              {/* Texto curvado con animación de giro */}
              <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    fill="transparent"
                  />
                  <text className="text-[8.5px] fill-white">
                    {/* Primer punto */}
                    
                    {/* Primer texto */}
                    <textPath href="#circlePath" startOffset="0%">
                      DESLIZA PARA DESCUBRIR  •
                    </textPath>
                    {/* Segundo punto */}
                   
                    {/* Segundo texto */}
                    <textPath href="#circlePath" startOffset="50%">
                      DESLIZA PARA DESCUBRIR  •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Círculo Interior */}
            <div className="absolute w-24 h-24 border border-white/15 rounded-full flex items-center justify-center cursor-pointer">
              {hoverInfo ? (
                <div className="text-white text-center px-2 z-50 opacity-0">{hoverInfo}</div>
              ) : (
                <div className="text-white font-extralight text-2xl md:opacity-0 cursor-pointer">↓</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Desliza;
