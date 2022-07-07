import React, {useRef} from 'react'
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh"; 
import Webcam from "react-webcam";
import {drawMesh} from "./utilities"

function App() {

  // Setup references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: {width:640, height:48}, scale:0.8
    })
    setInterval(()=>{
      detect(net)
    }, 100) // This is being run every 100 miliseconds consistently updated the array
  };

  // Facemesh 
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" 
      && webcamRef.current !== null 
      && webcamRef.current.video.readyState === 4
      )  {

        // Get video properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Canvas width
        canvasRef.current.height = videoHeight;
        canvasRef.current.width = videoWidth;

        // Detections 
        const face = await net.estimateFaces(video);
        console.log(face);

        // Context for drawing 
        const ctx = canvasRef.current.getContext('2d');
        drawMesh(face, ctx);

      }
  };

  runFacemesh();

  return (
    <div className="App">
      <header className="App-header"> 
        <Webcam 
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "centr",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "centr",
            zIndex: 9,
            width: 640,
            height: 480,
        }}
        />
      </header>
    </div>
  );
}

export default App;
