import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GlobeSection } from './types';

export class InteractiveGlobe {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private globe: THREE.Mesh | null = null;
  private textPoints: THREE.Mesh[] = [];
  private isDragging: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private rotationX: number = 0;
  private rotationY: number = 0;
  private globeQuaternion: THREE.Quaternion = new THREE.Quaternion();
  private activeSection: string = 'welcome';
  private dragStartPoint: THREE.Vector3 | null = null;
  private dragCurrentPoint: THREE.Vector3 | null = null;
  private isTwoFingerGesture: boolean = false;
  private lastTouchDistance: number = 0;
  private lastTouchCenter: { x: number; y: number } = { x: 0, y: 0 };
  
  // ========================================
  // THREE.JS ORBITCONTROLS (Alternative approach)
  // ========================================
  // OrbitControls is Three.js's built-in camera control system
  // OrbitControls rotates the CAMERA around the scene,
  // while custom controls rotate the GLOBE object itself.
  private orbitControls: OrbitControls | null = null;
  private useOrbitControls: boolean = false;

  constructor(useOrbitControls: boolean = false) {
    this.useOrbitControls = useOrbitControls;
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: document.getElementById('globe-canvas') as HTMLCanvasElement,
      antialias: true,
      alpha: true
    });
    
    this.init();
  }
  
  private init(): void {
    this.setupRenderer();
    this.createGlobe();
    this.createTextPoints();
    this.setupLighting();
    
    // Toggle between OrbitControls and custom controls based on prop
    if (this.useOrbitControls) {
      this.setupOrbitControls();
    } else {
      this.setupEventListeners();
    }
    
    this.animate();
  }
  
  private setupRenderer(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.camera.position.z = 4;
  }
  
  private createGlobe(): void {
    const geometry = new THREE.SphereGeometry(2.5, 32, 32);
    
    const material = new THREE.MeshPhongMaterial({
      color: 0x667eea,
      transparent: true,
      opacity: 0.9,
      shininess: 100
    });
    
    this.globe = new THREE.Mesh(geometry, material);
    
    // Ensure globe starts with zero rotation
    this.globe.rotation.x = 0;
    this.globe.rotation.y = 0;
    this.globe.rotation.z = 0;
    
    this.scene.add(this.globe);
  }
  
  private createTextPoints(): void {
    const sections: GlobeSection[] = [
      { id: 'about', lat: 0, lon: 0, text: 'About' },
      { id: 'projects', lat: 30, lon: 90, text: 'Projects' },
      { id: 'skills', lat: -30, lon: 180, text: 'Skills' },
      { id: 'contact', lat: 0, lon: -90, text: 'Contact' }
    ];
    
    sections.forEach(section => {
      const position = this.latLonToVector3(section.lat, section.lon, 2.5);
      
      const markerGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const markerMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        emissive: 0x444444
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position);
      marker.userData = { sectionId: section.id };
      
      this.createTextOnSphere(section.text, position, section.id);
      
      if (this.globe) {
        this.globe.add(marker);
      }
      this.textPoints.push(marker);
    });
  }
  
  private createTextOnSphere(text: string, position: THREE.Vector3, sectionId: string): void {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = 256;
    canvas.height = 64;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 24px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.1
    });
    
    const geometry = new THREE.PlaneGeometry(0.3, 0.1);
    const textMesh = new THREE.Mesh(geometry, material);
    
    textMesh.position.copy(position);
    textMesh.lookAt(0, 0, 0);
    
    if (this.globe) {
      this.globe.add(textMesh);
    }
  }
  
  private latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  private getSphereIntersectionPoint(mouseX: number, mouseY: number): THREE.Vector3 | null {
    if (!this.globe) return null;

    const mouse = new THREE.Vector2();
    mouse.x = (mouseX / window.innerWidth) * 2 - 1;
    mouse.y = -(mouseY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObject(this.globe);
    
    if (intersects.length > 0) {
      return intersects[0].point;
    }
    
    return null;
  }

  private getTouchDistance(touches: TouchList): number {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private getTouchCenter(touches: TouchList): { x: number; y: number } {
    if (touches.length === 0) return { x: 0, y: 0 };
    if (touches.length === 1) {
      return { x: touches[0].clientX, y: touches[0].clientY };
    }
    
    const x = (touches[0].clientX + touches[1].clientX) / 2;
    const y = (touches[0].clientY + touches[1].clientY) / 2;
    return { x, y };
  }
  
  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
  }
  
  // ========================================
  // ORBITCONTROLS SETUP (Three.js built-in)
  // ========================================
  // OrbitControls rotates the CAMERA around the scene,
  // while custom controls rotate the GLOBE object itself.
  // Use the constructor parameter `useOrbitControls: true` to enable this.
  private setupOrbitControls(): void {
    // Create OrbitControls attached to camera and renderer DOM element
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    
    // Enable damping for smooth momentum (optional but recommended)
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.05;
    
    // Configure zoom limits
    this.orbitControls.minDistance = 2;
    this.orbitControls.maxDistance = 10;
    
    // Optional: Set rotation limits
    // this.orbitControls.minPolarAngle = 0; // Prevent going below horizon
    // this.orbitControls.maxPolarAngle = Math.PI; // Prevent going above horizon
    
    // Optional: Enable auto-rotate
    // this.orbitControls.autoRotate = true;
    // this.orbitControls.autoRotateSpeed = 2.0;
    
    // Optional: Set target (what the camera orbits around)
    // this.orbitControls.target.set(0, 0, 0);
    
    // Optional: Disable panning (only allow rotation and zoom)
    // this.orbitControls.enablePan = false;
  }
  
  private setupEventListeners(): void {
    const canvas = this.renderer.domElement;
    
    // === CLICK AND GRAB EVENTS (Single finger/mouse) ===
    canvas.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.endDrag.bind(this));
    
    // === TOUCH EVENTS (Mobile/touch screens) ===
    canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    document.addEventListener('touchmove', this.handleTouchMove.bind(this));
    document.addEventListener('touchend', this.handleTouchEnd.bind(this));
    
    // === TRACKPAD GESTURES (macOS two-finger) ===
    canvas.addEventListener('wheel', this.handleWheel.bind(this));
    
    // === CLICK EVENTS (Section navigation) ===
    canvas.addEventListener('click', this.onClick.bind(this));
    
    // === WINDOW EVENTS ===
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }
  
  // ========================================
  // CLICK AND GRAB FUNCTIONALITY
  // ========================================
  
  private startDrag(e: MouseEvent | TouchEvent): void {
    const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
    
    // Get the intersection point on the sphere
    this.dragStartPoint = this.getSphereIntersectionPoint(clientX, clientY);
    
    if (this.dragStartPoint) {
      this.isDragging = true;
      document.body.classList.add('dragging');
      this.mouseX = clientX;
      this.mouseY = clientY;
    }
  }
  
  private drag(e: MouseEvent | TouchEvent): void {
    if (!this.isDragging || !this.dragStartPoint) return;
    
    e.preventDefault();
    
    const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
    const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
    
    // Get current intersection point on the sphere
    this.dragCurrentPoint = this.getSphereIntersectionPoint(clientX, clientY);
    
    if (this.dragCurrentPoint) {
      // Calculate the rotation needed to move the start point to the current point
      const startPoint = this.dragStartPoint.clone();
      const currentPoint = this.dragCurrentPoint.clone();
      
      // Calculate the axis of rotation (cross product of the two vectors)
      const rotationAxis = new THREE.Vector3().crossVectors(startPoint, currentPoint).normalize();
      
      // Calculate the angle between the vectors
      const angle = startPoint.angleTo(currentPoint);
      
      if (angle > 0.001) { // Only rotate if there's a significant angle
        // Apply the rotation to the globe
        const quaternion = new THREE.Quaternion().setFromAxisAngle(rotationAxis, angle);
        this.globe!.quaternion.multiplyQuaternions(quaternion, this.globe!.quaternion);
        
        // Update the start point for the next frame
        this.dragStartPoint = currentPoint;
      }
    }
  }
  
  private endDrag(): void {
    this.isDragging = false;
    document.body.classList.remove('dragging');
    this.dragStartPoint = null;
    this.dragCurrentPoint = null;
  }

  // ========================================
  // TOUCH GESTURE FUNCTIONALITY
  // ========================================
  
  private handleTouchStart(e: TouchEvent): void {
    e.preventDefault();
    
    if (e.touches.length === 1) {
      // Single finger - use sphere grabbing
      this.startDrag(e);
    } else if (e.touches.length === 2) {
      // Two fingers - start gesture mode
      this.isTwoFingerGesture = true;
      this.lastTouchDistance = this.getTouchDistance(e.touches);
      this.lastTouchCenter = this.getTouchCenter(e.touches);
    }
  }

  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    
    if (this.isTwoFingerGesture && e.touches.length === 2) {
      // Two-finger gesture
      const currentDistance = this.getTouchDistance(e.touches);
      const currentCenter = this.getTouchCenter(e.touches);
      
      // Handle pinch to zoom
      if (this.lastTouchDistance > 0) {
        const scale = currentDistance / this.lastTouchDistance;
        this.camera.position.z *= scale;
        this.camera.position.z = Math.max(2, Math.min(10, this.camera.position.z));
        this.camera.updateProjectionMatrix();
      }
      
      // Handle two-finger pan (rotate globe)
      const deltaX = currentCenter.x - this.lastTouchCenter.x;
      const deltaY = currentCenter.y - this.lastTouchCenter.y;
      
      // Increase sensitivity for two-finger gestures
      this.rotationY += deltaX * 0.02;
      this.rotationX += deltaY * 0.02;
      this.rotationX = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.rotationX));
      
      this.updateRotation();
      
      this.lastTouchDistance = currentDistance;
      this.lastTouchCenter = currentCenter;
    } else if (e.touches.length === 1 && this.isDragging) {
      // Single finger dragging
      this.drag(e);
    }
  }

  private handleTouchEnd(e: TouchEvent): void {
    if (e.touches.length === 0) {
      // All fingers lifted
      this.endDrag();
      this.isTwoFingerGesture = false;
      this.lastTouchDistance = 0;
    } else if (e.touches.length === 1 && this.isTwoFingerGesture) {
      // Switched from two fingers to one
      this.isTwoFingerGesture = false;
      this.startDrag(e);
    }
  }

  // ========================================
  // TRACKPAD GESTURE FUNCTIONALITY
  // ========================================
  
  private handleWheel(e: WheelEvent): void {
    e.preventDefault();
    
    // Handle macOS trackpad gestures
    if (e.ctrlKey) {
      // Pinch to zoom (Ctrl + wheel)
      const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
      this.camera.position.z *= zoomFactor;
      this.camera.position.z = Math.max(2, Math.min(10, this.camera.position.z));
      this.camera.updateProjectionMatrix();
    } else {
      // Two-finger pan (regular wheel) - use quaternion for unlimited rotation
      const deltaX = e.deltaX * 0.003;
      const deltaY = e.deltaY * 0.003;
      
      // Create rotation quaternions for X and Y axes
      const rotationX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -deltaY);
      const rotationY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -deltaX);
      
      // Combine rotations and apply to globe
      if (this.globe) {
        const combinedRotation = rotationY.multiply(rotationX);
        this.globe.quaternion.premultiply(combinedRotation);
      }
    }
  }
  
  // ========================================
  // SECTION NAVIGATION FUNCTIONALITY
  // ========================================
  
  private onClick(e: MouseEvent): void {
    if (this.isDragging) return;
    
    const mouse = new THREE.Vector2();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    
    const intersects = raycaster.intersectObjects(this.textPoints);
    
    if (intersects.length > 0) {
      const clickedPoint = intersects[0]?.object;
      if (clickedPoint) {
        const sectionId = clickedPoint.userData?.sectionId;
        if (sectionId) {
          this.showSection(sectionId);
        }
      }
    }
  }
  
  private showSection(sectionId: string): void {
    document.querySelectorAll('.content').forEach(content => {
      content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(sectionId);
    if (targetContent) {
      targetContent.classList.add('active');
      this.activeSection = sectionId;
    }
  }
  
  private updateRotation(): void {
    if (this.globe) {
      // Use quaternion for unlimited rotation without gimbal lock
      const euler = new THREE.Euler(this.rotationX, this.rotationY, 0, 'YXZ');
      this.globeQuaternion.setFromEuler(euler);
      this.globe.quaternion.copy(this.globeQuaternion);
    }
  }
  
  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  private animate(): void {
    requestAnimationFrame(() => this.animate());
    
    // Update OrbitControls if enabled (required for damping to work)
    if (this.orbitControls) {
      this.orbitControls.update();
    }
    
    // Automatic rotation disabled - globe only rotates when user drags
    // if (!this.isDragging) {
    //     this.globe.rotation.y += 0.005;
    // }
    
    this.renderer.render(this.scene, this.camera);
  }
}
