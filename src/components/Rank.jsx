import React from "react";

const Rank = (props) => {
  return (
    <div className="rank flex justify-center items-centerw-60 center mt3 mb3">
      <div className="f3 tc">
        {`Hello ${props.username}. You have analyzed `}
        <div className="f2 pl2 b tc dib">{props.entries}</div>
        {` pictures.`}
      </div>
    </div>
  );
};
export default Rank;
