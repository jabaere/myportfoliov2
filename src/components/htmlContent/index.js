import React, { useRef } from "react";
import { Html } from "@react-three/drei";

const HtmlContent = ({ className, style, children, portal,scale }) => {
  // /position={new THREE.Vector3(-2.5, -1, 2)}

  const htmlRef = useRef();

  return (
    <Html ref={htmlRef} className="content" distanceFactor={5} portal={portal} scale={scale}>
      {children}
    </Html>
  );
};

export default HtmlContent;
