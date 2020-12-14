import React from "react";

const Slider = (props) => {
  return (
    <div className="slider flex items-center center">
      <input
        type="range"
        id="detailLevel"
        min={1}
        max={20}
        defaultValue={props?.initialValue}
        onChange={props?.onChange}
      />
      <p className="ml2 f4 v-middle">{"Detail level : " + props?.value}</p>
    </div>
  );
};
export default Slider;
