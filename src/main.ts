import * as THREE from 'three';
import { InteractiveGlobe } from './InteractiveGlobe';
import './styles.css';

// Main entry point for the interactive globe application
// This file initializes the globe when the DOM is loaded

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the interactive globe
  // 
  // Control options:
  // - new InteractiveGlobe() or new InteractiveGlobe(false) - Uses custom controls (rotates globe)
  // - new InteractiveGlobe(true) - Uses OrbitControls (rotates camera)
  try {
    new InteractiveGlobe(true); // Change to new InteractiveGlobe(true) to use OrbitControls
  } catch (error) {
    // Silently handle initialization errors
  }
});
