import React, { useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


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
  const { viewport } = useThree();
  const sceneRef = useRef();
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    sceneRef.current.rotation.y = time / 75;
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
