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

    var payload = { "image": image };

    axios.post('/api', {
      "image": image,
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
          <img src='logo.svg' className="App-logo" alt="logo" />
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
            <video id="video" width="360" height="225" autoplay="true"></video>
          </div>
          <canvas id="canvas" width="400" height="300" styles="display:none;"></canvas>
        </div>
      </div>
    );
  }
}

export default App;
