import React, { useState } from "react";
import { createWorker } from "tesseract.js";
import Fade from "react-fade-in";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ProgressBar } from "react-bootstrap";
import "reactjs-popup/dist/index.css";
const Convert = () => {
  const [passage, setPassage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("eng");
  const [selectEng, setSelectEng] = useState(true);
  const [selectHin, setSelectHin] = useState(false);
  const [file, setFile] = useState(null);
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
    await worker.loadLanguage(selectedLang);
    await worker.initialize(selectedLang);
    setLoading(true);
    const {
      data: { text },
    } = await worker.recognize(file);
    setPassage(text);
    setLoading(false);
  };

  const change = (e) => {
    setFile(e.target.files[0]);
  };

  const toggleEng = () => {
    setSelectedLang("eng");
    setSelectEng(true);
    setSelectHin(false);
  };
  const toggleHin = () => {
    setSelectedLang("hin");
    setSelectHin(true);
    setSelectEng(false);
  };

  return (
    <>
      <Fade>
        <div className="convert-container">
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
          <div className="btn-group">
            <button
              className={`btn-upload ${selectEng ? "selected" : ""}`}
              onClick={() => {
                toggleEng();
              }}
            >
              English
            </button>
            <button
              className={`btn-upload ${selectHin ? "selected" : ""}`}
              onClick={() => {
                toggleHin();
              }}
            >
              Hindi
            </button>
          </div>
          <div className="selected-lang">
            <div>
              Language: <span>{selectEng ? "English" : "Hindi"}</span>
            </div>
          </div>

          <div className="converted-container">
            <div className="converted">
              {!loading ? (
                <p>{passage}</p>
              ) : (
                <div>
                  <div className="log">
                    <p>{log.status}</p>
                    <ProgressBar
                      label={`${Math.floor(log.progress.toFixed(2) * 100)}%`}
                      now={Math.floor(log.progress.toFixed(2) * 100)}
                    ></ProgressBar>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default Convert;
