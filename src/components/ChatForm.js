import React, { useState } from 'react'
import './ChatForm.css'
import "./ChatOutput.css"
// import { generatePoem } from "../generate.mjs"
import { ChatGPTAPI } from 'chatgpt'

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
