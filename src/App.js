import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import "./App.css";
import Convert from "./Convert";
import Loading from "./Loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <>
      {loading ? (
        <Loading
          msg={"Setting up Tesseract Engine and TensorFlow..."}
        ></Loading>
      ) : (
        <div className="App">
          <Convert></Convert>
          <Answer></Answer>
        </div>
      )}
    </>
  );
}

export default App;
