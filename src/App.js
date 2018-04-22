import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'bootstrap';
import $ from 'jquery';
import 'react-rangeslider/lib/index.css';
import './App.css';

function updateCanvasRGB(new_rgb) {
  this.setState({
    rgb: new_rgb,
    rotation: this.state.rotation
  });
}

class BGCanvasComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rgb: [60, 155, 236]
    }
    updateCanvasRGB = updateCanvasRGB.bind(this);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const context = this.refs.canvas.getContext('2d');
    context.fillStyle = 'rgb('
                        + this.state.rgb[0]
                        + ', '
                        + this.state.rgb[1]
                        + ', '
                        + this.state.rgb[2] + ')';
    context.fillRect(0, 0, 400, 400);
  }

  render() {
    return (
      <canvas ref="canvas" id="canvas-bg" width="400" height="400"></canvas>
    );
  }
}

class RGBController extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      rgb: [60, 155, 236]
    }
  }

  handleChangeOnRed = (value) => {
    this.setState({
      rgb: [value, this.state.rgb[1], this.state.rgb[2]]
    });
    updateCanvasRGB(this.state.rgb);
  }

  handleChangeOnGreen = (value) => {
    this.setState({
      rgb: [this.state.rgb[0], value, this.state.rgb[2]]
    });
    updateCanvasRGB(this.state.rgb);
  }

  handleChangeOnBlue = (value) => {
    this.setState({
      rgb: [this.state.rgb[0], this.state.rgb[1], value]
    });
    updateCanvasRGB(this.state.rgb);
  }

  render() {
    return (
      <div id="sliders" className="row justify-content-center">
        <div className="col-6">
          <div id="red-slider">
            Red | {this.state.rgb[0]}
            <Slider
              min={0}
              max={255}
              value={this.state.rgb[0]}
              onChange={this.handleChangeOnRed}
            />
          </div>
          <div id="green-slider">
            Green | {this.state.rgb[1]}
            <Slider
              min={0}
              max={255}
              value={this.state.rgb[1]}
              onChange={this.handleChangeOnGreen}
            />
          </div>
          <div id="blue-slider">
            Blue | {this.state.rgb[2]}
            <Slider
              min={0}
              max={255}
              value={this.state.rgb[2]}
              onChange={this.handleChangeOnBlue}
            />
          </div>
        </div>
      </div>
    );
  }
}

function updateCanvasRotation(degrees) {
  this.setState({
    rotation: degrees,
    x_scale: this.state.x_scale,
    y_scale: this.state.y_scale
  });
}

function updateCanvasXScale(value) {
  this.setState({
    rotation: this.state.rotation,
    x_scale: value,
    y_scale: this.state.y_scale
  });
}

function updateCanvasYScale(value) {
  this.setState({
    rotation: this.state.rotation,
    x_scale: this.state.x_scale,
    y_scale: value
  });
}

class ImageCanvasComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: 0,
      x_scale: 10,
      y_scale: 10
    }

    updateCanvasRotation = updateCanvasRotation.bind(this);
    updateCanvasXScale = updateCanvasXScale.bind(this);
    updateCanvasYScale = updateCanvasYScale.bind(this);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    var context = this.refs.canvas.getContext('2d');
    var dp_img = document.createElement('img');
    var imageCanvasState = this.state;
    dp_img.onload = function() {
      var imageCache = this;
      context.save();
      context.clearRect(0, 0, 400, 400);
      context.translate(imageCache.width / 2, imageCache.height / 2);
      context.scale(imageCanvasState.x_scale / 10, imageCanvasState.y_scale / 10);
      context.rotate(Math.PI / 180 * imageCanvasState.rotation);

      context.drawImage(
        dp_img, 
        // Note that the canvas width and height is 400.
        -imageCache.width / 2,
        -imageCache.height / 2,
        imageCache.width,
        imageCache.height
      );
      context.restore();
    }

    dp_img.src = 'assets/images/dp.png';
  }

  render() {
    return (
      <canvas ref="canvas" id="canvas-picture" width="400" height="400"></canvas>
    );
  }
}

class ImageController extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      rotation: 0,
      x_scale: 10,
      y_scale: 10
    }
  }

  handleChangeOnDegrees = (value) => {
    this.setState({
      rotation: value,
      x_scale: this.state.x_scale,
      y_scale: this.state.y_scale
    });
    updateCanvasRotation(value);
  }

  handleChangeOnXScale = (value) => {
    this.setState({
      rotation: this.state.rotation,
      x_scale: value,
      y_scale: this.state.y_scale
    });
    updateCanvasXScale(value);
  }

  handleChangeOnYScale = (value) => {
    this.setState({
      rotation: this.state.rotation,
      x_scale: this.state.x_scale,
      y_scale: value
    });
    updateCanvasYScale(value);
  }

  render() {
    return (
      <div id="sliders" className="row justify-content-center">
        <div className="col-6">
          <div id="rotation-slider">
            Rotation | {this.state.rotation}&#176;
            <Slider
              min={0}
              max={360}
              value={this.state.rotation}
              onChange={this.handleChangeOnDegrees}
            />
          </div>
          <div id="x-scale-slider">
            Scale X | {this.state.x_scale / 10}
            <Slider
              min={10}
              max={50}
              value={this.state.x_scale}
              onChange={this.handleChangeOnXScale}
            />
          </div>
          <div id="y-scale-slider">
            Scale Y | {this.state.y_scale / 10}
            <Slider
              min={10}
              max={50}
              value={this.state.y_scale}
              onChange={this.handleChangeOnYScale}
            />
          </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  changeDP = (event) => {
    var bgCanvas = $('canvas#canvas-bg')[0];
    var pictureCanvas = $('canvas#canvas-picture')[0];
    var dpCanvas = document.createElement('canvas');
    dpCanvas.setAttribute('width', 400);
    dpCanvas.setAttribute('height', 400);

    var dpCanvasContext = dpCanvas.getContext('2d');
    dpCanvasContext.drawImage(bgCanvas, 0, 0);
    dpCanvasContext.drawImage(pictureCanvas, 0, 0);

    var newDP = dpCanvas.toDataURL('image/png').substring(22);

    var button = event.target;
    $(button).prop('disabled', true);
    $(button).text('Changing my DP...');
    $.post('http://localhost:5000/change-dp', newDP, function(resp) {
      resp = JSON.parse(resp);
      $(button).prop('disabled', false);
      $(button).text('Change My DP');
      alert(resp.message);  // Replace this in the future.
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Change My DP</h1>
          <h2 className="thin-font">by Sean Ballais (<a href="https://twitter.com/seanballais">@seanballais</a>)</h2>
        </header>
        <article className="container">
          <div id="canvas-holder" className="row justify-content-center">
            {<BGCanvasComponent />}
            {<ImageCanvasComponent />}
          </div>
          <div id="canvas-sliders" className="row justify-content-center">
            {<RGBController />}
            {<ImageController />}
          </div>
          <div id="change-dp-button-holder" className="row justify-content-center">
            <button type="button" onClick={this.changeDP} className="btn btn-success">Change My DP</button>            
          </div>
        </article>
      </div>
    );
  }
}

export default App;
