import * as THREE from 'three';
import { InteractiveGlobe } from './InteractiveGlobe';
import './styles.css';

// Main entry point for the interactive globe application
// This file initializes the globe when the DOM is loaded

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the interactive globe
  try {
    new InteractiveGlobe();
  } catch (error) {
    // Silently handle initialization errors
  }
});
