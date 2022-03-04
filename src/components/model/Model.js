import React, { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three'
export function Model({
  children,
  modelPath,
  positionY,
  positionX,
  positionZ,
  ref,
  scale,
  ...props
}) {
  const gltf = useLoader(GLTFLoader, modelPath);
  const { viewport,camera,mouse } = useThree();
  const sceneRef = useRef();
  const vec = new THREE.Vector3()
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    sceneRef.current.rotation.y = time / 75;
    camera.position.lerp(vec.set(mouse.x / 2, mouse.y * 2, 3.5), 0.02);
    camera.rotation.x=sceneRef.current.rotation.x * 2 - 0.3
    //camera.rotation.z=sceneRef.current.rotation.z * 2 - 0.8
    //camera.
    
  });

  return (
    <group
      position={[positionX, positionY, positionZ]}
      scale={viewport.width / scale}
      ref={sceneRef}
      {...props}
    >
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 1, 1]} />
      <spotLight intensity={0.2} position={(5, 1, 1)} />
      <mesh>
        <primitive object={gltf.scene} dispose={null} />
      </mesh>
    </group>
  );
}
