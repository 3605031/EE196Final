import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';



class App extends Component {
  constructor() {
    super();
    this.capture = this.capture.bind(this)
    this.faceCapture = this.faceCapture.bind(this);
  }
  componentDidMount() {
    let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      video = document.getElementById('video'),
      vendorUrl = window.URL || window.webkitURL;

    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
    navigator.getMedia({
      video: true,
      audio: false
    }, function (stream) {
      video.src = vendorUrl.createObjectURL(stream);
      video.play();
    }, function (error) {
      //Error print
      console.log(error.code)
    })


  }

  capture() {
    let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      video = document.getElementById('video')
    context.drawImage(video, 0, 0, 400, 300);
    let image = canvas.toDataURL("image/jpeg")
    this.faceCapture()

  }

  faceCapture() {
    console.log("facecapture")
    let canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      video = document.getElementById('video')
    let image = canvas.toDataURL("image/jpeg")
    const headers = {
      "Content-type"     : "application/json",
      "app_id": "397a0edb",
      "app_key": "a1214f54d75f666a9eeb5f3375f77fb5"
    };
    var payload = { "image": image };

    axios.post('http://api.kairos.com/enroll', {
      "headers" : headers,
      "image": image,
      "subject_id": "Blake",
      "gallery_name":"EE196"
    })
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Welcome, please sign in
        </p>
        <div className="sign-in">
          <Button id="sign-in" bsStyle="primary" onClick={this.capture} >Face Capture</Button>
        </div>
        <div className='options'>

          <div className="booth">
            <video id="video" width="400" height="300"></video>
          </div>
          <canvas id="canvas" width="400" height="300" styles="display:none;"></canvas>
        </div>
      </div>
    );
  }
}

export default App;
