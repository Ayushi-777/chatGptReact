import React, { useState, useEffect } from "react";
import "./chatbot.css";
import childImage from "../images/child.svg";
import robotImage from "../images/robot.svg";
const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  const [reply, setReply] = useState([]);

  const [userInput, setUserInput] = useState("");

  const [name, setName] = useState("");

  const [enableAPI] = useState(true); // Set this flag to control API calls

  useEffect(() => {
    // Fetch the name from the API conditionally

    if (enableAPI) {
      fetch("http://127.0.0.1:8000/home")
        .then((response) => response.json())

        .then((data) => {
          if (data.name) {
            setName(data.name);
          }
        })

        .catch((error) => {
          console.error("Error fetching name:", error);
        });
    }

    // Initialize the chat with a welcome message

    // botReply("Write your query here!", true);
  }, [name, enableAPI]);

  const handleMessageSubmit = () => {
    var name1;
    if (userInput.trim() !== "") {
      sendMessage(userInput);
      if (userInput === "hi" || userInput === "hello") {
        name1 = "Hello! How can I assist you today?";
        botReply(userInput, ` ${name1} `);
      } else if (userInput.length < 7) {
        name1 = userInput + "! How can I assist you today? ";
        botReply(userInput, `Hello ${name1} `);
      } else if (userInput.length > 7 && userInput.length < 12) {
        name1 = `"I am sorry, but I don't have information at the moment .Please try some other query"`;
        botReply(userInput, ` ${name1} `);
      } else {
        botReply(userInput, `Ans: ${userInput}`);
      }
      setUserInput("");
    }
  };

  const sendMessage = (text) => {
    setReply([...reply, { text, isUser: true }]);

    // setMessages([...messages, { text, isUser: true }]);

    if (enableAPI) {
      // Send a POST request to your backend API conditionally

      fetch(`http://127.0.0.1:8000/post_data/${name}`, {
        method: "POST",

        body: JSON.stringify({ message: text }),

        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())

        .then((data) => {
          // Handle the API response if needed
        })

        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  const botReply = (userInput, botResponse) => {
    // Created a box for the user's input
    const userBox = { text: userInput, isUser: true };
    // Created a box for the bot's response
    const botBox = { text: botResponse, isUser: false };

    // Append both boxes to the messages
    setMessages([...messages, userBox, botBox]);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleMessageSubmit();
    }
  };

  var t = 0;

  return (
    <div className="chatbot-main">
      <div className="chatbot-container">
        <h2 className="query" style={{ color: "#fff" }}>
          Ask Your query!{" "}
        </h2>

        <div className="chatbot-messages">
          {messages
            .filter((message) => message && message.text) // Filter out null or empty messages
            .map((message, index) => (
              <div
                key={index}
                className={`message ${message.isUser ? "user" : "bot"} ${
                  message.isUser ? "user-question" : "bot-reply"
                }`}
              >
              
                {t === 0
                  ? (() => {
                      t = 1;
                    })() // Set t to 1 when condition is true
                  : (() => {
                      t = 0;
                    })() // Set t to 0 when condition is false
                }
                <div className="flexContainer">
                  <img
                    src={t === 0 ? robotImage : childImage}
                    className="child-logo"
                    alt="logo"
                  />
                  {message.text}
                </div>

                {/* <FaceIcon />{message.text} */}
              </div>
            ))}
        </div>
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask your question here?"
        />
        <button onClick={handleMessageSubmit}>
          <span role="img" aria-label="Send">
            &#10148;
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
