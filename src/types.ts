export interface GlobeSection {
  id: string;
  lat: number;
  lon: number;
  text: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface GlobeConfig {
  radius: number;
  segments: number;
  color: number;
  opacity: number;
}
