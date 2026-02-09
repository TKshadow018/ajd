import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Html } from '@react-three/drei';
import { useTranslation } from 'react-i18next';

// 3D Blackboard
function BlackboardMesh({ formData }) {
  const boardRef = useRef();
  const { t } = useTranslation();

  useFrame((state) => {
    if (boardRef.current) {
      // Gentle floating animation
      boardRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={boardRef} rotation={[0, 0.2, 0]}>
      {/* Wooden Frame - Top */}
      <RoundedBox args={[6.4, 0.3, 0.35]} radius={0.05} smoothness={4} position={[0, 2.15, 0]}>
        <meshStandardMaterial color="#5D3A1A" roughness={0.8} />
      </RoundedBox>
      {/* Wooden Frame - Bottom */}
      <RoundedBox args={[6.4, 0.3, 0.35]} radius={0.05} smoothness={4} position={[0, -2.15, 0]}>
        <meshStandardMaterial color="#5D3A1A" roughness={0.8} />
      </RoundedBox>
      {/* Wooden Frame - Left */}
      <RoundedBox args={[0.3, 4.6, 0.35]} radius={0.05} smoothness={4} position={[-3.2, 0, 0]}>
        <meshStandardMaterial color="#5D3A1A" roughness={0.8} />
      </RoundedBox>
      {/* Wooden Frame - Right */}
      <RoundedBox args={[0.3, 4.6, 0.35]} radius={0.05} smoothness={4} position={[3.2, 0, 0]}>
        <meshStandardMaterial color="#5D3A1A" roughness={0.8} />
      </RoundedBox>

      {/* Blackboard Surface */}
      <RoundedBox args={[6, 4, 0.15]} radius={0.02} smoothness={4} position={[0, 0, -0.1]}>
        <meshStandardMaterial
          color="#1a3d2e"
          roughness={0.9}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Chalk Tray */}
      <RoundedBox args={[5, 0.18, 0.5]} radius={0.03} smoothness={4} position={[0, -2.35, 0.25]}>
        <meshStandardMaterial color="#5D3A1A" roughness={0.8} />
      </RoundedBox>

      {/* Chalk pieces */}
      <mesh position={[-1.5, -2.28, 0.45]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[-1.0, -2.28, 0.42]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.05, 0.05, 0.35, 8]} />
        <meshStandardMaterial color="#ffd700" roughness={0.9} />
      </mesh>
      <mesh position={[1.2, -2.28, 0.43]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#ff6b6b" roughness={0.9} />
      </mesh>

      {/* HTML Content on Blackboard */}
      <Html
        transform
        position={[0, 0.1, 0.1]}
        scale={0.6}
        style={{
          width: '550px',
          pointerEvents: 'none',
        }}
      >
        <div className="blackboard-content" style={{
          fontFamily: "'Kalam', 'Patrick Hand', cursive, sans-serif",
          color: 'rgba(255, 255, 255, 0.95)',
          textShadow: '0 0 3px rgba(255, 255, 255, 0.4), 2px 2px 2px rgba(0, 0, 0, 0.6)',
          padding: '20px 30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            fontSize: '38px',
            fontWeight: 700,
            color: '#ffd700',
            textShadow: '0 0 6px rgba(255, 215, 0, 0.6), 2px 2px 3px rgba(0, 0, 0, 0.6)',
            marginBottom: '16px',
            letterSpacing: '3px',
            borderBottom: '3px dashed rgba(255, 255, 255, 0.5)',
            paddingBottom: '10px',
            width: '100%',
            textAlign: 'center',
          }}>
            সদস্যপদ তথ্য
          </div>
          
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid rgba(255, 255, 255, 0.8)',
            marginBottom: '14px',
            background: 'rgba(255, 255, 255, 0.15)',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3), inset 0 0 25px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {formData.photo ? (
              <img 
                src={URL.createObjectURL(formData.photo)} 
                alt="Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '48px', color: 'rgba(255, 255, 255, 0.6)' }}>👤</span>
            )}
          </div>

          <div style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '16px',
            textAlign: 'center',
            textShadow: '0 0 4px rgba(255, 255, 255, 0.5), 2px 2px 3px rgba(0, 0, 0, 0.6)',
            letterSpacing: '2px',
          }}>
            {formData.name || '[ নাম লিখুন ]'}
          </div>

          <div style={{ width: '100%', padding: '0 15px' }}>
            <div style={{ display: 'flex', marginBottom: '12px', fontSize: '24px', gap: '12px', alignItems: 'baseline' }}>
              <span style={{ color: '#90EE90', fontWeight: 600, textShadow: '0 0 4px rgba(144, 238, 144, 0.5)' }}>পেশা:</span>
              <span>{formData.profession || '.............'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '12px', fontSize: '24px', gap: '12px', alignItems: 'baseline' }}>
              <span style={{ color: '#90EE90', fontWeight: 600, textShadow: '0 0 4px rgba(144, 238, 144, 0.5)' }}>বয়স:</span>
              <span>{formData.age ? `${formData.age} বছর` : '.............'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '12px', fontSize: '24px', gap: '12px', alignItems: 'baseline' }}>
              <span style={{ color: '#90EE90', fontWeight: 600, textShadow: '0 0 4px rgba(144, 238, 144, 0.5)' }}>ফোন:</span>
              <span>{formData.phone || '.............'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '12px', fontSize: '22px', gap: '12px', alignItems: 'baseline' }}>
              <span style={{ color: '#90EE90', fontWeight: 600, textShadow: '0 0 4px rgba(144, 238, 144, 0.5)' }}>ইমেইল:</span>
              <span style={{ wordBreak: 'break-word' }}>{formData.email || '.............'}</span>
            </div>
          </div>

          {formData.youthWing && (
            <div style={{
              background: 'rgba(255, 215, 0, 0.25)',
              color: '#ffd700',
              fontSize: '22px',
              fontWeight: 600,
              padding: '12px 28px',
              borderRadius: '6px',
              marginTop: '14px',
              border: '3px dashed rgba(255, 215, 0, 0.6)',
              textShadow: '0 0 5px rgba(255, 215, 0, 0.5)',
            }}>
              ⭐ যুব শাখা সদস্য ⭐
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

// Main 3D Preview Component
const MemberCard3D = ({ formData }) => {
  return (
    <div className="member-card-3d-container">
      <Canvas
        camera={{ position: [1.5, 0.5, 6], fov: 50 }}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100%',
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, 5, 5]} intensity={0.4} color="#ffd700" />
          <pointLight position={[5, -5, 5]} intensity={0.3} color="#1a5490" />

          {/* Blackboard */}
          <BlackboardMesh formData={formData} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MemberCard3D;
