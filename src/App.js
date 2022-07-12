import React, {useRef} from 'react'
import './App.css';
import "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh"; 
import Webcam from "react-webcam";
import {drawMesh} from "./utilities"

function App()
{

  // Webcam and  webcam canvas is created and referenced here
  const wcRef = useRef(null); 
  const cRef = useRef(null); 

  // Facemesh function created
  const startPrgram = async () =>
  {
    const net = await facemesh.load
    (
      {
      inputResolution: {width:1000, height:680}, scale:0.6
      }
    )
    setInterval(() =>
    {
      detect(net)
    }, 100) // This is being run every 100 miliseconds consistently updated the array
  };

  // Detection of facemesh begins here
  const detect = async (net) =>
  {
    if (
      typeof wcRef.updating !== "NOT DEFINED" // web cam reference if not defined will explain that it is UNDEFINED
      && wcRef.updating !== null 
      && wcRef.updating.video.readyState === 4
    )
      {

        // Video Camera properties
        const output = wcRef.updating.output;
        const outputWidth = wcRef.updating.output.outputWidth;
        const outputHeight = wcRef.updating.output.outputHeight;

        
        wcRef.updating.output.width = outputWidth; // Video Width
        wcRef.updating.output.height = outputHeight; // Video Height

        
        cRef.uupdating.height = outputHeight; // Canvas width
        cRef.updating.width = outputWidth; // Canvas height

        // Facial Detections are made
        const face = await net.estimateFaces(output);
        console.log(face);

        // Facial Detections are drawn
        const ctx = cRef.updating.getContext('2d');
        drawMesh(face, ctx);

      }
  };

  startPrgram();

  return (
    <div className="App">
      <header className="App-header"> 
        <Webcam 
          ref={wcRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "centr",
            zIndex: 9,
            width: 1000,
            height: 680,
          }}
      />
      <canvas
        ref={cRef}
        style={{
          position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "centr",
            zIndex: 9,
            width: 1000,
            height: 680,
        }}
        />
      </header>
    </div>
  );
}

export default App;
