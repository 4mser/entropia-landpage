// 'use client';
// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls, DragControls } from 'three-stdlib';

// const SpaceTimeDistortion = () => {
//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const mount = mountRef.current;

//     // Scene, camera, and renderer setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0, 50, 150);

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mount?.appendChild(renderer.domElement);

//     // Orbit controls for camera interaction
//     const controls = new OrbitControls(camera, renderer.domElement);

//     // Create a 3D lattice (grid) using lines
//     const gridSize = 10;
//     const gridSpacing = 10;
//     const latticeGroup = new THREE.Group();
//     const initialPositionsMap = new Map<THREE.Line, Float32Array>();

//     const createLine = (start: THREE.Vector3, end: THREE.Vector3): THREE.Line => {
//       const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
//       const material = new THREE.LineBasicMaterial({ color: 0x00ffcc });
//       const line = new THREE.Line(geometry, material);
//       initialPositionsMap.set(line, new Float32Array(geometry.attributes.position.array));
//       return line;
//     };

//     for (let x = -gridSize / 2; x <= gridSize / 2; x++) {
//       for (let y = -gridSize / 2; y <= gridSize / 2; y++) {
//         for (let z = -gridSize / 2; z <= gridSize / 2; z++) {
//           const position = new THREE.Vector3(x * gridSpacing, y * gridSpacing, z * gridSpacing);

//           // Create lines connecting to adjacent points in x, y, and z directions
//           if (x < gridSize / 2) latticeGroup.add(createLine(position, new THREE.Vector3((x + 1) * gridSpacing, y * gridSpacing, z * gridSpacing)));
//           if (y < gridSize / 2) latticeGroup.add(createLine(position, new THREE.Vector3(x * gridSpacing, (y + 1) * gridSpacing, z * gridSpacing)));
//           if (z < gridSize / 2) latticeGroup.add(createLine(position, new THREE.Vector3(x * gridSpacing, y * gridSpacing, (z + 1) * gridSpacing)));
//         }
//       }
//     }

//     scene.add(latticeGroup);

//     // Sphere representing the mass at the center
//     const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
//     const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//     sphere.position.set(0, 0, 0);
//     scene.add(sphere);

//     // Function to update the lattice distortion using a radial gravitational field
//     const G = 6.67430e-11; // Gravitational constant
//     const mass = 5.972e24; // Mass of the Earth in kg
//     const c = 3e8; // Speed of light in m/s
//     const schwarzschildRadius = (2 * G * mass) / (c * c); // Schwarzschild radius
//     const maxDistortionRadius = gridSize * gridSpacing; // Maximum radius for distortion

//     function updateDistortion(spherePosition: THREE.Vector3) {
//       latticeGroup.children.forEach((line) => {
//         if (line instanceof THREE.Line) {
//           const geometry = line.geometry as THREE.BufferGeometry;
//           const originalPositions = initialPositionsMap.get(line);
//           if (!originalPositions) return;

//           const positions = geometry.attributes.position.array as Float32Array;

//           for (let i = 0; i < positions.length; i += 3) {
//             const originalPosition = new THREE.Vector3(
//               originalPositions[i],
//               originalPositions[i + 1],
//               originalPositions[i + 2]
//             );
//             const currentPoint = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
//             const distance = currentPoint.distanceTo(spherePosition);

//             // Reset position to its original state with elastic memory
//             positions[i] = originalPosition.x;
//             positions[i + 1] = originalPosition.y;
//             positions[i + 2] = originalPosition.z;

//             // Apply distortion only within a specific radius
//             if (distance < maxDistortionRadius) {
//               const distortion = -schwarzschildRadius / (2 * distance + 1); // Add 1 to avoid division by zero
//               const direction = currentPoint.clone().sub(spherePosition).normalize();
//               const distortedPosition = originalPosition.add(direction.multiplyScalar(distortion * 100)); // Scale for visualization

//               positions[i] = distortedPosition.x;
//               positions[i + 1] = distortedPosition.y;
//               positions[i + 2] = distortedPosition.z;
//             }
//           }
//           geometry.attributes.position.needsUpdate = true;
//         }
//       });
//     }

//     // Drag controls for moving the sphere
//     const dragControls = new DragControls([sphere], camera, renderer.domElement);
//     dragControls.addEventListener('dragstart', () => {
//       controls.enabled = false;
//     });
//     dragControls.addEventListener('dragend', () => {
//       controls.enabled = true;
//     });
//     dragControls.addEventListener('drag', () => {
//       updateDistortion(sphere.position);
//     });

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Cleanup function
//     return () => {
//       mount?.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} />;
// };

// export default SpaceTimeDistortion;
