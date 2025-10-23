// Main entry point for the interactive globe application
// This file initializes the globe when the DOM is loaded

document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') {
        return;
    }
    
    if (typeof InteractiveGlobe === 'undefined') {
        return;
    }
    
    // Initialize the interactive globe
    try {
        new InteractiveGlobe();
    } catch (error) {
        // Silently handle initialization errors
    }
});
