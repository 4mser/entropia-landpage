// utils/consts.js

export const projects = [
  {
    id: 'aria',
    title: 'ARIA',
    description: 'Gestión inteligente de restaurantes con IA, análisis de datos y funcionalidades sociales.',
    image: '/aria.png',
    phase: 'En desarrollo',
    blogContent: {
      introduction: 'ARIA utiliza inteligencia artificial avanzada para optimizar la gestión de restaurantes.',
      objectives: [
        'Reducir el tiempo de espera de los clientes.',
        'Optimizar la gestión de inventario y pedidos.',
        'Proveer análisis de datos para mejorar la eficiencia del servicio.'
      ],
      problemsSolved: [
        'Largos tiempos de espera en restaurantes.',
        'Dificultad para gestionar inventarios de manera eficiente.',
        'Falta de retroalimentación en tiempo real para mejorar la operación diaria.'
      ],
      features: [
        'Mejora la eficiencia del servicio.',
        'Aumenta la satisfacción del cliente.',
        'Reduce el desperdicio de alimentos.'
      ],
      useCases: [
        'Un restaurante puede reducir los tiempos de espera usando IA para predecir patrones de demanda.',
        'Los gerentes de restaurante pueden optimizar su inventario en tiempo real.'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'Inteligencia Artificial'],
      team: [
        { name: 'Nicolás Moreno', role: 'Frontend' },
        { name: 'Diego Oliver', role: 'Backend' },
        { name: 'Nicolás Richardson', role: 'Data Science'},
        { name: 'Mauricio Ossio', role: 'Ventas'},
        { name: 'Kevin Bravo', role: 'Ventas'},

      ],
      expectedResults: [
        'Reducción del tiempo de espera en un 20%.',
        'Mejora en la satisfacción del cliente en un 30%.',
        'Reducción de costos operativos en un 15%.'
      ],
      additionalInfo: 'ARIA está diseñado para integrarse en múltiples plataformas y es escalable para grandes cadenas de restaurantes.'
    },
  },
  {
    id: 'neurabite',
    title: 'Neurabite',
    description: 'Repostería neurocientífica para mejorar el estado de ánimo y la cognición.',
    image: '/neurabite.jpeg',
    phase: 'En desarrollo',
    blogContent: {
      introduction: 'Neurabite crea dulces funcionales que apoyan la salud mental y el bienestar cognitivo.',
      objectives: [
        'Mejorar el estado de ánimo de las personas.',
        'Aumentar la funcionalidad cognitiva con ingredientes específicos.',
        'Ofrecer una alternativa saludable a los dulces convencionales.'
      ],
      problemsSolved: [
        'Escasez de alimentos funcionales enfocados en la salud mental.',
        'Falta de opciones de postres que apoyen el bienestar cognitivo.',
        'Excesiva dependencia en azúcares y conservantes artificiales.'
      ],
      features: [
        'Mejora el estado de ánimo a través de ingredientes específicos.',
        'Apoya la cognición con nutrientes clave.',
        'Reduce el uso de azúcares artificiales y conservantes.'
      ],
      useCases: [
        'Neurabite se usa en eventos para ofrecer una opción de postres saludables y funcionales.',
        'Disponible en tiendas especializadas en productos de salud.'
      ],
      technologies: ['Neurociencia', 'Nutrición Funcional', 'Desarrollo de Alimentos'],
      team: [
        { name: 'Laura Mendoza', role: 'Nutricionista' },
        { name: 'Felipe Ruiz', role: 'Desarrollador de Productos' }
      ],
      expectedResults: [
        'Mejora en el bienestar mental de los consumidores.',
        'Incremento en la funcionalidad cognitiva mediante ingredientes específicos.',
      ],
      additionalInfo: 'Neurabite utiliza ingredientes naturales y tecnología de procesamiento de alimentos avanzada para mantener la efectividad de sus nutrientes.'
    },
  },
  {
    id: 'nina',
    title: 'N.I.N.A',
    description: 'Algoritmo neurointeligente para optimizar recetas y mejorar la salud nutricional y cognitiva.',
    image: '/NINA.png',
    phase: 'En desarrollo',
    blogContent: {
      introduction: 'N.I.N.A - Neuro Intelligent Nutritional Algorithm: Es un algoritmo diseñado para analizar recetas y optimizarlas para la salud mental.',
      objectives: [
        'Mejorar la salud nutricional de los usuarios.',
        'Reducir el impacto de ciertos ingredientes en la salud mental.',
        'Ofrecer recomendaciones personalizadas de recetas.'
      ],
      problemsSolved: [
        'Dificultad para entender el impacto de los ingredientes en la salud mental.',
        'Falta de opciones personalizadas en recetas para mejorar la salud cognitiva.'
      ],
      features: [
        'Optimización de recetas para reducir el impacto negativo en la salud mental.',
        'Ajuste de ingredientes según las necesidades del usuario.',
        'Interfaz fácil de usar para mejorar la experiencia del cliente.'
      ],
      useCases: [
        'Los usuarios pueden introducir recetas para recibir recomendaciones de ajustes en ingredientes.',
        'Se utiliza en centros de salud para ayudar a los pacientes a mejorar su dieta.'
      ],
      technologies: ['Inteligencia Artificial', 'Nutrición', 'Optimización de Algoritmos'],
      team: [
        { name: 'Ricardo Gómez', role: 'Científico de Datos' },
        { name: 'Ana Morales', role: 'Desarrolladora Frontend' }
      ],
      expectedResults: [
        'Incremento en la salud mental de los usuarios a través de cambios dietéticos.',
        'Recetas más saludables y personalizadas para cada usuario.'
      ],
      additionalInfo: 'N.I.N.A ayuda a las personas a tomar decisiones más informadas sobre su alimentación diaria.'
    },
  },
  {
    id: 'cultibox',
    title: 'CULTIBOX',
    description: 'Huertas verticales automatizadas y sostenibles para entornos urbanos.',
    image: '/culti2.png',
    phase: 'En desarrollo',
    blogContent: {
      introduction: 'CULTIBOX ofrece soluciones sostenibles para la producción de alimentos en áreas urbanas.',
      objectives: [
        'Facilitar el cultivo de alimentos en entornos urbanos.',
        'Reducir la dependencia de grandes cadenas de suministro.',
        'Promover la autosuficiencia alimentaria.'
      ],
      problemsSolved: [
        'Falta de espacio para la agricultura en áreas urbanas.',
        'Dependencia excesiva en proveedores de alimentos.',
        'Uso excesivo de recursos para transportar alimentos a las ciudades.'
      ],
      features: [
        'Sistema de riego automatizado y eficiente.',
        'Aprovechamiento del espacio vertical para maximizar la producción.',
        'Fácil integración en hogares y oficinas.'
      ],
      useCases: [
        'Se utiliza en balcones de apartamentos para cultivar alimentos frescos.',
        'Ideal para oficinas que buscan ofrecer opciones de cultivo para los empleados.'
      ],
      technologies: ['Automatización', 'Sostenibilidad', 'Agricultura Vertical'],
      team: [
        { name: 'Mario Martínez', role: 'Ingeniero Ambiental' },
        { name: 'Sofía Rivas', role: 'Diseñadora Industrial' }
      ],
      expectedResults: [
        'Aumento de la autosuficiencia alimentaria en un 40%.',
        'Reducción de la huella de carbono mediante la producción local.'
      ],
      additionalInfo: 'CULTIBOX permite a las personas cultivar sus propios alimentos frescos y saludables en espacios reducidos.'
    },
  },
  
  {
    id: 'brain',
    title: 'BRAIN SYSTEM',
    description: 'Sistema de automatización empresarial basado en IA, optimización de recursos y teoría de hipergrafos.',
    image: '/brain.jpeg',
    phase: 'concepto',
    blogContent: {
      introduction: 'BRAIN SYSTEM es un sistema que optimiza la eficiencia de los recursos empresariales usando IA.',
      objectives: [
        'Optimizar el uso de recursos dentro de las empresas.',
        'Reducir costos operativos a través de la automatización.',
        'Proveer análisis de datos avanzados para decisiones informadas.'
      ],
      problemsSolved: [
        'Ineficiencia en la distribución de recursos empresariales.',
        'Falta de datos precisos para optimizar las operaciones.'
      ],
      features: [
        'Automatización de procesos para mejorar la eficiencia.',
        'Análisis avanzado de recursos y optimización.',
        'Escalabilidad para empresas de diversos tamaños.'
      ],
      useCases: [
        'Empresas utilizan el sistema para reducir costos operativos.',
        'Equipos de gestión pueden monitorizar el uso de recursos en tiempo real.'
      ],
      technologies: ['Inteligencia Artificial', 'Automatización Empresarial', 'Teoría de Hipergrafos'],
      team: [
        { name: 'Raúl Sánchez', role: 'Consultor de Optimización' },
        { name: 'Elena Castro', role: 'Ingeniera de Software' }
      ],
      expectedResults: [
        'Reducción de costos operativos en un 25%.',
        'Mejora en la eficiencia de la gestión de recursos en un 30%.'
      ],
      additionalInfo: 'BRAIN SYSTEM ayuda a las empresas a reducir costos y mejorar la productividad con tecnología avanzada.'
    },
  },
];


// {
  //   id: 'xplorers',
  //   title: 'Xplorers',
  //   description: 'Plataforma que gamifica la vida real tokenizando contenido y patrocinando acciones sostenibles.',
  //   image: '/xplorers.jpeg',
  //   phase: 'En desarrollo',
  //   blogContent: {
  //     introduction: 'Xplorers convierte acciones sostenibles en tokens y recompensas.',
  //     objectives: [
  //       'Fomentar la sostenibilidad a través de recompensas digitales.',
  //       'Motivar a los usuarios a adoptar un estilo de vida más ecológico.',
  //       'Colaborar con marcas sostenibles para ampliar el alcance de la plataforma.'
  //     ],
  //     problemsSolved: [
  //       'Falta de motivación para realizar acciones sostenibles.',
  //       'Falta de conexión entre marcas sostenibles y consumidores conscientes.'
  //     ],
  //     features: [
  //       'Gamificación de tareas diarias para fomentar la sostenibilidad.',
  //       'Sistema de recompensas para incentivar acciones positivas.',
  //       'Colaboración con marcas y patrocinadores sostenibles.'
  //     ],
  //     useCases: [
  //       'Usuarios pueden completar desafíos sostenibles y ganar tokens.',
  //       'Marcas sostenibles pueden patrocinar desafíos y ganar visibilidad en la plataforma.'
  //     ],
  //     technologies: ['Blockchain', 'Gamificación', 'Sostenibilidad'],
  //     team: [
  //       { name: 'Andrés López', role: 'Experto en Blockchain' },
  //       { name: 'Claudia Jiménez', role: 'Gerente de Producto' }
  //     ],
  //     expectedResults: [
  //       'Incremento en acciones sostenibles realizadas por los usuarios.',
  //       'Mayor visibilidad y engagement para las marcas sostenibles.'
  //     ],
  //     additionalInfo: 'Xplorers busca motivar a los usuarios a adoptar un estilo de vida más sostenible mediante recompensas digitales.'
  //   },
  // },
  // {
  //   id: 'deepeye',
  //   title: 'Deep Eye',
  //   description: 'Plataforma para pacientes y expertos en salud mental con herramientas IA avanzadas de seguimiento.',
  //   image: '/DeepEye2.jpg',
  //   phase: 'En desarrollo',
  //   blogContent: {
  //     introduction: 'Deep Eye proporciona herramientas avanzadas para el seguimiento de la salud mental.',
  //     objectives: [
  //       'Monitorear y analizar la salud mental de los pacientes a lo largo del tiempo.',
  //       'Proveer herramientas de análisis para ayudar a los profesionales a tomar decisiones informadas.'
  //     ],
  //     problemsSolved: [
  //       'Dificultad para realizar seguimiento de síntomas mentales de manera continua.',
  //       'Falta de herramientas de análisis avanzadas para profesionales de la salud mental.'
  //     ],
  //     features: [
  //       'Monitoreo de síntomas de salud mental a lo largo del tiempo.',
  //       'Análisis basado en IA para detectar patrones de comportamiento.',
  //       'Interfaz amigable para pacientes y profesionales de la salud.'
  //     ],
  //     useCases: [
  //       'Los terapeutas pueden usar la plataforma para monitorizar el progreso de sus pacientes.',
  //       'Pacientes pueden realizar un seguimiento de sus síntomas y compartirlo con sus terapeutas.'
  //     ],
  //     technologies: ['Inteligencia Artificial', 'Salud Mental', 'Análisis de Datos'],
  //     team: [
  //       { name: 'Patricia Hernández', role: 'Psicóloga Clínica' },
  //       { name: 'Carlos Moreno', role: 'Ingeniero de IA' }
  //     ],
  //     expectedResults: [
  //       'Mejor comprensión de los patrones de salud mental de los pacientes.',
  //       'Mejoras en la precisión del tratamiento a través de un análisis de datos continuo.'
  //     ],
  //     additionalInfo: 'Deep Eye ayuda a los profesionales de la salud a ofrecer atención personalizada y proactiva a sus pacientes.'
  //   },
  // },