import React, { useState } from 'react'
import './ChatForm.css'
import "./ChatOutput.css"
// import { generatePoem } from "../generate.mjs"

export default function ChatForm() {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function placeholderAnimation(text) {
    let total_time = 20000;
    let sleep_time = total_time / text.length;

    // text = "Type it in.\nWe'll write it out.";
    let curr_text=''
    for (const char of text) {
        console.log(curr_text)
        setPoemText(curr_text + char);
        curr_text += char
        if (char == '\n') {
            await sleep(2 * sleep_time);
        }
        if (char != ' ') {
            await sleep(sleep_time);
        }
    }
}
  const [valentineName, setValentineName] = useState('')
  const [message, setMessage] = useState('')
  let [PoemText,setPoemText] = useState('')
  const handleValentineNameChange = (event) => {
    setValentineName(event.target.value)
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    generate(valentineName, message)
  }

  const generate = (valentineName, message) => {
    console.log(`Generating poem for Valentine's Name: ${valentineName} with message: "${message}"`)
    const data = {
      name: valentineName,
      words: message,
    };
      
    const options = {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin":"*",
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };    
    fetch('https://vev6zo3yfqkqnhk2mkfylof4ea0tulkz.lambda-url.ap-south-1.on.aws/', options)
    .then(response => response.text())
    .then((text) => {console.log(text)
      placeholderAnimation(text)})
    // var text = generatePoem(valentineName, message)
    // setPoemText("Hello world")
  }
  // setPoemText = (text)=>{
  //     PoemText = text;
  // } 
  return (
    <div className="ChatForm">
      <div className="chat-text">
        Make your poem unique by entering special words and your Valentine's name. Our advanced GPT will create a masterpiece just for you.
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Valentine's Name: (or let love lead the way and leave it blank ;))"
          value={valentineName}
          onChange={handleValentineNameChange}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Include things you want to tell your lover, keep it short and simple"
          value={message}
          onChange={handleMessageChange}
        />
        <button className="btn btn-submit">Create my love poem</button>
      </form>
      <div className="ChatOutput"><div className = "poemOutput">{PoemText}</div></div>
      <button className="btn btn-giftgpt">Unwrap Your Perfect Gift with Gift GPT</button>
    </div>
  )
}
