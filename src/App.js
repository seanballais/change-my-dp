import React, { Component } from 'react';
import Slider from 'react-rangeslider';
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
        <div className="col-4">
          Red | {this.state.rgb[0]}
          <Slider
            min={0}
            max={255}
            value={this.state.rgb[0]}
            onChange={this.handleChangeOnRed}
          />
          Green | {this.state.rgb[1]}
          <Slider
            min={0}
            max={255}
            value={this.state.rgb[1]}
            onChange={this.handleChangeOnGreen}
          />
          Blue | {this.state.rgb[2]}
          <Slider
            min={0}
            max={255}
            value={this.state.rgb[2]}
            onChange={this.handleChangeOnBlue}
          />
        </div>
      </div>
    );
  }
}

class ImageCanvasComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rgb: [60, 155, 236],
      rotation: 0
    }
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const context = this.refs.canvas.getContext('2d');
    var dp_img = document.createElement('img');
    dp_img.onload = function() {
      context.drawImage(dp_img,
                        // Note that the canvas width and height is 400.
                        200 - dp_img.width / 2,
                        200 - dp_img.height / 2);
    }
    dp_img.src = 'assets/images/dp.png';
  }

  render() {
    return (
      <canvas ref="canvas" id="canvas-picture" width="400" height="400"></canvas>
    );
  }
}

class App extends Component {
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
          {<RGBController />}
        </article>
      </div>
    );
  }
}

export default App;
