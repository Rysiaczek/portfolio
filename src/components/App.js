import "./css/App.css";
import { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Model } from "./Modell";

function AnimatedCamera() {
  const [targetZ, setTargetZ] = useState(8);
  const [currentZ, setCurrentZ] = useState(8);

  useEffect(() => {
    const handleScroll = (event) => {
      setTargetZ((prevZ) => {
        const newZ = prevZ + event.deltaY * 0.003;
        return Math.max(0, Math.min(8, newZ));
      });
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  useFrame(() => {
    setCurrentZ((prevZ) => prevZ + (targetZ - prevZ) * 0.1);
  });
  console.log("currentZ", currentZ);
  if (currentZ <= 10 && currentZ >= 0) {
    return <PerspectiveCamera makeDefault position={[0.1, 0.08, currentZ]} />;
  }
}

function MouseFollowerModel() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    // Zakładamy, że model to drugi element w scenie
    console.log(state.scene.children);
    state.scene.children[1].rotation.x = -mousePosition.y * 0.1;
    state.scene.children[1].rotation.y = mousePosition.x * 0.2;
  });

  return (
    <Model
      position={[0, -1.3, 2]}
      scale={[0.8, 0.8, 0.8]}
      rotation={[0, 0, 0]}
    />
  );
}

function App() {
  return (
    <div className="app">
      <Canvas>
        <ambientLight intensity={1} />
        <MouseFollowerModel />
        <directionalLight color="white" position={[0, 0, 5]} intensity={2} />
        <pointLight position={[-2, 0, 2]} intensity={10} />
        <pointLight position={[2, -0.4, 1]} intensity={10} />
        <AnimatedCamera />
      </Canvas>
    </div>
  );
}

export default App;
