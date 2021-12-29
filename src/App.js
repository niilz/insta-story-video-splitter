import logo from "./logo.svg";
import "./App.css";
import React, { useRef, useState, useEffect } from "react";

function App() {
  const [videoFile, setVideoFile] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <input
          id="video"
          type="file"
          onInput={(e) => setVideoFile(e.target.files[0])}
        />
        <video
          src={videoFile && window.URL.createObjectURL(videoFile)}
          controls
        />
        <button onClick={splitVideo}>split</button>
      </main>
    </div>
  );
}

export default App;

function splitVideo() {
  const video = document.querySelector("video");
}
