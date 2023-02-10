import React, { useState } from "react";
import "../styles/loveoracle.css";
import { Link } from "react-router-dom";
import copyBtnUnselected from "../media/clipUnselect.svg";
import copyBtnSelected from "../media/clipSelect.svg";

export function LoveOracle() {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function placeholderAnimation(text) {
    let total_time = 20000;
    let sleep_time = total_time / text.length;

    let curr_text = "";
    for (const char of text) {
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
  const generateQuery = async (loveQuestion) => {
    let btnSubmit = document.getElementById("btnSubmit");
    console.log("query", loveQuestion);
    if (loveQuestion === "") {
      return;
    }
    let spinningContainer = document.createElement("div");
    let spinningText = document.createElement("i");
    spinningText.setAttribute("class", "fa fa-circle-o-notch fa-spin");
    spinningContainer.appendChild(spinningText);
    btnSubmit.innerText = "";
    btnSubmit.appendChild(spinningContainer);
    btnSubmit.disabled = true;
    console.log(`Generating advice for love question: ${loveQuestion}`);
    const data = {
      prompt: `In the following conversation you are Love Oracle. You will answer all my relationship problems, concerns and issues to the best of your ability. You will provide relevant, personal and emotional advice which should also be in the style of an Oracle. You can explain by analogy, or any other means you see necessary but the advice should be actionable and tangible. You are the Oracle of Love. If my question does not pertain to love, relationships, friendships or any other human relation, please answer with: "I am not Jesus, I can't answer everything" My question is ${loveQuestion}`,
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
      .then(async (text) => {
        if (text === "Internal Server Error") {
          generateQuery(loveQuestion);
        } else {
          await placeholderAnimation(text);
          btnSubmit.removeChild(spinningContainer);
          btnSubmit.innerText = "Ask Love Oracle";
          btnSubmit.disabled = false;
        }
      });
  };

  const setQueryTextAndGenerate = (event) => {
    let btnSubmit = document.getElementById("btnSubmit");
    console.log(btnSubmit);
    if (btnSubmit.disabled === false) {
      let text = event.target.innerText;
      setQuery(text);
      console.log("text type", text);
      generateQuery(text);
      event.preventDefault();
      console.log("busy");
    } else {
      console.log("disabled try again later");
    }
  };
  function copyDivToClipboard() {
    navigator.clipboard.writeText(
      "Created using valentinegpt.com\n\n" +
        document.getElementById("ChatOutput").innerText
    );
    let copyBtn = document.getElementById("copyBtn");
    copyBtn.src = copyBtnSelected;
    setTimeout(() => {
      copyBtn.src = copyBtnUnselected;
    }, 200);
  }

  return (
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
          <button id="btnSubmit" className="btn btn-submit">
            Ask Love Oracle
          </button>
        </form>
        <div className="chat-text">or try one of these questions:</div>
        <div className="suggested-questions">
          <div
            className="suggested-question-text"
            onClick={setQueryTextAndGenerate}
          >
            overcoming a broken heart?
          </div>
          <div
            className="suggested-question-text"
            onClick={setQueryTextAndGenerate}
          >
            conflicts in a relationship?
          </div>
          <div
            className="suggested-question-text"
            onClick={setQueryTextAndGenerate}
          >
            tips for a strong relationship?
          </div>
          <div
            className="suggested-question-text"
            onClick={setQueryTextAndGenerate}
          >
            challenges of long distance relationships?
          </div>
          <div
            className="suggested-question-text"
            onClick={setQueryTextAndGenerate}
          >
            finding closure after a breakup?
          </div>
        </div>
        <div className="ChatOutput" id="ChatOutput">
          <img
            id="copyBtn"
            alt="clipboard-img"
            src={copyBtnUnselected}
            onClick={copyDivToClipboard}
          ></img>
          <div className="poemOutput">{response}</div>
        </div>
        <Link to="/poem-gpt" className="link">
          <button className="btn btn-giftgpt">
            Craft a poem for your Valentine using Poem GPT
          </button>
        </Link>
      </div>
      <div className="footer">
        Made with 💙 by{" "}
        <a class="link-footer" href="https://www.manasbam.com" target="_blank" rel="noreferrer">
          Manas
        </a>{" "}
        and{" "}
        <a
          class="link-footer"
          href="https://www.github.com/sheldor07"
          target="_blank"
          rel="noreferrer"
        >
          Yajat
        </a>{" "}
        - a college.ai product
      </div>
    </div>
  );
}
