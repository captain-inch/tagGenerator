import React from "react";

const ImageLinkForm = (props) => {
  return (
    <div className="imageLinkForm flex flex-column">
      <p className="f3 b w-90 center tc">
        Fill in an image url and let Big Brother make its job
      </p>
      <div className="center w-60-m w-80-ns items-center justify-center">
        <div className="form pa4 br2 shadow w-90-m w-80-l mr1 ml1 flex items-center justify-center flex-column flex-row-ns">
          <input
            className="url f4 pa2 w-100 w-60-ns br2 bw0"
            placeholder="url..."
            onChange={props.onInputChange}
            type="text"
          />
          <button
            className="detect w-100 w-30-ns w-50-m mt1-m grow br2 f4 tc ph3 link pv2 bg white bg-light-red dib b--white ba bw1"
            onClick={props.onSubmit}
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageLinkForm;
