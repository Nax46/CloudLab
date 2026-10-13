import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Layers,
  Sparkles,
  Info,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface Topic3DVisualizerProps {
  unitNumber: number;
  topicSlug: string;
  topicTitle: string;
}

interface SelectedNodeInfo {
  name: string;
  category: string;
  description: string;
  technicalDetails: string;
}

export const Topic3DVisualizer: React.FC<Topic3DVisualizerProps> = ({
  unitNumber,
  topicSlug,
  topicTitle,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeInfo | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [explodedView, setExplodedView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const interactiveObjectsRef = useRef<THREE.Mesh[]>([]);
  const explodedPartsRef = useRef<{ mesh: THREE.Object3D; originalY: number; explodedY: number }[]>([]);

  // Mouse / Touch interaction state
  const isDraggingRef = useRef(false);
  const previousPointerPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup (Clean Studio Light Environment)
    const width = container.clientWidth || 600;
    const height = isFullscreen ? window.innerHeight - 100 : 380;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf1f5f9); // Clean studio slate-100
    scene.fog = new THREE.FogExp2(0xf1f5f9, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup (Bright Natural Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const softFillLight = new THREE.PointLight(0x3b82f6, 1.2, 30);
    softFillLight.position.set(-6, 4, 4);
    scene.add(softFillLight);

    // 4. Ground Floor Grid (Engineering Blueprint Grid)
    const gridHelper = new THREE.GridHelper(30, 30, 0x2563eb, 0xcbd5e1);
    gridHelper.position.y = -3;
    scene.add(gridHelper);

    // 5. Main Model Group
    const mainGroup = new THREE.Group();
    groupRef.current = mainGroup;
    scene.add(mainGroup);

    interactiveObjectsRef.current = [];
    explodedPartsRef.current = [];

    const registerNode = (
      mesh: THREE.Mesh,
      info: SelectedNodeInfo,
      originalY: number,
      explodedOffset: number = 0
    ) => {
      mesh.userData = info;
      interactiveObjectsRef.current.push(mesh);
      explodedPartsRef.current.push({
        mesh,
        originalY,
        explodedY: originalY + explodedOffset,
      });
    };

    if (unitNumber === 2) {
      // SCENE: VIRTUALIZATION & HYPERVISOR ARCHITECTURE (Unit 2)
      // Layer 1: Bare-Metal Physical Server Chassis
      const hwGeo = new THREE.BoxGeometry(6, 0.6, 6);
      const hwMat = new THREE.MeshStandardMaterial({
        color: 0x334155, // Slate chassis
        metalness: 0.6,
        roughness: 0.3,
      });
      const hwMesh = new THREE.Mesh(hwGeo, hwMat);
      hwMesh.position.y = -2;
      mainGroup.add(hwMesh);
      registerNode(
        hwMesh,
        {
          name: 'Physical Host Server (Bare-Metal)',
          category: 'Hardware Layer',
          description: 'Physical server motherboard housing multi-core CPUs, ECC DDR5 RAM, and high-speed network interfaces.',
          technicalDetails: 'Hardware provides Intel VT-x or AMD-V virtualization extensions used by hypervisors to run virtual machines natively.',
        },
        -2,
        -1
      );

      // CPU and Memory Modules
      for (let i = -1.5; i <= 1.5; i += 3) {
        for (let j = -1.5; j <= 1.5; j += 3) {
          const chipGeo = new THREE.BoxGeometry(1.2, 0.2, 1.2);
          const chipMat = new THREE.MeshStandardMaterial({
            color: 0x2563eb,
            metalness: 0.7,
            roughness: 0.2,
          });
          const chip = new THREE.Mesh(chipGeo, chipMat);
          chip.position.set(i, -1.6, j);
          mainGroup.add(chip);
        }
      }

      // Layer 2: Hypervisor (VMM) Abstraction Layer
      const hypGeo = new THREE.BoxGeometry(6.2, 0.5, 6.2);
      const hypMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.8,
        roughness: 0.2,
        metalness: 0.4,
      });
      const hypMesh = new THREE.Mesh(hypGeo, hypMat);
      hypMesh.position.y = -0.8;
      mainGroup.add(hypMesh);
      registerNode(
        hypMesh,
        {
          name: 'Hypervisor / VMM Layer',
          category: 'Virtualization Engine',
          description: 'Type 1 (Bare-Metal, e.g. VMware ESXi, KVM) or Type 2 (Hosted, e.g. Oracle VirtualBox) hypervisor.',
          technicalDetails: 'Virtualizes physical hardware, schedules vCPUs, manages memory ballooning, and mediates I/O requests between VMs and silicon.',
        },
        -0.8,
        0
      );

      // Layer 3: Independent Virtual Machines (VM 1, VM 2, VM 3)
      const vmConfigs = [
        { x: -1.8, z: -1.2, color: 0x2563eb, name: 'VM 1 (Linux Web Server)', ram: '4GB vRAM', cpu: '2 vCPUs' },
        { x: 1.8, z: -1.2, color: 0x059669, name: 'VM 2 (MySQL Database)', ram: '8GB vRAM', cpu: '4 vCPUs' },
        { x: 0, z: 1.8, color: 0x7c3aed, name: 'VM 3 (Container Cluster Node)', ram: '16GB vRAM', cpu: '8 vCPUs' },
      ];

      vmConfigs.forEach((cfg) => {
        const vmGeo = new THREE.BoxGeometry(2, 1.8, 2);
        const vmMat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          roughness: 0.3,
          metalness: 0.4,
        });
        const vmMesh = new THREE.Mesh(vmGeo, vmMat);
        vmMesh.position.set(cfg.x, 1.2, cfg.z);
        mainGroup.add(vmMesh);

        // Clean white wireframe edge
        const wireGeo = new THREE.EdgesGeometry(vmGeo);
        const wireMat = new THREE.LineBasicMaterial({ color: 0xffffff });
        const wire = new THREE.LineSegments(wireGeo, wireMat);
        vmMesh.add(wire);

        registerNode(
          vmMesh,
          {
            name: cfg.name,
            category: 'Guest Virtual Machine',
            description: `Isolated guest OS instance with allocated ${cfg.cpu} and ${cfg.ram}. Runs its own operating system kernel.`,
            technicalDetails: 'Isolated through hardware-assisted memory management (EPT/NPT). Failure in this VM does not affect neighbor VMs.',
          },
          1.2,
          1.5
        );
      });
    } else if (unitNumber === 4) {
      // SCENE: CLOUD SECURITY & CIA TRIAD (Unit 4)
      const prismGeo = new THREE.TetrahedronGeometry(2.5, 0);
      const prismMat = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        roughness: 0.2,
        metalness: 0.6,
      });
      const prism = new THREE.Mesh(prismGeo, prismMat);
      prism.position.y = 0.5;
      mainGroup.add(prism);

      const shieldGeo = new THREE.SphereGeometry(3.6, 24, 24);
      const shieldMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const shield = new THREE.Mesh(shieldGeo, shieldMat);
      shield.position.y = 0.5;
      mainGroup.add(shield);

      registerNode(
        prism,
        {
          name: 'CIA Triad Security Core',
          category: 'Security Architecture',
          description: 'The three core principles of cloud information security: Confidentiality, Integrity, and Availability.',
          technicalDetails: 'Enforced via AES-256 encryption at rest, TLS 1.3 in transit, cryptographic hashing, and automated disaster recovery.',
        },
        0.5,
        0
      );

      registerNode(
        shield,
        {
          name: 'Perimeter Firewall & IAM Guard',
          category: 'Access Control Layer',
          description: 'Web Application Firewall (WAF) and Identity & Access Management (IAM) role policies enforcing Least Privilege.',
          technicalDetails: 'Filters OWASP Top 10 web vulnerabilities, validates MFA tokens, and mitigates volumetric DDoS attacks.',
        },
        0.5,
        0.5
      );
    } else if (unitNumber === 5) {
      // SCENE: CLOUD STORAGE ARCHITECTURES (Unit 5)
      // 1. Block Storage (Cylinder Disk Platter)
      const blockGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.8, 32);
      const blockMat = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        metalness: 0.6,
        roughness: 0.3,
      });
      const blockMesh = new THREE.Mesh(blockGeo, blockMat);
      blockMesh.position.set(-3, 0, 0);
      mainGroup.add(blockMesh);
      registerNode(
        blockMesh,
        {
          name: 'Block Storage (AWS EBS / Azure Managed Disk)',
          category: 'Low Latency Storage',
          description: 'Splits data into fixed raw blocks without metadata. Mounts directly to virtual machines as local drives.',
          technicalDetails: 'Highest IOPS and lowest latency. Ideal for databases (MySQL, Oracle) and OS boot volumes.',
        },
        0,
        -1
      );

      // 2. Object Storage (Bucket Storage)
      const objGeo = new THREE.SphereGeometry(1.4, 24, 24);
      const objMat = new THREE.MeshStandardMaterial({
        color: 0x059669,
        metalness: 0.4,
        roughness: 0.3,
      });
      const objMesh = new THREE.Mesh(objGeo, objMat);
      objMesh.position.set(0, 0, 0);
      mainGroup.add(objMesh);
      registerNode(
        objMesh,
        {
          name: 'Object Storage (AWS S3 / Google Cloud Storage)',
          category: 'Unstructured Scalable Storage',
          description: 'Stores data as distinct immutable objects composed of payload, metadata, and a unique key identifier.',
          technicalDetails: 'Accessed via HTTP REST APIs. Delivers 99.999999999% (11 9s) durability across multiple availability zones.',
        },
        0,
        0
      );

      // 3. File Storage (Network Shared Drive)
      const fileGeo = new THREE.BoxGeometry(2, 1.6, 2);
      const fileMat = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        metalness: 0.5,
        roughness: 0.3,
      });
      const fileMesh = new THREE.Mesh(fileGeo, fileMat);
      fileMesh.position.set(3, 0, 0);
      mainGroup.add(fileMesh);
      registerNode(
        fileMesh,
        {
          name: 'File Storage (NFS / AWS EFS)',
          category: 'Shared Hierarchical Storage',
          description: 'Organizes data into a hierarchical folder and file tree. Supports simultaneous shared access across multiple servers.',
          technicalDetails: 'Mounted over network using POSIX-compliant Network File System (NFS) or Server Message Block (SMB) protocols.',
        },
        0,
        1
      );
    } else {
      // SCENE: GLOBAL CLOUD INFRASTRUCTURE (Units 1, 3, 6)
      const coreGeo = new THREE.IcosahedronGeometry(2, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        wireframe: true,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      mainGroup.add(coreMesh);
      registerNode(
        coreMesh,
        {
          name: 'Global Cloud Control Plane',
          category: 'Infrastructure Orchestration',
          description: 'Central orchestrator managing multi-tenant compute, microservice deployments, and on-demand elasticity.',
          technicalDetails: 'Coordinates API endpoints, software-defined networking, and autoscaling across global regions.',
        },
        0,
        0
      );

      const towerCount = 4;
      for (let i = 0; i < towerCount; i++) {
        const angle = (i / towerCount) * Math.PI * 2;
        const x = Math.cos(angle) * 4.2;
        const z = Math.sin(angle) * 4.2;

        const towerGeo = new THREE.BoxGeometry(0.8, 2.4, 0.8);
        const towerMat = new THREE.MeshStandardMaterial({
          color: 0x0284c7,
          metalness: 0.6,
          roughness: 0.3,
        });
        const tower = new THREE.Mesh(towerGeo, towerMat);
        tower.position.set(x, 0, z);
        mainGroup.add(tower);

        const lineMat = new THREE.LineBasicMaterial({ color: 0x94a3b8 });
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(x, 0, z),
        ]);
        const line = new THREE.Line(lineGeo, lineMat);
        mainGroup.add(line);

        registerNode(
          tower,
          {
            name: `Availability Zone ${String.fromCharCode(65 + i)}`,
            category: 'Data Center Facility',
            description: 'Independent physical data center with redundant power, cooling, and low-latency fiber links.',
            technicalDetails: 'Connected via private sub-millisecond fiber rings for synchronous data replication.',
          },
          0,
          i * 0.4
        );
      }
    }

    // 6. Click Interaction with Raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(interactiveObjectsRef.current, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit.userData && hit.userData.name) {
          setSelectedNode(hit.userData as SelectedNodeInfo);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // 7. Mouse / Touch Drag Orbit Controls
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerPositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !mainGroup) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousPointerPositionRef.current.x;
      const deltaY = clientY - previousPointerPositionRef.current.y;

      mainGroup.rotation.y += deltaX * 0.008;
      mainGroup.rotation.x += deltaY * 0.008;

      previousPointerPositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isAutoRotating && !isDraggingRef.current && mainGroup) {
        mainGroup.rotation.y += delta * 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = isFullscreen ? window.innerHeight - 100 : 380;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('click', handleCanvasClick);
      domElement.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [unitNumber, topicSlug, isAutoRotating, isFullscreen]);

  // Handle Exploded View animation toggle
  useEffect(() => {
    explodedPartsRef.current.forEach(({ mesh, originalY, explodedY }) => {
      mesh.position.y = explodedView ? explodedY : originalY;
    });
  }, [explodedView]);

  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const factor = direction === 'in' ? 0.8 : 1.25;
    cameraRef.current.position.multiplyScalar(factor);
  };

  const handleReset = () => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 5, 12);
      cameraRef.current.lookAt(0, 0, 0);
    }
    setExplodedView(false);
    setSelectedNode(null);
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 flex flex-col' : 'my-6'
      }`}
    >
      {/* 3D Visualizer Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-slate-200 text-slate-800 z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-900">
                Interactive 3D Architectural Visualizer
              </span>
              <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200">
                Unit {unitNumber}
              </span>
            </div>
            <h4 className="text-xs text-slate-500 font-medium truncate max-w-sm">
              {topicTitle}
            </h4>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center space-x-1.5 pt-2 sm:pt-0">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isAutoRotating
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title="Toggle 360 Auto-Rotation"
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Rotate</span>
          </button>

          <button
            onClick={() => setExplodedView(!explodedView)}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
              explodedView
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title="Exploded View (Separates architectural layers)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exploded View</span>
          </button>

          <button
            onClick={() => handleZoom('in')}
            className="p-1.5 rounded-lg bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleZoom('out')}
            className="p-1.5 rounded-lg bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="w-full relative flex-1 cursor-grab active:cursor-grabbing select-none"
        style={{ minHeight: isFullscreen ? 'calc(100vh - 160px)' : '380px' }}
      />

      {/* Floating Instructions Banner */}
      <div className="absolute bottom-3 left-4 text-[11px] text-slate-600 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-300 shadow-2xs pointer-events-none flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
        <span>Drag to rotate 360° • Click any 3D component to inspect architecture</span>
      </div>

      {/* Node Inspection Tooltip Modal */}
      {selectedNode && (
        <div className="absolute top-16 right-4 max-w-sm w-full bg-white/95 backdrop-blur-md border border-slate-300 rounded-2xl p-4 shadow-xl space-y-2 z-20 animate-fade-in text-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {selectedNode.category}
            </span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-slate-400 hover:text-slate-800 p-1 rounded hover:bg-slate-100"
            >
              ✕
            </button>
          </div>

          <h5 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
            <Info className="w-4 h-4 text-blue-600" />
            <span>{selectedNode.name}</span>
          </h5>

          <p className="text-xs text-slate-600 leading-relaxed">
            {selectedNode.description}
          </p>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
            <span className="font-bold text-blue-700 block mb-0.5">Syllabus Exam Note:</span>
            {selectedNode.technicalDetails}
          </div>
        </div>
      )}
    </div>
  );
};
