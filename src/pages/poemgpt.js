// Description: This file contains the code for the poem generator page

// Import statements
import React, { useState } from "react";
import "../styles/styles.css";
import copyBtnUnselected from "../media/clipUnselect.svg";
import copyBtnSelected from "../media/clipSelect.svg";
import { Link } from "react-router-dom";

// Main function
export function PoemGPT() {
  // Function to sleep for a given time
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Function to animate the placeholder text
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

  // State variables
  let [valentineName, setValentineName] = useState("");
  let [message, setMessage] = useState("");
  let [PoemText, setPoemText] = useState("");

  // Function to handle valentine name change
  const handleValentineNameChange = (event) => {
    setValentineName(event.target.value);
  };

  // Function to handle message change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    generatePoem(valentineName, message);
  };

  // Function to generate poem
  const generatePoem = (valentineName, message) => {
    // If the valentine name is empty, return
    if (valentineName === "") {
      return;
    }
    // Disable the submit button and show a spinner
    let btnSubmit = document.getElementById("btnSubmit");
    let spinningContainer = document.createElement("div");
    let spinningText = document.createElement("i");
    spinningText.setAttribute("class", "fa fa-circle-o-notch fa-spin");
    spinningContainer.appendChild(spinningText);
    btnSubmit.innerText = "";
    btnSubmit.appendChild(spinningContainer);
    btnSubmit.disabled = true;
    const data = {
      // Check if the message is empty
      prompt: message
        ? `Write a Valentine's Day poem for ${valentineName}, incorporating the words '${message}'Express your love and affection in three stanzas, using deep language and metaphors and then explain the poem in 1 paragraph. Do not use the word stanza in your poem.`
        : `Write a Valentine's Day poem for ${valentineName}. Express your love and affection in three stanzas, using deep language and metaphors and then explain the poem in 1 paragraph. Do not use the word stanza in your poem.`,
    };
    // Send a POST request to the API
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
        // If the response is an error, resend request to generate a new poem
        if (text === "Internal Server Error") {
          generatePoem(valentineName, message);
        } else {
          // Else, show the poem
          await placeholderAnimation(text);
          // Remove the spinner and enable the submit button
          btnSubmit.removeChild(spinningContainer);
          btnSubmit.innerText = "Create love poem";
          btnSubmit.disabled = false;
        }
      });
  };

  // Function to copy the poem to clipboard
  function copyDivToClipboard() {
    // Copy the poem to clipboard
    navigator.clipboard.writeText("Created using valentinegpt.com\n\n" + document.getElementById("ChatOutput").innerText);
    // Change the copy button to a selected state
    document.getElementById("copyBtn").src = copyBtnSelected;
    // Change the copy button back to unselected state after 200ms
    setTimeout(() => {
      document.getElementById("copyBtn").src = copyBtnUnselected;
    }, 200);
  }

  // Return the JSX
  return (
    <div className="App">
      <div className="Header">
        <div className="header-text">
          Valentine GPT
        </div>
        <div className="subheader-text">
          Generating Love,<br></br>One Word At A Time ❤️
        </div>
        <div className="count-text">
          Generated 500,000+ words so far
        </div>
      </div>
      <div className="ChatForm">
        <div className="chat-text">
          Make your poem unique by entering special words and your Valentine's
          name. Our advanced GPT will create a masterpiece just for you.
        </div>
        <form onSubmit={handleSubmit}>
          <input className="form-input" type="text" placeholder="Valentine's Name" value={valentineName} onChange={handleValentineNameChange}/>
          <input className="form-input" type="text" placeholder="Include things you want to tell your lover, keep it short and simple" value={message} onChange={handleMessageChange}/>
          <button id="btnSubmit" className="btn btn-submit">
            Create my love poem
          </button>
        </form>
        <div className="ChatOutput" id="ChatOutput">
          <img id="copyBtn" alt="clipboard-img" src={copyBtnUnselected} onClick={copyDivToClipboard}></img>
          <div className="poemOutput">{PoemText}</div>
        </div>
        <Link to="/" className="link">
          <button className="btn btn-giftgpt">
            Unlock the Mysteries of Love with the Love Oracle!
          </button>
        </Link>
      </div>
      <div className="footer">
      Made with 💙 by{" "}
        <a className="link-footer" href="https://www.manasbam.com" target="_blank" rel="noreferrer">
          Manas
        </a>
        {" "}and{" "}
        <a  className="link-footer" href="https://www.github.com/sheldor07" target="_blank" rel="noreferrer">
          Yajat
        </a>
        {" "}- a college.ai product
      </div>
    </div>
  );
}
