import React from "react";
import { useState, useEffect } from "react";
import { createWorker } from "tesseract.js";
import Fade from "react-fade-in";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { ProgressBar } from "react-bootstrap";
import Answer from "./Answer";
const Convert = () => {
  const [passage, setPassage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadEngine, setLoadEngine] = useState(false);
  const [log, setLog] = useState({});

  const worker = createWorker({
    logger: (m) => {
      console.log(m);
      setLog({
        status: m.status,
        progress: m.progress,
      });
    },
  });
  const getData = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    setLoading(true);
    const {
      data: { text },
    } = await worker.recognize(file);
    setPassage(text);
    setLoading(false);
  };
  const [file, setFile] = useState(null);

  const change = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoadEngine(true);
    }, 1000);
  }, []);

  return (
    <>
      {!loadEngine ? (
        <Load></Load>
      ) : (
        <>
          <Fade>
            <div className="file-input">
              <input
                type="file"
                id="myfile"
                name="myfile"
                onChange={change}
              ></input>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  getData();
                }}
              >
                Convert
              </button>
            </div>
            <div className="converted-container">
              <div className="converted">
                {!loading ? (
                  <p>{passage}</p>
                ) : (
                  <>
                    <div className="log">
                      <p>{log.status}</p>
                      <ProgressBar
                        label={`${Math.floor(log.progress.toFixed(2) * 100)}%`}
                        now={Math.floor(log.progress.toFixed(2) * 100)}
                      ></ProgressBar>
                    </div>
                  </>
                )}
              </div>
              <Answer></Answer>
            </div>
          </Fade>
        </>
      )}
    </>
  );
};
const Load = () => {
  return (
    <div className="loader">
      <div>Loading Tesseract Engine</div>
      <Loader type="ThreeDots" color="#0070f3" height={40} width={40}></Loader>
    </div>
  );
};
export default Convert;
