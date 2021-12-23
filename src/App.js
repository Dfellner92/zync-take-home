import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [sentence, setSentence] = useState("");
  //const [scrambled, setScrambled] = useState("");

  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/sentences/1")
      .then((res) => res.json())
      .then((data) => setSentence(data.data.sentence));
  }, []);

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

  return (
    <div className="App">
      <div className="container">
        <div className="container-top">
          <div id="scrambled-word">{scrambler(sentence)}</div>
          <br />
          <div className="instructions">Guess the sentence! Start typing.</div>
          <br />
          <div className="instructions">
            {" "}
            The yellow blocks are meant for spaces
          </div>
          <br />
          <div id="score">Score: 0</div>
        </div>
        <div
          className="container-bottom"
          style={{
            display: "flex",
            justifyContent: "column",
            flexDirection: "column",
          }}
        >
          {sentence.split(" ").map((word) => (
            <div style={{ display: "flex", flexDirection: "row" }}>
              {word.split("").map((letter) => (
                <div>{letter}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
