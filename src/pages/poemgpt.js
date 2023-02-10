import React, { useState } from "react";
import '../styles/poemgpt.css'
import copyBtn from '../media/clipboard.png'
import {Link} from 'react-router-dom'
export function PoemGPT() {
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async function placeholderAnimation(text) {
        let total_time = 20000;
        let sleep_time = total_time / text.length;

        let curr_text = "";
        for (const char of text) {
           
            setPoemText(curr_text + char);
            curr_text += char;
            if (char === "\n") {
            await sleep(2 * sleep_time);
            }
            if (char !== " ") {
            await sleep(sleep_time);
            }
        }
    }
    const [valentineName, setValentineName] = useState("");
    const [message, setMessage] = useState("");
    let [PoemText, setPoemText] = useState("");
    const handleValentineNameChange = (event) => {
        setValentineName(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        generatePoem(valentineName, message);
    };
    const generatePoem = (valentineName, message) => {
        let btnSubmit = document.getElementById('btnSubmit')
        // console.log("query",message)
        if(valentineName===''){
            return
        }
        let spinningContainer = document.createElement('div')
        let spinningText = document.createElement('i')
        spinningText.setAttribute('class','fa fa-circle-o-notch fa-spin')
        spinningContainer.appendChild(spinningText)
        btnSubmit.innerText=''
        btnSubmit.appendChild(spinningContainer)
        btnSubmit.disabled =true
        console.log(
            `Generating poem for Valentine's Name: ${valentineName} with message: "${message}"`
        );
        const data = {
            prompt:(message)?`Write a Valentine's Day poem for ${valentineName}, incorporating the words '${message}'Express your love and affection in four stanzas, using deep language and metaphors in 4 stanzas and then explain the poem in 1 paragraph.`:`Write a Valentine's Day poem for ${valentineName}. Express your love and affection in four stanzas, using deep language and metaphors in 4 stanzas and then explain the poem in 1 paragraph.`
        };
        // console.log(data.prompt)
        const options = {
            method: "POST",
            headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        fetch(
            "https://vev6zo3yfqkqnhk2mkfylof4ea0tulkz.lambda-url.ap-south-1.on.aws/",
            options
        )
        .then((response) => response.text())
        .then(async (text) => {
            await placeholderAnimation(text)
            btnSubmit.removeChild(spinningContainer)
            btnSubmit.innerText = "Create love poem"                 
            btnSubmit.disabled = false
        });
    };
    function copyDivToClipboard() {
        var range = document.createRange();
        range.selectNode(document.getElementById("ChatOutput"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
    }
    
    return(
        <div className="App">
            <div className="Header">
                <div className="header-text">Valentine GPT</div>
                <div className="subheader-text">
                    Generating Love,<br></br>One Word At A Time ❤️
                </div>
            </div>
            <div className="ChatForm">
                <div className="chat-text">
                    Make your poem unique by entering special words and your Valentine's
                    name. Our advanced GPT will create a masterpiece just for you.
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
                    <button id="btnSubmit"className="btn btn-submit">Create my love poem</button>
                </form>
                <div className="ChatOutput" id="ChatOutput">
                <img id="copyBtn" alt="clipboard-img" src={copyBtn} onClick = {copyDivToClipboard}></img>
                <div className="poemOutput">{PoemText}</div>
                </div>
                <Link to="/" className="link">
                    <button className="btn btn-giftgpt">
                        Craft a poem for your Valentine using Poem GPT
                    </button>     
                 </Link>
            </div>            
            <div className ="footer">
                Made with 💙 by <a class="link-footer"href="manasbam.com" >Manas</a> and <a class="link-footer" href="github.com/sheldor07" >Yajat</a> - a college.ai product
            </div>
        </div>
    )
}
