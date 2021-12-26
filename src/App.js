import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [sentence, setSentence] = useState("");
  const [allCorrect, setAllCorrect] = useState(2);
  const [score, setScore] = useState(0);
  const [sentIndex, setSentIndex] = useState(1);
  const inputEl = useRef();

  useEffect(() => {
    fetch(`https://api.hatchways.io/assessment/sentences/${sentIndex}`)
      .then((res) => res.json())
      .then((data) => setSentence(data.data.sentence));
  }, [sentIndex, setSentence]);

  const scrambler = (sentence) => {
    let scrambledArr = [];
    let scrambledSent = sentence.split(" ");

    scrambledSent.map((word) =>
      scrambledArr.push(
        word
          .split("")
          .sort(() => (Math.random() > 0.5 ? 1 : -1))
          .join("")
      )
    );

    return scrambledArr.join(" ");
  };

  const checkIfLetterMatch = (e, letter) => {
    if (e.target.value === letter) {
      e.target.style.backgroundColor = "green";
      e.target.style.color = "white";
      correctnessHandle(letter);
    }
    if (e.target.value !== letter) {
      e.target.style.backgroundColor = "red";
      e.target.style.color = "white";
    }
  };

  const correctnessHandle = async (letter) => {
    setAllCorrect(allCorrect + 1);
    console.log(allCorrect);
    const newSent = sentence.replace(/\s/g, "");
    console.log(newSent);
  };

  const nextString = () => {
    inputEl.current.reset();
    setScore(score + 1);
    setAllCorrect(1);
    setSentIndex(sentIndex + 1);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="container-top">
          <div className="container-top_scrambled">{scrambler(sentence)}</div>
          <br />
          <div className="container-top_instructions">
            Guess the sentence! Start typing.
          </div>
          <br />
          <div className="container-top_instructions">
            The yellow blocks are meant for spaces
          </div>
          <br />
          <div className="container-top_score">Score: {score}</div>
        </div>
        <form ref={inputEl} className="container-bottom">
          {sentence.split(" ").map((word) => (
            <div className="container-bottom_row">
              {word.split("").map((letter) => (
                <input
                  onChange={(e) => checkIfLetterMatch(e, letter)}
                  className="container-bottom_row--word"
                  type="text"
                  style={{
                    backgroundColor: allCorrect === 1 && "gray",
                    width: `${80 / (word.length + 3)}vw`,
                  }}
                />
              ))}
              <div
                className="container-bottom_row--space"
                style={{
                  width: `${80 / (word.length + 1)}vw`,
                }}
              ></div>
            </div>
          ))}
          {allCorrect - 2 === sentence.replace(/\s/g, "").length && (
            <div className="button-background">
              <div className="button-function" onClick={() => nextString()}>
                Next
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
