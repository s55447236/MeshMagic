
import { GradientState, Preset } from './types';

export const INITIAL_STATE: GradientState = {
  backgroundColor: '#00001a',
  blur: 31,
  flowSpeed: 1.5,
  flowRange: 100,
  points: [
    { id: 'aa1', color: '#00ffd2', x: 30, y: 20, size: 70, rx: 1.8, ry: 1.8 },
    { id: 'aa2', color: '#3300ff', x: 70, y: 80, size: 30, rx: 1.4, ry: 1.9 },
    { id: 'aa3', color: '#ffffff', x: 10, y: 10, size: 40, rx: 1.1, ry: 1.5 },
    { id: 'aa4', color: '#0066ff', x: 90, y: 10, size: 60, rx: 0.8, ry: 2.4 },
  ]
};

export const PRESETS: Preset[] = [
  {
    name: "01_Neon_Vortex",
    config: {
      backgroundColor: "#020617",
      blur: 52,
      flowSpeed: 1.8,
      flowRange: 38,
      points: [
        { id: 'nv1', color: '#F472B6', x: 25, y: 25, size: 55, rx: 1.1, ry: 1.8 },
        { id: 'nv2', color: '#22D3EE', x: 75, y: 30, size: 40, rx: 0.7, ry: 1.9 },
        { id: 'nv3', color: '#9333EA', x: 40, y: 70, size: 100, rx: 1.3, ry: 1.7 },
        { id: 'nv4', color: '#A5B4FC', x: 80, y: 75, size: 30, rx: 1.5, ry: 1.6 },
      ]
    }
  },
  {
    name: "02_Cyber_Acid",
    config: {
      backgroundColor: "#001a00",
      blur: 85,
      flowSpeed: 1.5,
      flowRange: 25,
      points: [
        { id: 'ca1', color: '#ccff00', x: 10, y: 10, size: 80, rx: 1.8, ry: 0.5 },
        { id: 'ca2', color: '#0066ff', x: 90, y: 20, size: 110, rx: 0.7, ry: 2.0 },
        { id: 'ca3', color: '#ff00ff', x: 40, y: 80, size: 50, rx: 1.5, ry: 1.5 },
        { id: 'ca4', color: '#000000', x: 80, y: 90, size: 90, rx: 1.0, ry: 1.0 },
      ]
    }
  },
  {
    name: "03_Solar_Flare",
    config: {
      backgroundColor: "#200000",
      blur: 65,
      flowSpeed: 1.5,
      flowRange: 20,
      points: [
        { id: 'sf1', color: '#ffcc00', x: 50, y: -10, size: 100, rx: 2.5, ry: 0.8 },
        { id: 'sf2', color: '#ff4400', x: 20, y: 60, size: 85, rx: 1.0, ry: 1.8 },
        { id: 'sf3', color: '#4400ff', x: 80, y: 90, size: 70, rx: 1.5, ry: 1.5 },
        { id: 'sf4', color: '#ffffff', x: 50, y: 40, size: 45, rx: 1.0, ry: 1.0 },
      ]
    }
  },
  {
    name: "04_Deep_Ocean_Pulse",
    config: {
      backgroundColor: "#000000",
      blur: 100,
      flowSpeed: 2.5,
      flowRange: 35,
      points: [
        { id: 'do1', color: '#06b6d4', x: 20, y: 20, size: 60, rx: 0.5, ry: 2.1 },
        { id: 'do2', color: '#2563eb', x: 80, y: 20, size: 20, rx: 1.5, ry: 1.2 },
        { id: 'do3', color: '#9333ea', x: 30, y: 80, size: 40, rx: 1.2, ry: 1.8 },
        { id: 'do4', color: '#10b981', x: 70, y: 80, size: 80, rx: 1.3, ry: 1.9 },
      ]
    }
  },
  {
    name: "05_Iridescent_Silk",
    config: {
      backgroundColor: "#f5f5f5",
      blur: 110,
      flowSpeed: 1.5,
      flowRange: 40,
      points: [
        { id: 'is1', color: '#ffafbd', x: 10, y: 30, size: 90, rx: 2.0, ry: 0.6 },
        { id: 'is2', color: '#2193b0', x: 90, y: 15, size: 80, rx: 0.5, ry: 1.8 },
        { id: 'is3', color: '#ee9ca7', x: 30, y: 85, size: 100, rx: 1.5, ry: 1.0 },
        { id: 'is4', color: '#6dd5ed', x: 75, y: 75, size: 60, rx: 1.0, ry: 1.5 },
      ]
    }
  },
  {
    name: "06_Volcanic_Eruption",
    config: {
      backgroundColor: "#000000",
      blur: 55,
      flowSpeed: 1.5,
      flowRange: 15,
      points: [
        { id: 've1', color: '#EF4444', x: 35, y: 35, size: 20, rx: 1.3, ry: 1.4 },
        { id: 've2', color: '#FBBF24', x: 65, y: 35, size: 40, rx: 0.7, ry: 2.2 },
        { id: 've3', color: '#C4B5FD', x: 40, y: 65, size: 90, rx: 1.4, ry: 1.6 },
        { id: 've4', color: '#F87171', x: 70, y: 65, size: 40, rx: 1.2, ry: 1.5 },
      ]
    }
  },
  {
    name: "07_Toxic_Nebula",
    config: {
      backgroundColor: "#0a0a20",
      blur: 80,
      flowSpeed: 1.5,
      flowRange: 30,
      points: [
        { id: 'tn1', color: '#00ff00', x: -10, y: 50, size: 80, rx: 0.4, ry: 2.5 },
        { id: 'tn2', color: '#ff00ff', x: 110, y: 50, size: 80, rx: 0.4, ry: 2.5 },
        { id: 'tn3', color: '#00ffff', x: 50, y: 10, size: 100, rx: 2.0, ry: 0.8 },
        { id: 'tn4', color: '#ffffff', x: 50, y: 90, size: 30, rx: 1.0, ry: 1.0 },
      ]
    }
  },
  {
    name: "08_Royal_Gold",
    config: {
      backgroundColor: "#DD8D8D",
      blur: 10,
      flowSpeed: 2.1,
      flowRange: 38,
      points: [
        { id: 'rg1', color: '#FDE047', x: 40, y: 30, size: 40, rx: 1.3, ry: 2.1 },
        { id: 'rg2', color: '#991B1B', x: 70, y: 30, size: 40, rx: 1.9, ry: 1.5 },
        { id: 'rg3', color: '#6B21A8', x: 30, y: 70, size: 40, rx: 1.1, ry: 2.4 },
        { id: 'rg4', color: '#FDA4AF', x: 70, y: 70, size: 30, rx: 1.8, ry: 1.7 },
      ]
    }
  },
  {
    name: "09_Arctic_Aurora",
    config: {
      backgroundColor: "#00001a",
      blur: 31,
      flowSpeed: 1.5,
      flowRange: 100,
      points: [
        { id: 'aa1', color: '#00ffd2', x: 30, y: 20, size: 70, rx: 1.8, ry: 1.8 },
        { id: 'aa2', color: '#3300ff', x: 70, y: 80, size: 30, rx: 1.4, ry: 1.9 },
        { id: 'aa3', color: '#ffffff', x: 10, y: 10, size: 40, rx: 1.1, ry: 1.5 },
        { id: 'aa4', color: '#0066ff', x: 90, y: 10, size: 60, rx: 0.8, ry: 2.4 },
      ]
    }
  },
  {
    name: "10_Candy_Flow",
    config: {
      backgroundColor: "#fff0f5",
      blur: 85,
      flowSpeed: 1.5,
      flowRange: 25,
      points: [
        { id: 'cf1', color: '#ffb6c1', x: 20, y: 20, size: 100, rx: 1.8, ry: 1.2 },
        { id: 'cf2', color: '#87ceeb', x: 80, y: 30, size: 85, rx: 1.2, ry: 1.8 },
        { id: 'cf3', color: '#dda0dd', x: 40, y: 80, size: 70, rx: 2.0, ry: 0.7 },
        { id: 'cf4', color: '#ffff00', x: 75, y: 75, size: 45, rx: 1.5, ry: 1.5 },
      ]
    }
  }
];
