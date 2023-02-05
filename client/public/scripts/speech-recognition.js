const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const status = document.getElementById("status");
const output = document.querySelector("textarea");
const mic = document.getElementById('mic')

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

const startRecognition = () => {
  
  if (SpeechRecognition !== undefined) {
    let recognition = new SpeechRecognition();

    recognition.onstart = () => {
      status.innerHTML = `Starting listening, speak in the microphone please 🦻`;
      mic.classList.add("listening");

      // clear textarea if there is already some text
      output.innerHTML = '';
    };

    recognition.onspeechend = () => {
      status.innerHTML = `I stopped listening `;
      mic.classList.remove("listening");
      recognition.stop();
    };

    recognition.onresult = async(result) => {
    //   output.innerHTML = `I'm ${Math.floor(
    //     result.results[0][0].confidence * 100
    //   )}% certain you just said: <b>${result.results[0][0].transcript}</b>`;
        let text = result.results[0][0].transcript
        typeText(output, text);
        handleOnStoppedListening(text)

        

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


// onstopped listening
let loadInterval;

function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if(element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe (isAi, value, uniqueId) {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}"> 
        <div class="chat"> 
          <div class="profile"> 
            <img  alt="${isAi ? 'bot' : 'user'}"/>
          </div>
          <div class="message" id="${uniqueId}"> 
            ${value}
          </div>
        </div>
      </div>
    `
  )
}



const handleOnStoppedListening = async(text) => {
  // const data = new FormData(form);

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, text);

  // bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  clearInterval(loadInterval);
  messageDiv.innerHTML ='';

  // fetch data from the bot
  const response = await fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: text
    })
  })

  if(response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();
  
    console.log(parsedData);
    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();
    console.warn(err)
    // messageDiv.innerHTML = "Something went wrong";
  }


}
