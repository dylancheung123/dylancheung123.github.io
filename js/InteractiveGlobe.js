class InteractiveGlobe {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('globe-canvas'),
            antialias: true,
            alpha: true
        });
        
        this.globe = null;
        this.textPoints = [];
        this.isDragging = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.rotationX = 0;
        this.rotationY = 0;
        this.activeSection = 'welcome';
        
        this.init();
    }
    
    init() {
        this.setupRenderer();
        this.createGlobe();
        this.createTextPoints();
        this.setupLighting();
        this.setupEventListeners();
        this.animate();
    }
    
    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.camera.position.z = 4;
    }
    
    createGlobe() {
        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        
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
    
    createTextPoints() {
        const sections = [
            { id: 'about', lat: 0, lon: 0, text: 'About' },
            { id: 'projects', lat: 30, lon: 90, text: 'Projects' },
            { id: 'skills', lat: -30, lon: 180, text: 'Skills' },
            { id: 'contact', lat: 0, lon: -90, text: 'Contact' }
        ];
        
        sections.forEach(section => {
            const position = this.latLonToVector3(section.lat, section.lon, 1.5);
            
            const markerGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const markerMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xffffff,
                emissive: 0x444444
            });
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.copy(position);
            marker.userData = { sectionId: section.id };
            
            this.createTextOnSphere(section.text, position, section.id);
            
            this.globe.add(marker);
            this.textPoints.push(marker);
        });
    }
    
    createTextOnSphere(text, position, sectionId) {
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
        
        this.globe.add(textMesh);
    }
    
    latLonToVector3(lat, lon, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        
        return new THREE.Vector3(
            -(radius * Math.sin(phi) * Math.cos(theta)),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }
    
    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }
    
    setupEventListeners() {
        const canvas = this.renderer.domElement;
        
        canvas.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.endDrag.bind(this));
        
        canvas.addEventListener('touchstart', this.startDrag.bind(this));
        document.addEventListener('touchmove', this.drag.bind(this));
        document.addEventListener('touchend', this.endDrag.bind(this));
        
        canvas.addEventListener('click', this.onClick.bind(this));
        
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    
    startDrag(e) {
        this.isDragging = true;
        document.body.classList.add('dragging');
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        this.mouseX = clientX;
        this.mouseY = clientY;
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const deltaX = clientX - this.mouseX;
        const deltaY = clientY - this.mouseY;
        
        this.rotationY += deltaX * 0.01;
        this.rotationX -= deltaY * 0.01;
        
        this.rotationX = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.rotationX));
        
        this.mouseX = clientX;
        this.mouseY = clientY;
        
        this.updateRotation();
    }
    
    endDrag() {
        this.isDragging = false;
        document.body.classList.remove('dragging');
    }
    
    onClick(e) {
        if (this.isDragging) return;
        
        const mouse = new THREE.Vector2();
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        
        const intersects = raycaster.intersectObjects(this.textPoints);
        
        if (intersects.length > 0) {
            const clickedPoint = intersects[0].object;
            const sectionId = clickedPoint.userData.sectionId;
            this.showSection(sectionId);
        }
    }
    
    showSection(sectionId) {
        document.querySelectorAll('.content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = document.getElementById(sectionId);
        if (targetContent) {
            targetContent.classList.add('active');
            this.activeSection = sectionId;
        }
    }
    
    updateRotation() {
        this.globe.rotation.x = this.rotationX;
        this.globe.rotation.y = this.rotationY;
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Automatic rotation disabled - globe only rotates when user drags
        // if (!this.isDragging) {
        //     this.globe.rotation.y += 0.005;
        // }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Make InteractiveGlobe available globally
window.InteractiveGlobe = InteractiveGlobe;
