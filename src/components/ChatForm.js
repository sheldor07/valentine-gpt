import React, { useState } from 'react'
import './ChatForm.css'
import "./ChatOutput.css"
// import { generatePoem } from "../generate.mjs"

export default function ChatForm() {
  const [valentineName, setValentineName] = useState('')
  const [message, setMessage] = useState('')

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
    .then(text => console.log(text))
    // var text = generatePoem(valentineName, message)
  }

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
        <button className="btn-submit">Create my love poem</button>
      </form>
      <div class="ChatOutput"></div>
    </div>
  )
}
