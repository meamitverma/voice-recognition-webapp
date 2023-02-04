const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const status = document.getElementById("status");
const output = document.querySelector("textarea");
const mic = document.getElementById('mic')

startRecognition = () => {

  
  if (SpeechRecognition !== undefined) {
    let recognition = new SpeechRecognition();

    recognition.onstart = () => {
      status.innerHTML = `Starting listening, speak in the microphone please 🦻`;
      mic.classList.add("listening");
    };

    recognition.onspeechend = () => {
      status.innerHTML = `I stopped listening `;
      recognition.stop();
    };

    recognition.onresult = (result) => {
        mic.classList.remove("listening");
    //   output.innerHTML = `I'm ${Math.floor(
    //     result.results[0][0].confidence * 100
    //   )}% certain you just said: <b>${result.results[0][0].transcript}</b>`;
        let text = result.results[0][0].transcript
        typeText(output, text);
    };

    recognition.start();
  } else {
    status.innerHTML = "sorry not supported 😭";
  }
};


function typeText(element, text) {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);
  }
