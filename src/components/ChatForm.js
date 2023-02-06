import React from 'react'
import './ChatForm.css'

export default function ChatForm(){
    return(
        <div className = "ChatForm">
            <div className="chat-text">
                Make your poem unique by entering special words and your Valentine's name. Our advanced GPT will create a masterpiece just for you.
            </div>
            <form>
            <input className = "form-input" type="text" placeholder="Valentine's Name: (or let love lead the way and leave it blank ;))"></input>
            <input className = "form-input" type="text" placeholder="Valentine's Name: (or let love lead the way and leave it blank ;))"></input>
            <button className = "btn-submit">Create my love poem</button>
            </form>
        </div>
        
    )
}