import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { GradientTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Animated wave plane
function WavePlane() {
  const meshRef = useRef();
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(viewport.width * 2, viewport.height * 2, 128, 128);
    return geo;
  }, [viewport]);

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave1 = Math.sin(x * 0.5 + time * 0.8) * 0.3;
        const wave2 = Math.sin(y * 0.3 + time * 0.6) * 0.2;
        const wave3 = Math.sin((x + y) * 0.2 + time * 0.4) * 0.15;
        positions.setZ(i, wave1 + wave2 + wave3);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, -5]}>
      <meshStandardMaterial
        color="#1a5490"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

// Floating butterfly sprite
function FloatingButterfly({ position, size, speed, range, imageUrl }) {
  const meshRef = useRef();
  const initialPos = useRef(position);
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      // Move across the entire screen
      meshRef.current.position.x = initialPos.current[0] + Math.sin(time * speed * 0.5) * range.x;
      meshRef.current.position.y = initialPos.current[1] + Math.cos(time * speed * 0.7) * range.y;
      meshRef.current.position.z = initialPos.current[2] + Math.sin(time * speed * 0.3) * range.z;
      
      // Gentle rotation/wobble like flying
      meshRef.current.rotation.z = Math.sin(time * speed * 2) * 0.15;
      
      // Slight scale pulsing (wing flapping effect)
      const scale = size * (1 + Math.sin(time * speed * 4) * 0.1);
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <sprite ref={meshRef} position={position} scale={[size, size, 1]}>
      <spriteMaterial 
        map={texture} 
        transparent 
        opacity={0.9}
        depthWrite={false}
      />
    </sprite>
  );
}

// Floating ring
function FloatingRing({ position, color, size, rotationSpeed }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * delta;
      meshRef.current.rotation.y += rotationSpeed * 0.5 * delta;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, size * 0.1, 16, 64]} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// DNA-like helix structure
function HelixStructure() {
  const groupRef = useRef();
  
  const helixPoints = useMemo(() => {
    const points = [];
    const numPoints = 30;
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4;
      const y = (i / numPoints) * 6 - 3;
      // Two strands
      points.push({
        pos1: [Math.cos(t) * 1.5, y, Math.sin(t) * 1.5],
        pos2: [Math.cos(t + Math.PI) * 1.5, y, Math.sin(t + Math.PI) * 1.5],
        color: i % 2 === 0 ? '#ffd700' : '#1a5490'
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {helixPoints.map((point, index) => (
        <group key={index}>
          {/* First strand */}
          <mesh position={point.pos1}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={point.color}
              emissive={point.color}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Second strand */}
          <mesh position={point.pos2}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={point.color}
              emissive={point.color}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Connection bar */}
          {index % 3 === 0 && (
            <mesh position={[0, point.pos1[1], 0]}>
              <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
              <meshStandardMaterial
                color="#ffffff"
                transparent
                opacity={0.3}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// Animated gradient sphere
function GradientSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]} scale={2.5}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        wireframe
        transparent
        opacity={0.15}
      >
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={['#1a5490', '#ffd700', '#2e7d32']}
        />
      </meshStandardMaterial>
    </mesh>
  );
}

// Main 3D Scene
function Scene() {
  const { viewport } = useThree();
  
  // Butterflies with full screen coverage
  const butterflies = useMemo(() => [
    { position: [-12, 0, -2], size: 1.2, speed: 0.4, range: { x: 20, y: 8, z: 3 }, imageUrl: '/logo/butterfly3.png' },
    { position: [12, 2, -1], size: 1.0, speed: 0.35, range: { x: 18, y: 10, z: 4 }, imageUrl: '/logo/butterfly3.png' },
    { position: [0, -6, -3], size: 0.9, speed: 0.5, range: { x: 22, y: 6, z: 3 }, imageUrl: '/logo/butterfly3.png' },
    { position: [-8, 5, -2], size: 0.8, speed: 0.45, range: { x: 16, y: 12, z: 3 }, imageUrl: '/logo/butterfly3.png' },
    { position: [10, -4, -4], size: 1.1, speed: 0.3, range: { x: 24, y: 8, z: 4 }, imageUrl: '/logo/butterfly3.png' },
    { position: [-5, -8, -2], size: 0.85, speed: 0.55, range: { x: 18, y: 10, z: 3 }, imageUrl: '/logo/butterfly3.png' },
    { position: [0, 8, -3], size: 0.95, speed: 0.4, range: { x: 20, y: 6, z: 3 }, imageUrl: '/logo/butterfly3.png' },
    { position: [-15, -2, -3], size: 0.75, speed: 0.5, range: { x: 25, y: 8, z: 4 }, imageUrl: '/logo/butterfly3.png' },
    { position: [8, 6, -2], size: 1.0, speed: 0.38, range: { x: 22, y: 10, z: 3 }, imageUrl: '/logo/butterfly3.png' },
    { position: [-10, -5, -3], size: 0.9, speed: 0.42, range: { x: 20, y: 8, z: 4 }, imageUrl: '/logo/butterfly3.png' },
  ], []);

  const rings = useMemo(() => [
    { position: [-5, 1.5, -4], color: '#1a5490', size: 0.6, rotationSpeed: 1 },
    { position: [5, -1, -3], color: '#ffd700', size: 0.5, rotationSpeed: 1.3 },
    { position: [0, 2, -5], color: '#2e7d32', size: 0.7, rotationSpeed: 0.8 },
  ], []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-5, 5, 0]} intensity={0.8} color="#1a5490" />
      <pointLight position={[5, -5, 0]} intensity={0.5} color="#ffd700" />
      
      {/* Background stars */}
      <Stars radius={50} depth={50} count={1000} factor={3} saturation={0} fade speed={0.5} />
      
      {/* Wave plane background */}
      <WavePlane />
      
      {/* Central gradient sphere */}
      <GradientSphere />
      
      {/* DNA Helix */}
      <HelixStructure />
      
      {/* Floating butterflies */}
      {butterflies.map((butterfly, index) => (
        <FloatingButterfly key={`butterfly-${index}`} {...butterfly} />
      ))}
      
      {/* Floating rings */}
      {rings.map((ring, index) => (
        <FloatingRing key={`ring-${index}`} {...ring} />
      ))}
    </>
  );
}

// Main component
const StatsBackground3D = () => {
  return (
    <div className="stats-3d-background">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default StatsBackground3D;
