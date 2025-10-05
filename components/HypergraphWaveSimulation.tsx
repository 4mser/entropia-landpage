'use client';

// Importaciones necesarias de React, react-three-fiber, three.js y postprocesamiento
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// **Configuraciones de partículas**
const numParticles = 500; // Número total de partículas en el sistema
const maxDistance = 10; // Distancia máxima desde el núcleo para generar partículas
const particleColors = ['#2ABD7A', '#47C396', '#39B8C8', '#2F8CAE']; // Colores posibles para las partículas
const nucleusRadius = 20; // Radio del núcleo alrededor del cual se generan las partículas


/**
 * Función para generar posiciones basadas en la espiral de Fibonacci.
 * Distribuye las partículas de manera uniforme siguiendo la espiral.
 * @param {number} index - Índice de la partícula.
 * @param {number} total - Número total de 3.
 * @returns {THREE.Vector3} - Vector de posición en la espiral de Fibonacci.
 */




const generateAtomModelPosition = (index: number, total: number): THREE.Vector3 => {
  const numParticlesInNucleus = Math.floor(total * 0.6); // Porcentaje de partículas en el núcleo
  const numParticlesInRings = total - numParticlesInNucleus; // Partículas en los anillos
  const ringRadius1 = nucleusRadius * 1.3; // Radio del primer anillo
  const ringRadius2 = nucleusRadius * 1.3; // Radio del segundo anillo
  const inclinationAngle1 = Math.PI / -1.4; // Ángulo de inclinación para el primer anillo (30 grados)
  const inclinationAngle2 = Math.PI / 1.4; // Ángulo de inclinación para el segundo anillo (60 grados)

  if (index < numParticlesInNucleus) {
    // Generar partículas para el núcleo (esfera)
    const phi = Math.acos(2 * Math.random() - 1); // Ángulo polar
    const theta = 2 * Math.PI * Math.random(); // Ángulo azimutal
    const radius = nucleusRadius * 0.3; // Radio del núcleo

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  } else {
    // Determinar si la partícula pertenece al primer o al segundo anillo
    const ringIndex = index - numParticlesInNucleus; // Índice ajustado para los anillos
    const angle = (ringIndex / numParticlesInRings) * Math.PI * 2 + performance.now() * 0.001; // Ángulo con rotación animada
    const isSecondRing = ringIndex % 2 === 0; // Alternar entre el primer y el segundo anillo

    const ringRadius = isSecondRing ? ringRadius2 : ringRadius1;
    const inclinationAngle = isSecondRing ? inclinationAngle2 : inclinationAngle1;

    // Coordenadas en el plano XY para el anillo
    const x = ringRadius * Math.cos(angle);
    const y = 0; // Centrado en el plano
    const z = ringRadius * Math.sin(angle);

    // Aplicar rotación para inclinar el anillo en el eje X
    const cosInclination = Math.cos(inclinationAngle);
    const sinInclination = Math.sin(inclinationAngle);
    const rotatedY = y * cosInclination - z * sinInclination;
    const rotatedZ = y * sinInclination + z * cosInclination;

    // Aplicar rotación alrededor del núcleo (eje Y)
    const rotationSpeed = 0.2; // Velocidad de rotación alrededor del núcleo
    const rotatedX = x * Math.cos(rotationSpeed * performance.now()) - rotatedZ * Math.sin(rotationSpeed * performance.now());
    const finalZ = x * Math.sin(rotationSpeed * performance.now()) + rotatedZ * Math.cos(rotationSpeed * performance.now());

    return new THREE.Vector3(rotatedX, rotatedY, finalZ);
  }
};



/**
 * Función para generar posiciones aleatorias alrededor del núcleo.
 * Utiliza coordenadas esféricas para distribuir las partículas en el espacio 3D.
 */
const generatePositionAroundNucleus = (): THREE.Vector3 => {
  const radius = Math.random() * maxDistance + nucleusRadius; // Radio aleatorio entre nucleusRadius y nucleusRadius + maxDistance
  const theta = Math.random() * Math.PI * 2; // Ángulo azimutal aleatorio entre 0 y 2π
  const phi = Math.acos((Math.random() * 2) - 1); // Ángulo polar aleatorio entre 0 y π
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta), // Coordenada X
    radius * Math.sin(phi) * Math.sin(theta), // Coordenada Y
    radius * Math.cos(phi) // Coordenada Z
  );
};

/**
 * Interfaz que define las propiedades que cada partícula recibirá.
 */
interface ParticleProps {
  color: THREE.Color; // Color de la partícula
  initialPosition: THREE.Vector3; // Posición inicial de la partícula
  spiralPosition: THREE.Vector3; // Posición en espiral de Fibonacci de la partícula
  cursorPosition: THREE.Vector3 | null; // Posición del cursor (si está presente)
  isImploding: boolean; // Indica si el sistema está en estado de implosión
  isSpiraling: boolean; // Indica si el sistema está formando una espiral de Fibonacci
  isHovered: boolean; // Indica si el cursor está sobre la partícula
  size: number; // Tamaño de la partícula
}

/**
 * Componente que representa una única partícula en el sistema.
 */
const Particle: React.FC<ParticleProps> = ({
  color,
  initialPosition,
  spiralPosition,
  cursorPosition,
  isImploding,
  isSpiraling,
  isHovered,
  size, // Recibe el tamaño como prop
}) => {
  const ref = useRef<THREE.Mesh>(null!); // Referencia al mesh de la partícula
  const rotationSpeed = 0.02; // Velocidad de rotación de la partícula

  /**
   * Hook useFrame que se ejecuta en cada frame de la animación.
   * Controla la posición y rotación de la partícula según el estado.
   */
  useFrame(() => {
    const position = ref.current.position; // Posición actual de la partícula
    const time = performance.now() * 0.001; // Tiempo actual en segundos

    let targetPosition: THREE.Vector3 | null = null; // Posición objetivo hacia la cual interpolar

    if (isImploding) {
      // Si el sistema está implosionando, la partícula se dirige al núcleo (0,0,0)
      targetPosition = new THREE.Vector3(0, 0, 0);
    } else if (isSpiraling) {
      // Si el sistema está formando una espiral de Fibonacci, la partícula se dirige a su posición en la espiral
      targetPosition = spiralPosition;
    } else if (isHovered && cursorPosition) {
      // Si la partícula está siendo "hovered" y hay una posición de cursor
      const distanceToCursor = cursorPosition.distanceTo(position); // Calcula la distancia al cursor
      if (distanceToCursor < 8) {
        // Si la distancia es menor a 10 unidades
        const repelForce = position.clone().sub(cursorPosition).normalize().multiplyScalar(80); // Calcula una fuerza de repulsión
        position.add(repelForce); // Aplica la fuerza de repulsión
      }
      // Ajusta la posición objetivo para acercarse al núcleo sin sobrepasarlo
      targetPosition = initialPosition.clone().multiplyScalar(0.5);
      const followCursor = cursorPosition.clone().normalize().multiplyScalar(nucleusRadius * 0.01); // Crea una posición que sigue al cursor
      position.lerp(followCursor, 0.01); // Interpola la posición hacia followCursor
      ref.current.rotation.y += rotationSpeed; // Rota la partícula
    } else {
      // Si no está en estado de implosión, espiral ni siendo "hovered", retorna a la posición inicial
      targetPosition = initialPosition;
    }

    // Interpola la posición actual hacia la posición objetivo
    position.lerp(targetPosition || initialPosition, (isImploding || isSpiraling) ? 0.04 : 0.01);

    if (isHovered && !isImploding && !isSpiraling) {
      // Si está siendo "hovered" y no está implosionando ni en espiral, agrega movimientos aleatorios
      position.x += (Math.sin(time + initialPosition.x) + (Math.random() - 0.5)) * 0.1;
      position.y += (Math.cos(time + initialPosition.y) + (Math.random() - 0.5)) * 0.1;
      position.z += (Math.sin(time + initialPosition.z) + (Math.random() - 0.5)) * 0.1;
    } else if (!isHovered && !isImploding && !isSpiraling) {
      // Si no está siendo "hovered", implosionando ni en espiral, agrega movimientos aleatorios más suaves
      position.x += (Math.sin(time + initialPosition.x) + (Math.random() - 0.5)) * 0.03;
      position.y += (Math.cos(time + initialPosition.y) + (Math.random() - 0.5)) * 0.03;
      position.z += (Math.sin(time + initialPosition.z) + (Math.random() - 0.5)) * 0.03;
    }
  });

  return (
    <mesh ref={ref} position={initialPosition}>
      {/* Geometría de esfera con tamaño dinámico */}
      <sphereGeometry args={[size, 12, 12]} />
      {/* Material estándar con color y emisión */}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  );
};

/**
 * Interfaz que define las propiedades del sistema de partículas.
 */
interface ParticleSystemProps {
  cursorPosition: THREE.Vector3 | null; // Posición del cursor
  isImploding: boolean; // Estado de implosión
  isSpiraling: boolean; // Estado de espiral de Fibonacci
  isHovered: boolean; // Estado de hover
}

/**
 * Componente que representa el sistema completo de partículas.
 */
const ParticleSystem: React.FC<ParticleSystemProps> = ({
  cursorPosition,
  isImploding,
  isSpiraling,
  isHovered,
}) => {
  /**
   * useMemo para generar las partículas una sola vez al montar el componente.
   * Cada partícula recibe un color, una posición inicial, una posición en espiral de Fibonacci y un tamaño aleatorio (2 o 1).
   */
  const particles = useMemo(
    () =>
      Array.from({ length: numParticles }, (_, index) => {
        const color = new THREE.Color(
          particleColors[Math.floor(Math.random() * particleColors.length)]
        ); // Selecciona un color aleatorio de la lista
        const initialPosition = generatePositionAroundNucleus(); // Genera una posición inicial aleatoria
        const spiralPosition = generateAtomModelPosition(index, numParticles); // Genera una posición en espiral de Fibonacci
        const size = Math.random() * 2;

        return { color, initialPosition, spiralPosition, size };
      }),
    [] // Dependencias vacías para que se ejecute solo una vez
  );

  return (
    <>
      {/* Renderiza cada partícula pasando sus propiedades */}
      {particles.map((particle, i) => (
        <Particle
          key={i}
          color={particle.color}
          initialPosition={particle.initialPosition}
          spiralPosition={particle.spiralPosition} // Pasa la posición en espiral de Fibonacci
          cursorPosition={cursorPosition}
          isImploding={isImploding}
          isSpiraling={isSpiraling} // Pasa el estado de espiral de Fibonacci
          isHovered={isHovered}
          size={particle.size} // Pasa el tamaño como prop
        />
      ))}
    </>
  );
};

/**
 * Interfaz que define las propiedades del grupo rotativo que contiene las partículas.
 */
interface RotatingGroupProps {
  scale: number; // Escala del grupo
  isHovered: boolean; // Estado de hover
  isImploding: boolean; // Estado de implosión
  isSpiraling: boolean; // Estado de espiral de Fibonacci
  onHoverChange: (hovered: boolean) => void; // Función para cambiar el estado de hover
  onClick: () => void; // Función para manejar el clic
}

/**
 * Componente que representa un grupo rotativo que contiene las partículas y maneja interacciones.
 */
const RotatingGroup: React.FC<RotatingGroupProps> = ({
  scale,
  isHovered,
  isImploding,
  isSpiraling,
  onHoverChange,
  onClick,
}) => {
  const groupRef = useRef<THREE.Group>(null!); // Referencia al grupo rotativo
  const [cursorPosition, setCursorPosition] = useState<THREE.Vector3 | null>(null); // Posición del cursor

  // Estados para manejo de arrastre y clic
  const [isDragging, setIsDragging] = useState(false); // Indica si se está arrastrando
  const [hasMoved, setHasMoved] = useState(false); // Indica si el puntero ha movido más allá del umbral
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null); // Posición inicial del puntero

  // Ref para trackear si el puntero está presionado
  const isPointerDownRef = useRef(false);

  const dragThreshold = 1; // Umbral de movimiento en píxeles para considerar arrastre

  // Acceder a la cámara y tamaño usando useThree
  const { camera, size } = useThree();

  // Verificar si la cámara es una PerspectiveCamera
  const isPerspective = camera instanceof THREE.PerspectiveCamera;
  if (!isPerspective) {
    console.warn('Se requiere una PerspectiveCamera para calcular desiredX.');
  }

  /**
   * useMemo para calcular el desplazamiento en X para alinear el grupo a la izquierda.
   * Se basa en el frustum de la cámara.
   */
  const desiredX = useMemo(() => {
    if (isPerspective) {
      const perspectiveCamera = camera as THREE.PerspectiveCamera;
      const aspect = size.width / size.height; // Relación de aspecto de la cámara
      const frustumHeight = 2 * Math.tan((perspectiveCamera.fov * Math.PI) / 360) * perspectiveCamera.position.z; // Altura del frustum
      const frustumWidth = frustumHeight * aspect; // Ancho del frustum
      const padding = window.innerWidth < 768 ? 0.5 : 3.5; // Espacio de padding desde el borde
      return -frustumWidth / 2.25 + padding; // Calcula el desplazamiento en X
    }
    return 0; // Si no es PerspectiveCamera, no desplaza
  }, [camera, size, isPerspective]);

  /**
   * Manejador para el evento de presión de puntero (click o toque).
   * Inicia el estado de arrastre y cambia el cursor.
   */
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (isImploding || isSpiraling) return; // Ignora si está implosionando o spiraling
    isPointerDownRef.current = true; // Marca que el puntero está presionado
    setIsDragging(false); // Resetea el estado de arrastre
    setHasMoved(false); // Resetea el estado de movimiento
    setStartPosition({ x: event.clientX, y: event.clientY }); // Guarda la posición inicial del puntero
    document.body.style.cursor = 'grabbing'; // Cambia el cursor a 'grabbing'
  };

  /**
   * Manejador para el movimiento del puntero.
   * Detecta si se está arrastrando y actualiza la rotación del grupo.
   * También actualiza la posición del cursor para interacciones de hover.
   */
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (isImploding || isSpiraling) return; // Ignora si está implosionando o spiraling

    if (isPointerDownRef.current && startPosition) {
      const { clientX, clientY } = event;

      const deltaX = clientX - startPosition.x; // Diferencia en X
      const deltaY = clientY - startPosition.y; // Diferencia en Y
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // Distancia total movida

      if (!hasMoved && distance > dragThreshold) {
        // Si aún no ha movido más allá del umbral, marca como movido y empieza a arrastrar
        setHasMoved(true);
        setIsDragging(true);
      }

      if (isDragging && groupRef.current) {
        // Si está arrastrando, actualiza la rotación del grupo
        groupRef.current.rotation.y += deltaX * 0.005; // Ajusta la sensibilidad de la rotación en Y
        groupRef.current.rotation.x += deltaY * 0.005; // Ajusta la sensibilidad de la rotación en X

        // Actualiza la posición de inicio para el próximo movimiento
        setStartPosition({ x: clientX, y: clientY });
      }
    }

    // Actualiza la posición del cursor para animaciones de partículas
    if (event.intersections.length > 0) {
      const intersect = event.intersections[0];
      setCursorPosition(intersect.point); // Guarda la posición de intersección
    } else {
      setCursorPosition(null); // Si no hay intersección, limpia la posición del cursor
    }
  };

  /**
   * Manejador para el levantamiento del puntero.
   * Finaliza el estado de arrastre y, si no se ha movido mucho, ejecuta el clic.
   */
  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return; // Ignora si el puntero no estaba presionado
    isPointerDownRef.current = false; // Marca que el puntero ya no está presionado

    if (isImploding || isSpiraling) return; // Ignora si está implosionando o spiraling

    if (!hasMoved && !isImploding && !isSpiraling) {
      // Si no se ha movido mucho, considera esto como un clic
      onClick();
    }
    setIsDragging(false); // Resetea el estado de arrastre
    setHasMoved(false); // Resetea el estado de movimiento
    setStartPosition(null); // Limpia la posición de inicio
    document.body.style.cursor = isHovered ? 'pointer' : 'default'; // Restaura el cursor según el estado de hover
  };

  /**
   * Animación de rotación lenta para simular el movimiento galáctico.
   */
  useFrame(() => {
    if (groupRef.current) {
      if (isHovered) {
        // Rotación sobre su propio eje cuando se hace hover
        groupRef.current.rotation.y += 0.01; // Ajusta la velocidad de rotación sobre el eje Y
        groupRef.current.rotation.x += 0.01;
      } else if (isSpiraling) {
        // Rotación lenta alrededor del eje Y en modo espiral
        groupRef.current.rotation.y += 0.001;
        groupRef.current.rotation.x += 0.001;

      }
    }
  });

  return (
    <group
      ref={groupRef} // Referencia al grupo rotativo
      scale={[scale, scale, scale]} // Escala del grupo
      position={[desiredX, 0, 0]} // Posiciona el grupo en el eje X según desiredX
      onPointerEnter={() => {
        if (isImploding || isSpiraling) return; // Ignora si está implosionando o spiraling
        onHoverChange(true); // Cambia el estado de hover a true
        if (!isDragging) {
          document.body.style.cursor = 'pointer'; // Cambia el cursor a 'pointer' si no está arrastrando
        }
      }}
      onPointerLeave={() => {
        if (isImploding || isSpiraling) return; // Ignora si está implosionando o spiraling
        onHoverChange(false); // Cambia el estado de hover a false
        document.body.style.cursor = 'default'; // Restaura el cursor a 'default'
        setCursorPosition(null); // Limpia la posición del cursor
        setIsDragging(false); // Resetea el estado de arrastre
        setHasMoved(false); // Resetea el estado de movimiento
        setStartPosition(null); // Limpia la posición de inicio
      }}
      onPointerDown={handlePointerDown} // Asigna el manejador para pointerDown
      onPointerMove={handlePointerMove} // Asigna el manejador para pointerMove
      onPointerUp={handlePointerUp} // Asigna el manejador para pointerUp
      onPointerOut={handlePointerUp} // Maneja cuando el puntero sale del área mientras se arrastra
    >
      {/* Mesh invisible para detección de hover y eventos */}
      <mesh visible={false}>
        {/* Geometría de esfera invisible que actúa como área de interacción */}
        <sphereGeometry args={[22, 32, 32]} /> {/* Ajustado para abarcar más distancia */}
      </mesh>
      {/* Componente del sistema de partículas */}
      <ParticleSystem
        cursorPosition={cursorPosition} // Pasa la posición del cursor
        isImploding={isImploding} // Pasa el estado de implosión
        isSpiraling={isSpiraling} // Pasa el estado de espiral de Fibonacci
        isHovered={isHovered} // Pasa el estado de hover
      />
    </group>
  );
};

/**
 * Interfaz que define las propiedades de la escena principal.
 */
interface SceneProps {
  scale: number; // Escala de las partículas según el tamaño de la pantalla
}

/**
 * Componente que representa la escena principal con iluminación, efectos y el grupo rotativo de partículas.
 */
const Scene: React.FC<SceneProps> = ({ scale }) => {
  const [isHovered, setIsHovered] = useState(false); // Estado que indica si alguna partícula está siendo "hovered"
  const [isImploding, setIsImploding] = useState(false); // Estado que indica si el sistema está en implosión
  const [isSpiraling, setIsSpiraling] = useState(false); // Estado que indica si el sistema está en espiral de Fibonacci

  /**
   * Función que maneja el clic en el sistema de partículas.
   * Inicia la animación de implosión, luego la de espiral de Fibonacci, y finalmente retorna al estado normal.
   */
  const handleClick = () => {
    if (isImploding || isSpiraling) return; // Ignora si ya está implosionando o spiraling
    setIsImploding(true); // Inicia la implosión
    setIsHovered(false); // Restablece el estado de hover al iniciar la implosión

    // Después de 1.5 segundos, inicia la espiral de Fibonacci
    setTimeout(() => {
      setIsImploding(false); // Finaliza la implosión
      setIsSpiraling(true); // Inicia la espiral de Fibonacci

      // Después de 3 segundos, finaliza la espiral de Fibonacci y retorna a la normalidad
      setTimeout(() => {
        setIsSpiraling(false); // Finaliza la espiral de Fibonacci
      }, 3000);
    }, 1500);
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 50 }} // Configuración de la cámara: posición y campo de visión
      style={{ width: '100vw', height: '100%' }} // Estilo para que el canvas ocupe toda la ventana
      gl={{ alpha: true }} // Habilita el canal alpha para transparencia
    >
      {/* **Iluminación de la escena** */}
      <ambientLight intensity={0.3} /> {/* Luz ambiental suave */}
      <pointLight position={[0, 0, 10]} intensity={0.1} color="white" /> {/* Luz puntual blanca */}

      {/* **Efecto de postprocesamiento** */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0} // Umbral de luminancia para el efecto Bloom
          luminanceSmoothing={0.2} // Suavizado de luminancia
          height={600} // Altura del efecto Bloom
          intensity={1} // Intensidad del efecto Bloom
        />
      </EffectComposer>

      {/* **Grupo rotativo que contiene las partículas** */}
      <RotatingGroup
        scale={scale} // Pasa la escala según el tamaño de la pantalla
        isHovered={isHovered} // Pasa el estado de hover
        isImploding={isImploding} // Pasa el estado de implosión
        isSpiraling={isSpiraling} // Pasa el estado de espiral de Fibonacci
        onHoverChange={setIsHovered} // Pasa la función para cambiar el estado de hover
        onClick={handleClick} // Pasa la función para manejar el clic
      />
    </Canvas>
  );
};

/**
 * Componente principal de la simulación de partículas.
 * Ajusta la escala de las partículas según el tamaño de la pantalla.
 */
const ParticleLogoSimulation: React.FC = () => {
  const [scale, setScale] = useState(0.05); // Estado para la escala de las partículas

  /**
   * useEffect que maneja el ajuste de la escala de las partículas según el tamaño de la ventana.
   * Utiliza un listener para el evento 'resize' de la ventana.
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        setScale(0.025); // Tamaño reducido para pantallas menores a 768px
      } else {
        setScale(0.05); // Tamaño estándar para pantallas mayores o iguales a 768px
      }
    };

    handleResize(); // Llama a la función una vez al montar el componente
    window.addEventListener('resize', handleResize); // Añade el listener para cambios de tamaño

    return () => {
      window.removeEventListener('resize', handleResize); // Limpia el listener al desmontar el componente
    };
  }, []);

  return <Scene scale={scale} />; // Renderiza la escena principal pasando la escala
};

export default ParticleLogoSimulation; // Exporta el componente principal por defecto
