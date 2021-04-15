import React, { useState } from "react";
import * as qna from "@tensorflow-models/qna";
import Fade from "react-fade-in";
import Loader from "react-loader-spinner";
const Answer = () => {
  const [ans, setAns] = useState("");
  const [passage, setPassage] = useState("");
  const [ques, setQues] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAnswers = async () => {
    setLoading(true);
    const model = await qna.load();
    const answers = await model.findAnswers(ques, passage);
    try {
      setAns(answers[0].text);
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
      console.log(e);
    }

    console.log("Answers: ");
    console.log(answers);
    console.log(...answers);
    console.log(passage);
  };

  return (
    <>
      <Fade>
        <div className="answer-container">
          <div className="que-input">
            <input
              type="text"
              placeholder="Enter a question"
              value={ques}
              onChange={(e) => {
                setQues(e.target.value);
              }}
            ></input>
            <button className="btn" type="button" onClick={getAnswers}>
              Get answers
            </button>
          </div>
          {loading ? (
            <div className="ans-loader">
              <p> Finding out answers</p>
              <Loader
                type="ThreeDots"
                color="#0070f3"
                height={20}
                width={20}
              ></Loader>
            </div>
          ) : (
            <>
              {error ? (
                <div className="error">
                  Unable to find any appropriate answer
                </div>
              ) : (
                <>
                  <div className="answers">
                    <strong>Answer: </strong>
                    <p>{ans}</p>
                  </div>
                </>
              )}
            </>
          )}
          <div>
            <textarea
              placeholder="type or paste a paragraph here"
              value={passage}
              className="converted"
              onChange={(e) => {
                setPassage(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default Answer;
