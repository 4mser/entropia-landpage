'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import { projects } from '@/utils/content';

gsap.registerPlugin(ScrollTrigger);

interface ProjectPageProps {
  params: {
    id: string;
  };
}

const ProjectPage: React.FC<ProjectPageProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const project = projects.find((p) => p.id === id);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;


    // Animación del gradiente al hacer scroll
    if (gradientRef.current) {
      gsap.fromTo(
        gradientRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 0.3,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gradientRef.current,
            start: 'top bottom', // Comienza cuando el gradiente entra en la parte inferior de la pantalla
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [isExiting, isClient, router]);

  const handleExit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    router.push('/'); // Redirige a la página de inicio
  };
  

  if (!project) {
    router.push('/404');
    return null;
  }

  if (!isClient) return null;

  const { blogContent } = project;

  return (
    <main className="relative text-white  p-6 md:p-16 lg:p-24">

      {/* Gradiente animado */}
      <div
        ref={gradientRef}
        className="fixed left-1/2 transform -translate-x-1/2 bottom-1/4 w-[90%] lg:w-[60%] h-80 bg-gradient-to-b from-sky-600 via-cyan-500 to-emerald-400 rounded-full -z-[2] blur-[120px]"
      ></div>

      {/* Contenido de la Página */}
      <div className="max-w-4xl lg:max-w-6xl mx-auto lg:flex lg:items-start lg:space-x-24 pb-10">
        {/* Imagen a la izquierda en pantallas grandes */}
        <div className="mb-6 lg:mb-0 lg:w-1/3 lg:sticky lg:top-24">
          <a href="#" onClick={handleExit} className="text-lg mb-4 block">
            ← Volver
          </a>
          <Image
            src={project.image}
            alt={`Imagen de ${project.title}`}
            width={800}
            height={600}
            className="rounded-lg mb-6 md:w-96 lg:w-full"
          />
          <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
          <p className="text-sm">{project.description}</p>
        </div>

        {/* Contenido desplazable a la derecha */}
        <div className=" space-y-6 lg:w-2/3 lg:max-h-[80dvh] lg:overflow-y-auto pr-3">
          <section>
            <h2 className="text-3xl font-semibold mb-4">Introducción</h2>
            <p className="text-lg">{blogContent.introduction}</p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Objetivos</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              {blogContent.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Problemas que Soluciona</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              {blogContent.problemsSolved.map((problem, index) => (
                <li key={index}>{problem}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Características</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              {blogContent.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Casos de Uso</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              {blogContent.useCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Tecnologías Utilizadas</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              {blogContent.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Equipo</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              {blogContent.team.map((member, index) => (
                <li key={index}>
                  {member.name} - {member.role}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Resultados Esperados o Logrados</h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              {blogContent.expectedResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Información Adicional</h2>
            <p className="text-lg">{blogContent.additionalInfo}</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProjectPage;
