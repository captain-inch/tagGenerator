import React from "react";
import { Component } from "react";
import Graph from "./graph.jsx";
import Slider from "./slider.jsx";
class ImageDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 8 };
  }
  getImageRatio(url) {
    var img = new Image();
    img.src = url;
    return img.width / img.height;
  }

  wideScreen(url) {
    console.log(
      "Widescreen : ",
      this.getImageRatio(url) > window.innerWidth / window.innerHeight
    );
    // return this.getImageRatio(url) > window.innerWidth / window.innerHeight
    //   ? false
    //   : true;
    return true;
  }
  render() {
    return (
      <div className="imageDisplay ml1 mt1 flex flex-column justify-center">
        {this.props?.concepts?.length > 0 ? (
          <Slider
            className="ma2"
            initialValue={8}
            onChange={(e) => {
              this.setState({ value: e.target.value });
            }}
            value={this.state.value}
          />
        ) : null}
        <div className="flex justify-center flex-column flex-row-ns h-50 ma2">
          {this.props?.concepts?.length > 0 ? (
            // <div className="w-40 results bg-black-20 br3 pa2 ml2 shadow-5">
            // </div>
            <div className="resultContainer bg-black-30 br4 shadow-5 ma2 pa1 center">
              <Graph
                className="flex w-50-ns justify-center align-center"
                itemsNumber={this.state.value}
                concepts={this.props?.concepts}
              />
            </div>
          ) : null}
          {this.props?.url?.length > 0 ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={this.props.url}
              alt="Invalid image"
              className="f3 dark-red w-50-ns b v-mid center"
            />
          ) : null}
        </div>
      </div>
    );
  }
}
export default ImageDisplay;
