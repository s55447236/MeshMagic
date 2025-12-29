
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { GradientState } from '../types';

interface Props {
  config: GradientState;
  showPoints?: boolean;
  onPointMove?: (id: string, x: number, y: number) => void;
  activePointId?: string | null;
  setActivePointId?: (id: string | null) => void;
  isFlowing?: boolean;
}

const GradientCanvas: React.FC<Props> = ({ 
  config, 
  showPoints, 
  onPointMove, 
  activePointId,
  setActivePointId,
  isFlowing 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Animation Loop for Fluid Flow
  useEffect(() => {
    if (!isFlowing || draggingId) return;

    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      const updatedPoints = config.points.map((p, i) => {
        // Organic flow using layered harmonic functions
        const speedX = config.flowSpeed * (0.6 + (i * 0.1));
        const speedY = config.flowSpeed * (0.5 + (i * 0.05));
        
        const driftX = Math.sin(elapsed * speedX + i * 2) * config.flowRange;
        const driftY = Math.cos(elapsed * speedY + i * 1.5) * config.flowRange;
        
        // Fluid stretch breathing (morphing the ellipse aspect ratio)
        const rxBase = p.rx || 1.0;
        const ryBase = p.ry || 1.0;
        const morph = Math.sin(elapsed * config.flowSpeed * 0.4 + i) * 0.2;
        
        const currentRx = (rxBase + morph) * (p.size * 1.5);
        const currentRy = (ryBase - morph) * (p.size * 1.5);
        
        return {
          ...p,
          x: p.x + driftX,
          y: p.y + driftY,
          currentRx,
          currentRy
        };
      });

      if (backgroundRef.current) {
        // Create overlapping elliptical layers with blending
        // Using 'screen' blend mode for some layers to create the luminous "field" effect
        const radialGradients = updatedPoints.map(
          (p) => `radial-gradient(ellipse ${p.currentRx}% ${p.currentRy}% at ${p.x}% ${p.y}%, ${p.color}, transparent)`
        ).join(', ');
        
        backgroundRef.current.style.backgroundImage = radialGradients;
      }

      if (showPoints) {
        updatedPoints.forEach(p => {
          const el = pointRefs.current[p.id];
          if (el) {
            el.style.left = `${p.x}%`;
            el.style.top = `${p.y}%`;
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFlowing, config.points, config.flowSpeed, config.flowRange, showPoints, draggingId]);

  const initialBackgroundStyle = useMemo(() => {
    const radialGradients = config.points.map(
      (p) => `radial-gradient(ellipse ${(p.rx || 1.0) * p.size * 1.5}% ${(p.ry || 1.0) * p.size * 1.5}% at ${p.x}% ${p.y}%, ${p.color}, transparent)`
    ).join(', ');

    return {
      backgroundColor: config.backgroundColor,
      backgroundImage: radialGradients,
      filter: `blur(${config.blur}px) saturate(1.4)`, // Saturate to enhance the luminous feel
      transform: 'scale(1.25)', // Higher scale to prevent edge flicker
      mixBlendMode: 'normal' as any
    };
  }, [config.backgroundColor, config.blur, config.points]);

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (!onPointMove) return;
    e.preventDefault();
    setDraggingId(id);
    setActivePointId?.(id);
  };

  useEffect(() => {
    if (!draggingId || !onPointMove || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      onPointMove(draggingId, x, y);
    };

    const handleMouseUp = () => {
      setDraggingId(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'grabbing';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
    };
  }, [draggingId, onPointMove]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[#000008] select-none"
    >
      <div 
        ref={backgroundRef}
        className="absolute inset-0 transition-opacity duration-1000" 
        style={initialBackgroundStyle}
      />
      
      {/* Texture Layer - Add subtle noise for professional finish */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/p6.png")' }} />

      {showPoints && (
        <div className="absolute inset-0 z-10">
          {config.points.map((p) => {
            const isActive = p.id === activePointId || p.id === draggingId;
            return (
              <div
                key={p.id}
                // FIX: Ensure ref callback doesn't return the element to satisfy React's Ref type requirements
                ref={(el) => { pointRefs.current[p.id] = el; }}
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border border-white/20 transition-transform cursor-grab active:cursor-grabbing flex items-center justify-center group ${
                  isActive 
                    ? 'border-white scale-110 shadow-2xl bg-white/10' 
                    : 'bg-black/20 hover:border-white/50'
                } ${isFlowing && !draggingId ? 'transition-none' : 'duration-300'}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onMouseDown={(e) => handleMouseDown(e, p.id)}
              >
                <div 
                  className={`w-3 h-3 rounded-full shadow-lg transition-all ${isActive ? 'scale-150 ring-4 ring-white/30' : 'scale-100'}`}
                  style={{ backgroundColor: p.color }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GradientCanvas;
