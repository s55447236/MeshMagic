
export interface ColorPoint {
  id: string;
  color: string;
  x: number; // 0-100
  y: number; // 0-100
  size: number; // 20-100
  rx?: number; // 椭圆横向半径比例 (0.5 - 2.0)
  ry?: number; // 椭圆纵向半径比例 (0.5 - 2.0)
}

export interface GradientState {
  points: ColorPoint[];
  backgroundColor: string;
  blur: number; // 0-100
  flowSpeed: number; // 0.1 - 2.0
  flowRange: number; // 0 - 50
}

export interface Preset {
  name: string;
  config: GradientState;
}
