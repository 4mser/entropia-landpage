'use client';
import ParticleLogoSimulation from '@/components/HypergraphWaveSimulation';
import Image from 'next/image';
import React, { useState } from 'react';
import { MdOutlineArrowForwardIos } from "react-icons/md";


const RLab = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main>
      <section
        className={`relative flex justify-start items-center w-full transition-all duration-500 ${isHovered ? 'filter bg-black invert -hue-rotate-90' : ''}`}
      >
        <Image
          src="/rlab.png"
          alt="Research Lab"
          className="absolute left-[5rem] md:left-[14rem] lg:left-[16rem] xl:left-[18rem] object-contain w-[17rem] md:w-[37rem]"
          width={700}
          height={200}
        />
        <ParticleLogoSimulation />
        <button
          className="absolute right-4 md:right-32 top-2/3 -translate-y-2/3  gap-3 md:top-1/2 md:-translate-y-1/2 p-2  text-white/8 rounded flex items-center transition-transform duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Explorar
          <span className={`mr-2 transition-transform duration-300 ${isHovered ? 'translate-x-2 scale-125' : ''}`}>
            <MdOutlineArrowForwardIos size={24} /> {/* Flecha grande */}
          </span>
        </button>
      </section>
    </main>
  );
};

export default RLab;
