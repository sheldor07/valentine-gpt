import React, { useState } from "react";
import '../styles/loveoracle.css'
import {Link} from 'react-router-dom'

export function LoveOracle() {
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async function placeholderAnimation(text) {
        let total_time = 20000;
        let sleep_time = total_time / text.length;

        let curr_text = "";
        for (const char of text) {
            console.log(curr_text);
            setResponse(curr_text + char);
            curr_text += char;
            if (char === "\n") {
            await sleep(2 * sleep_time);
            }
            if (char !== " ") {
            await sleep(sleep_time);
            }
        }
    }
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        generateQuery(query);
    };
    const generateQuery = (loveQuestion) => {
        console.log(
            `Generating advice for love question: ${loveQuestion}`
        );
        const data = {
            prompt:`In the following conversation you are Love Oracle. You will answer all my relationship problems, concerns and issues to the best of your ability. You will provide relevant, personal and emotional advice which should also be in the style of an Oracle. You can explain by analogy, or any other means you see necessary but the advice should be actionable and tangible. You are the Oracle of Love. Begin your responses with Love Oracle.In the following conversation you are Love Oracle. You will answer all my relationship problems, concerns and issues to the best of your ability. You will provide relevant, personal and emotional advice which should also be in the style of an Oracle. You can explain by analogy, or any other means you see necessary but the advice should be actionable and tangible. You are the Oracle of Love. Begin your responses with Love Oracle.In the following conversation you are Love Oracle. You will answer all my relationship problems, concerns and issues to the best of your ability. You will provide relevant, personal and emotional advice which should also be in the style of an Oracle. You can explain by analogy, or any other means you see necessary but the advice should be actionable and tangible. You are the Oracle of Love. Begin your responses with Love Oracle. My question is ${loveQuestion}`
        };
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
        .then((text) => {
            console.log(text);
            placeholderAnimation(text);
        });
    };
    
    function setQueryTextAndGenerate(text){
        setQuery(text);
        // generate(text);
    }
    return(
        <div className="App">   
            <div className="Header">
                <div className="header-text">Valentine GPT</div>
                <div className="subheader-text">
                    Guidance For A Tranquil Heart,<br></br>The Love Oracle Does Impart ❤️
                </div>
            </div>
            <div className="ChatForm">
                <div className="chat-text">
                    Dear one, what is it that troubles your heart today?
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                    className="form-input"
                    type="text"
                    placeholder="How can I find love that lasts?"
                    value={query}
                    onChange={handleQueryChange}
                    />
                    <button className="btn btn-submit">Ask Love Oracle</button>
                </form>
                <div className="chat-text">
                    or try one of these questions:
                </div>
                <div className="suggested-questions">
                    <div className="suggested-question-text">
                        overcoming a broken heart?
                    </div>
                    <div className="suggested-question-text" onClick={()=>{setQuery("conflicts in a relationship?")}}>
                        conflicts in a relationship?
                    </div>
                    <div className="suggested-question-text" onClick={()=>{setQuery("tips for a strong relationship?")}}>
                        tips for a strong relationship?
                    </div>
                    <div className="suggested-question-text" onClick={()=>{setQuery("challenges of long distance relationships?")}}>
                        challenges of long distance relationships?
                    </div>
                    <div className="suggested-question-text" onClick={()=>{setQuery("finding closure after a breakup?")}}>
                        finding closure after a breakup?
                    </div>
                </div>
                <div className="ChatOutput">
                    <div className="poemOutput">{response}</div>
                </div>
                <button className="btn btn-giftgpt">
                    <Link to="/poem-gpt" className="link">
                        Craft a poem for your Valentine using Poem GPT
                    </Link>
                </button>
            </div>            
            <div className ="footer">
                a college.ai product
            </div>
        </div>
    )
}