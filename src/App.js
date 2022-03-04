//model license
/*
Model Information:
* title:	tbp
* source:	https://sketchfab.com/3d-models/tbp-d2716e8b42744846aeafc91c591c9425
* author:	luyssport (https://sketchfab.com/luyssport)

Model License:
* license type:	CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
* requirements:	Author must be credited. No commercial use. Modified versions must have the same license.
*/


import "./App.css";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useState } from "react";
import { Model } from "./components/model/Model";
import HtmlContent from "./components/htmlContent";
import { Html } from "@react-three/drei";
import { Block } from "./components/layout/block";
import state from "./components/store/state";
import { AboutMe } from "./components/pages/about";
import { Projects } from "./components/pages/projects";
import Loading from "./components/layout/loading";
import Loading2 from "./components/layout/loader";
import { Contact } from "./components/pages/contact";

const CanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
const PText = styled.p`
  text-align: center;
  color: orange;
`;
const H1Text = styled.h1`
  text-align: center;
  color: orange;
  font-size: 38px;
  font-family: "Segoe UI", Roboto;
`;

const HtmlContentChild = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -40%, 0);
  display: flex;
  flex-direction: column;
  align-items: left;
  min-width: 380px;
`;
const Warning = styled.p`
  color: red;
  font-size: 14px;
`;
//#f15946;
//#636567
//#571ec1

function App() {
  const [events, setEvents] = useState();
  const domContent = useRef();
  const scrollArea = useRef();

  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <CanvasContainer id="fullPage">
    
        <Canvas
          //camera={{ position: [0, 0, 20], fov: 15, near: 10, far: 1000 }}
          camera={{fov:60,near:0.1,far:5000}}
          dpr={[1, 1.5]}
          gl={{ alpha: false, antialias: true }}
          onCreated={({ gl, events }) => {
            gl.setClearColor("white");
            gl.toneMappingExposure = 2.5;
            gl.toneMappingWhitePoint = 1;

            // Export canvas events, we will put them onto the scroll area
            setEvents(events);
          }}
          onUpdate={(c) => c.updateProjectionMatrix()}
          resize={2}
        >
          <color
            attach="background"
            args={["#1B1A17"]} //'#191920'
          />
           <Suspense fallback={<Loading2 style={{color: 'orange', textAlign:'center'}}/>}>
          <Block factor={1.5} offset={0}>
            <Model
              modelPath="./model/scene.gltf"
              positionX={0}
              positionY={-0.7}
              positionZ={2}
              scale={45}
            />

            <HtmlContent>
              <HtmlContentChild className="htmlContent">
                <div className="about">
                  {/*
          <div className="left">
           <About ><a href='#about'> About</a></About>
          </div>
          <div className="right">
             <About><a href='#projects'>projects</a></About>
          </div>
          */}
                </div>
                <div className="container">
                  <div id="title">
                    <H1Text>Hello, I'm JABA</H1Text>
                    <PText>MERN stack developer</PText>
                    <Warning>Please Scroll Down</Warning>
                  </div>
                </div>
              </HtmlContentChild>
            </HtmlContent>
          </Block>
          <Block factor={2} offset={0.5}>
            <Html center portal={domContent}>
              <AboutMe />
            </Html>
          </Block>

          <Block factor={3} offset={1} id="projects">
            <Html center portal={domContent}>
              <Projects />
            </Html>
          </Block>
          <Block factor={-3.5} offset={1.6} id="contact">
            <Html center portal={domContent}>
              <Contact />
            </Html>
          </Block>
          </Suspense>
        </Canvas>
     
      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: "sticky", top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </CanvasContainer>
  );
}

export default App;
