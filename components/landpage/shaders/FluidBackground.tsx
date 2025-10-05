import { useEffect, useRef } from "react";
import * as THREE from 'three'
// Componente para el fondo animado
export const FluidBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
  
    useEffect(() => {
      let frameId: number;
      let renderer: THREE.WebGLRenderer;
      let scene: THREE.Scene;
      let camera: THREE.Camera;
      let material: THREE.ShaderMaterial;
      let plane: THREE.Mesh;
  
      const initThree = () => {
        if (!canvasRef.current) return;
  
        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
          alpha: true,
        });
  
        renderer.setSize(window.innerWidth, window.innerHeight);
  
        scene = new THREE.Scene();
  
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 1;
  
        const uniforms = {
          u_time: { value: 0.0 },
          u_mouse: { value: new THREE.Vector2(0.0, 0.0) },
          u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        };
  
        material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
        });
  
        const geometry = new THREE.PlaneGeometry(2, 2);
  
        plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
      };
  
      const animate = () => {
        material.uniforms.u_time.value += 0.05;
        material.uniforms.u_mouse.value.lerp(new THREE.Vector2(mouse.current.x, mouse.current.y), 0.05);
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
  
      const handleMouseMove = (e: MouseEvent) => {
        mouse.current.x = e.clientX / window.innerWidth;
        mouse.current.y = 1 - e.clientY / window.innerHeight;
      };
  
      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
      };
  
      initThree();
      animate();
  
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
  
      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        material.dispose();
        plane.geometry.dispose();
      };
    }, []);
  
    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />;
  };
  
  // Shader de vértices
export const vertexShader = `
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
  `;
  
  // Shader de fragmentos
export const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  
  void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
  
    float dx = st.x - u_mouse.x;
    float dy = st.y - u_mouse.y;
    float dist = sqrt(dx*dx + dy*dy);
    float ripple = sin(dist * 10.0 - u_time * 0.5);
  
    color = vec3(0.1, 0.0, 0.2) + ripple * 0.3;
  
    gl_FragColor = vec4(color, 1.0);
  }
  `;