
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  SMAAPreset,
} from "postprocessing";

// Styles for the hyperspeed effect
const HyperspeedStyles = () => (
  <style>
    {`
      .hyperspeed-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        overflow: hidden;
      }
      
      .hyperspeed-canvas {
        width: 100%;
        height: 100%;
      }
    `}
  </style>
);

// Simplified version of the hyperspeed effect for performance
const Hyperspeed: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let composer: EffectComposer;
    let clock: THREE.Clock;
    let stars: THREE.Points;
    let disposed = false;
    
    // Initialize the scene
    const init = () => {
      // Create scene
      scene = new THREE.Scene();
      
      // Create camera
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 1;
      
      // Create renderer
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current?.appendChild(renderer.domElement);
      
      // Create stars
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 10000;
      const positions = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      
      for (let i = 0; i < starCount; i++) {
        // Position
        positions[i * 3] = (Math.random() - 0.5) * 100; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
        positions[i * 3 + 2] = Math.random() * -100; // z
        
        // Size
        sizes[i] = Math.random() * 1.5;
      }
      
      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Star material
      const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0.0 },
          uSize: { value: 15.0 },
          uColor: { value: new THREE.Color(0xffffff) }
        },
        vertexShader: `
          uniform float uTime;
          uniform float uSize;
          attribute float size;
          varying float vSize;
          
          void main() {
            vSize = size;
            vec3 pos = position;
            
            // Move stars toward the camera over time
            pos.z = mod(pos.z + uTime * 10.0, 100.0) - 100.0;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = uSize * size * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vSize;
          
          void main() {
            // Create circular points
            float strength = 1.0 - distance(gl_PointCoord, vec2(0.5));
            strength = step(0.5, strength);
            
            // Star color with size-based opacity
            gl_FragColor = vec4(uColor, strength * vSize);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      
      // Create star points
      stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      
      // Initialize post-processing
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      
      const bloomPass = new EffectPass(
        camera,
        new BloomEffect({
          luminanceThreshold: 0.2,
          luminanceSmoothing: 0.9,
          intensity: 1.5
        })
      );
      
      const smaaPass = new EffectPass(
        camera,
        new SMAAEffect({
          preset: SMAAPreset.MEDIUM
        })
      );
      
      renderPass.renderToScreen = false;
      bloomPass.renderToScreen = false;
      smaaPass.renderToScreen = true;
      
      composer.addPass(renderPass);
      composer.addPass(bloomPass);
      composer.addPass(smaaPass);
      
      // Initialize clock for animation
      clock = new THREE.Clock();
    };
    
    // Animation loop
    const animate = () => {
      if (disposed) return;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Update stars uniform
      if (stars.material instanceof THREE.ShaderMaterial) {
        stars.material.uniforms.uTime.value = elapsedTime;
      }
      
      // Render the scene
      composer.render();
      
      // Continue animation loop
      requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      // Update camera
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Update composer
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Initialize the scene
    init();
    
    // Start animation loop
    animate();
    
    // Add window resize event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up on unmount
    return () => {
      disposed = true;
      window.removeEventListener('resize', handleResize);
      
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
      composer.dispose();
      
      if (stars.geometry) stars.geometry.dispose();
      if (stars.material instanceof THREE.Material) stars.material.dispose();
    };
  }, []);

  return (
    <>
      <HyperspeedStyles />
      <div ref={containerRef} className="hyperspeed-container" />
    </>
  );
};

export default Hyperspeed;
