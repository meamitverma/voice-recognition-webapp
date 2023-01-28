import { useState } from "react";
import "./App.css";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from "react-speech-kit";

function App() {
  // speech synthesis
  const [text, setText] = useState("");
  const { speak } = useSpeechSynthesis();

  const handleOnClick = () => {
    speak({ text: text });
  };

  // Speech-Recognition
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
      setText(result);
    },
  });

  return (
    <div className="App">
      <header className="App-header">
        {/* Speech Synthesis */}
        <h1>Text to Speech Converter in React</h1>
        <textarea
          className="textAreaStyle"
          // value={value}
          onChange={(e) => {
            // setValue(e.target.value);
            setText(e.target.value);
          }}
        ></textarea>
        <button
          className="buttonStyle"
          onClick={() => {
            handleOnClick();
          }}
        >
          Speak
        </button>

        {/* Speech recognition */}
        <div>
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <button onMouseDown={listen} onMouseUp={stop}>
            🎤
          </button>
          {listening && <div>Go ahead I'm listening</div>}
        </div>
      </header>
    </div>
  );
}

export default App;
