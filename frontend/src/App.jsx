import { useState } from 'react';
import './App.css';
import { useSpeechSynthesis } from 'react-speech-kit'

function App() {
  const [text, setText] = useState('')
  const {speak} = useSpeechSynthesis()

  const handleOnClick = () => {
    speak({text : text})
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Text to Speech Converter in React</h1>
        <textarea className='textAreaStyle' onChange={(e) => {setText(e.target.value)}}></textarea>
        <button className='buttonStyle' onClick={() => {handleOnClick()}}>Listen</button>
      </header>
    </div>
  );
}

export default App;
