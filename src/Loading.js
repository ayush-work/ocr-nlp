import React from "react";
import Loader from "react-loader-spinner";
const Loading = ({ msg }) => {
  return (
    <div className="loader">
      <div>{msg}</div>
      <Loader type="ThreeDots" color="#0070f3" height={40} width={40}></Loader>
    </div>
  );
};

export default Loading;
