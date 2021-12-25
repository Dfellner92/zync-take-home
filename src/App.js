import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [sentence, setSentence] = useState("");
  const [allCorrect, setAllCorrect] = useState(1);
  const [score, setScore] = useState(0);
  const [sentIndex, setSentIndex] = useState(1);
  //const [scrambled, setScrambled] = useState("");

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
    setScore(score + 1);
    setAllCorrect(1);
    setSentIndex(sentIndex + 1);
    console.log(sentIndex);
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
          <div id="score">Score: {score}</div>
        </div>
        <div
          className="container-bottom"
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {sentence.split(" ").map((word) => (
            <div
              style={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {word.split("").map((letter) => (
                <div
                  style={{
                    margin: "1vh",
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "gray",
                    width: `${80 / (word.length + 3)}vw`,
                  }}
                >
                  <div className="letter-hidden">{letter}</div>
                  <input
                    onChange={(e) => checkIfLetterMatch(e, letter)}
                    id="letter-input"
                    type="text"
                  />
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  margin: "1vh",
                  flexWrap: "wrap",
                  backgroundColor: "gold",
                  width: `${80 / (word.length + 1)}vw`,
                }}
              ></div>
            </div>
          ))}
          {allCorrect === sentence.replace(/\s/g, "").length + 1 && (
            <div
              style={{
                marginLeft: "42.5vw",
                backgroundColor: "white",
              }}
            >
              <div
                onClick={() => nextString()}
                style={{
                  paddingTop: "2vh",
                  backgroundColor: "green",
                  color: "white",
                  height: "5vh",
                  width: "9vw",
                  borderRadius: "35%",
                }}
              >
                Next
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
