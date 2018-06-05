import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
// eslint-disable-next-line 
import logo from './logo.svg';
import axios from 'axios';
import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      sign_up: false,
      sign_in:false,
      lock_door: true,
      name : null
    };
    this.capture = this.capture.bind(this)
    this.faceCapture = this.faceCapture.bind(this);
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.lockdoor = this.lockdoor.bind(this);
    this.handleChange = this.handleChange.bind(this);

    }

  componentDidMount() {
    let canvas = document.getElementById('canvas'),
      // eslint-disable-next-line 
      context = canvas.getContext('2d'),
      // eslint-disable-next-line 
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

    console.log("hello")


  }

  capture() {
    let canvas = document.getElementById('canvas'),
      // eslint-disable-next-line 
      context = canvas.getContext('2d'),
      // eslint-disable-next-line 
      video = document.getElementById('video')
    context.drawImage(video, 0, 0, 400, 300);
    // eslint-disable-next-line 
    let image = canvas.toDataURL("image/jpeg")
    this.faceCapture()

  }

  faceCapture() {
    console.log("facecapture")
    let canvas = document.getElementById('canvas'),
      // eslint-disable-next-line 
      context = canvas.getContext('2d'),
      // eslint-disable-next-line 
      video = document.getElementById('video')
    let image = canvas.toDataURL("image/jpeg")


    axios.post('/api', {
      "image": image,
      "name" : this.state.name,
      "signup" : this.state.sign_up,
      "signin" : this.state.sign_in

    })
      .then(function(response){
        console.log(response.data.face)
        if(response.data.face == "wrong")
        {
          console.log("wrong")
          document.getElementById("title").innerHTML = "Wrong face; try again";
        }
        else if(response.data.face == "matched")
        {
          console.log("matched")
          document.getElementById("title").innerHTML = "Matched face"; 
        }
        else
        {
          console.log("no face")
          document.getElementById("title").innerHTML = "No face detected; try again";  
        }
      })
      .catch(function(error){
        console.log(error)
      })
    


  }

  faceEnroll() {
    let canvas = document.getElementById('canvas'),
      // eslint-disable-next-line 
      context = canvas.getContext('2d'),
      // eslint-disable-next-line 
      video = document.getElementById('video')
    let image = canvas.toDataURL("image/jpeg")

  // eslint-disable-next-line 
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

  signup(){
    this.setState({ sign_up : true })
    document.getElementById("title").innerHTML = "Enter your name and then press facecapture";
    console.log(this.state.name)
    
    let canvas = document.getElementById('canvas'),
      // eslint-disable-next-line 
      context = canvas.getContext('2d'),
      // eslint-disable-next-line 
      video = document.getElementById('video')
    let image = canvas.toDataURL("image/jpeg")


    axios.post('/api', {
      "image": image,
      "name" : this.state.name,
      "signup" : this.state.sign_up
    })
      .then(function(response){
        console.log(response)
      })
      .catch(function(error){
        console.log(error)
      })

  }

  signin(){
    this.setState({ sign_in : true })
    document.getElementById("title").innerHTML = "Enter your name and then press facecapture";

    console.log(this.state.name)
    
    let canvas = document.getElementById('canvas'),
      // eslint-disable-next-line 
      context = canvas.getContext('2d'),
      // eslint-disable-next-line 
      video = document.getElementById('video')
    let image = canvas.toDataURL("image/jpeg")


    axios.post('/api', {
      "image": image,
      "name" : this.state.name,
      "signup" : this.state.sign_up,
      "signin" : this.state.sign_in
    })
      .then(function(response){
        console.log(response)
        
      })
      .catch(function(error){
        console.log(error)
      })
  }

  lockdoor(){
    console.log("locking door")

    axios.post('/lock', {
      
    })
      .then(function(response){
        console.log(response)
        document.getElementById("title").innerHTML = "Door locked";
      })
      .catch(function(error){
        console.log(error)
      })
  }

  handleChange(e) {
    this.setState({ name : e.target.value });
    console.log(this.state.name);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://cdn4.iconfinder.com/data/icons/basic-ui-elements/700/09_gear-128.png" className="App-logo" alt="logo" />
          <h3 id="title">Welcome, please sign in</h3>
        </header>
        <p className="App-intro">
        </p>
        <div className="sign-in">
          <Button  bsStyle="primary" onClick={this.capture} >Face Capture</Button>
          <Button id="sign-in" bsStyle="success" onClick={this.signin} >Sign In</Button>
          <Button id="sign-up" bsStyle="danger" onClick={this.signup} >Sign Up</Button>
          <Button id="lock-door" bsStyle="warning" onClick={this.lockdoor} >Lock Door</Button>
        </div>
        { this.state.sign_up || this.state.sign_in ?
        <div id="name-form" >
          <FormControl
              type="text"
              value={this.state.name}
              placeholder="Enter text"
              onChange={this.handleChange}
          />
        </div> : <div></div>}
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
