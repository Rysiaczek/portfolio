/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/models/Emodel.glb 
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function LetterE(props) {
  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + "/models/Emodel.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Text_1.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Text_2.geometry}
          material={materials["Material.002"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(process.env.PUBLIC_URL + "/models/Emodel.glb");
