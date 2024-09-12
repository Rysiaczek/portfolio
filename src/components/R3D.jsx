import React from "react";
import { useGLTF } from "@react-three/drei";

export function Letter(props) {
  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + "/models/R3D.glb"
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.node_id5.geometry}
        material={materials["52"]}
        position={[0, -1, 0]}
        scale={0.5}
      />
    </group>
  );
}

useGLTF.preload(process.env.PUBLIC_URL + "/models/R3D.glb");
