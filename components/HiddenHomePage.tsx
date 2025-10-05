import React from 'react';

const HiddenHomePage: React.FC = () => {
  return (
    <div className="hidden-home-page fixed top-0 left-0 w-full h-[100dvh] bg-black opacity-0 pointer-events-none flex items-center justify-center z-[-1] transition-opacity duration-500">
      <div className="absolute left-1/2 -translate-x-1/2 top-56 xl:top-72 flex justify-center flex-col gap-3 items-center">
        <h1 className="whitespace-nowrap text-center font-semibold text-[8vw] md:text-[6vw] leading-none xl:text-6xl xl:leading-[4.5rem]">
          Contenido Oculto <br className="xl:block" /> Solo para ver <br className="xl:hidden" />
          <span className="bg-gradient-to-r xl:ml-3 font-bold from-red-400 via-purple-500 to-blue-600 text-transparent bg-clip-text">
            a través de Desliza.
          </span>
        </h1>
        <p className="text-center font-medium text-xs text-stone-50 opacity-80 xl:text-base">
          Esta es una versión oculta de la página que solo se ve cuando el cursor pasa por el componente Desliza.
        </p>
      </div>
    </div>
  );
};

export default HiddenHomePage;
