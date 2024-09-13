import "./css/header.css";
import { useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Model } from "./Modell";
import { motion } from "framer-motion";

function AnimatedCamera(props) {
  const [currentZ, setCurrentZ] = useState(8);

  const { targetZ, setTargetZ } = props;

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const newZ = 8 - (window.scrollY / maxScroll) * 12;
      setTargetZ(Math.max(0, Math.min(8, newZ)));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setTargetZ]);

  useFrame(() => {
    setCurrentZ((prevZ) => prevZ + (targetZ - prevZ) * 0.1);
  });
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

function Header() {
  const [targetZ, setTargetZ] = useState(8);
  const [scaleValue, setScaleValue] = useState(0);

  useEffect(() => {
    if (targetZ <= 3) {
      setScaleValue(Math.max(0, 1 - targetZ / 3.5));
    } else if (targetZ > 3) {
      setScaleValue(0);
    }
  }, [targetZ]);

  const transition = useMemo(() => {
    return {
      duration: scaleValue < 0.5 ? 0.2 : 0.4,
      ease: scaleValue < 0.5 ? "easeIn" : "easeOut",
    };
  }, [scaleValue]);

  return (
    <section className="header">
      <div
        className="canavas"
        style={targetZ === 0 ? { display: "none" } : { display: "block" }}>
        <Canvas>
          <ambientLight intensity={1} />
          <MouseFollowerModel />
          <directionalLight color="white" position={[0, 0, 5]} intensity={2} />
          <pointLight position={[-2, 0, 2]} intensity={10} />
          <pointLight position={[2, -0.4, 1]} intensity={10} />
          <AnimatedCamera targetZ={targetZ} setTargetZ={setTargetZ} />
        </Canvas>
      </div>

      <div className="last-scene">
        <motion.div
          className="scene-element"
          style={{ transform: "scale(0)" }}
          initial={{ scale: 0 }}
          animate={{ scale: scaleValue }}
          transition={transition}></motion.div>
      </div>
    </section>
  );
}

export default Header;
