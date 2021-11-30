import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "./firebase";

// import http from "http";
// import SocketIO from "socket.io";

// express를 import하면 React App에서 오류를 발생시킨다,,,
//import express from "express";

const socket = new WebSocket(`ws://127.0.0.1:8000`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket}/>
  </React.StrictMode>,
  document.getElementById('root')
);
// Redux => 저장소, 컨트롤러, (서비스)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
