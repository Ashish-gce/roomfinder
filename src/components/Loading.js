import React from "react";
// importing loading-arrow gif from image file
import loadingGif from "../images/gif/loading-arrow.gif";

const Loading = () => {
  return (
    <div className="loading">
      <h4>rooms data loading...</h4>
      <img src={loadingGif} alt="preloader" />
    </div>
  );
};

export default Loading;
