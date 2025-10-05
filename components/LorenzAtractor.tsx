// 'use client';
// import dynamic from 'next/dynamic';
// import { useEffect } from 'react';

// const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), { ssr: false });

// const LorentzAttractorSimulation = () => {
//   useEffect(() => {
//     import('p5');
//   }, []);

//   let points: { x: number; y: number; z: number }[] = [];
//   let x = 0.01;
//   let y = 0;
//   let z = 0;
//   const dt = 0.01;
//   const speedMultiplier = 5; // Increase this value to speed up the drawing

//   const setup = (p5: any, canvasParentRef: Element) => {
//     p5.createCanvas(800, 600, p5.WEBGL).parent(canvasParentRef);
//     p5.frameRate(30);
//   };

//   const draw = (p5: any) => {
//     p5.background(0);
//     p5.orbitControl();

//     // Lorentz attractor parameters
//     const sigma = 10;
//     const rho = 28;
//     const beta = 8 / 3;

//     p5.stroke(255);
//     p5.noFill();
//     p5.beginShape();

//     // Add the current point to the points array
//     for (let step = 0; step < speedMultiplier; step++) {
//       points.push({ x, y, z });

//       // Lorentz equations
//       let dx = sigma * (y - x) * dt;
//       let dy = (x * (rho - z) - y) * dt;
//       let dz = (x * y - beta * z) * dt;

//       x += dx;
//       y += dy;
//       z += dz;
//     }

//     // Draw the points
//     for (let i = 0; i < points.length; i++) {
//       const point = points[i];
//       p5.vertex(point.x * 5, point.y * 5, point.z * 5);
//     }

//     p5.endShape();

//     // Limit the number of points stored to prevent performance issues
//     if (points.length > 10000) {
//       points.shift();
//     }
//   };

//   return <Sketch setup={setup} draw={draw} />;
// };

// export default LorentzAttractorSimulation;