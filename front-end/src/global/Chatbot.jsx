import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";
import chatbotIcon from "./chatbot.jpg";
 
const ServiceBox = ({ serviceNumber, serviceName, onClick }) => {
  return (
    <div className="service-box-container">
      <div className="service-box">
        <span onClick={() => onClick(serviceNumber)}>{serviceName}</span>
      </div>
    </div>
  );
};
 
const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [uid, setUid] = useState(null);
  const [creatingTicket, setCreatingTicket] = useState(false);
  const [wrongTicketAttempts, setWrongTicketAttempts] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);
 
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
 
  const TypingIndicator = () => {
    return (
      <div className="typing-indicator-container">
        <div className="typing-indicator-dot" />
        <div className="typing-indicator-dot" />
        <div className="typing-indicator-dot" />
      </div>
    );
  };
 
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
 
  useEffect(() => {
    if (isChatbotOpen) {
      setIsBotTyping(true);
      setTimeout(() => {
        const welcomeMessages = [
          "Welcome!😀	 How can I help you today?",
          "Hi there! What can I do for you?😇	",
          "Hello!😊	 Let me know how I can assist you.",
          "Hi! I'm Mr. Chatbot 😎 Nice to meet you! 👋",
        ];
 
        const randomWelcomeMessage =
          welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
 
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "bot",
            content: randomWelcomeMessage,
          },
        ]);
 
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "bot",
              serviceOnly: true,
              content: (
                <div>
                  <ServiceBox
                    serviceNumber={1}
                    serviceName="Check ticket status"
                    onClick={handleServiceClick}
                  />
                  <ServiceBox
                    serviceNumber={2}
                    serviceName="Create a ticket"
                    onClick={handleServiceClick}
                  />
                  <ServiceBox
                    serviceNumber={3}
                    serviceName="Start process"
                    onClick={handleServiceClick}
                  />
                </div>
              ),
            },
          ]);
        }, 600);
        setIsBotTyping(false);
      }, 800);
    } else {
      setMessages([]);
    }
  }, [isChatbotOpen]);
 
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
 
  const showServicesAndAskForMoreHelp = () => {
    setIsBotTyping(true);
    setTimeout(() => {
      setIsBotTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "bot",
          content: (
            <div>
              <p>Is there anything else you need help with?</p>
              <div className="services-container">
                <ServiceBox
                  serviceNumber={1}
                  serviceName="Check ticket status"
                  onClick={handleServiceClick}
                />
                <ServiceBox
                  serviceNumber={2}
                  serviceName="Create a ticket"
                  onClick={handleServiceClick}
                />
                <ServiceBox
                  serviceNumber={3}
                  serviceName="Start process"
                  onClick={handleServiceClick}
                />
              </div>
            </div>
          ),
        },
      ]);
    }, 1500);
  };
 
  const checkTicketStatus = async (ticketNumber) => {
    try {
      setIsBotTyping(true); // set bot typing status to true
      const response = await axios.get(
        `http://127.0.0.1:8000/check-ticket-status/${ticketNumber}`
      );
 
      const success = response.data.success;
      if (success) {
        const status = response.data.status;
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "bot",
            content: `The status of ticket number ${ticketNumber} is: ${status}`,
          },
        ]);
        setWrongTicketAttempts(0);
        setIsBotTyping(false); // set bot typing status to false
        return true;
      } else {
        const errorMessage = response.data.message;
        if (wrongTicketAttempts >= 1) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "bot", content: errorMessage },
          ]);
          setWrongTicketAttempts(0);
          setIsBotTyping(false); // set bot typing status to false
          return false;
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "bot",
              content: `Please enter the correct ticket number you want to check.`,
            },
          ]);
          setWrongTicketAttempts(wrongTicketAttempts + 1);
          setIsBotTyping(false); // set bot typing status to false
          return false;
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setIsBotTyping(false); // set bot typing status to false
      return false;
    }
  };
 
  const createTicket = async (title, description, uid) => {
    try {
      setIsBotTyping(true);
      const response = await axios.post("http://127.0.0.1:8000/create-ticket", {
        title,
        description,
        uid,
      });
      setIsBotTyping(false);
 
      const success = response.data.success;
      if (success) {
        const ticketNumber = response.data.ticketNumber;
        setIsBotTyping(true);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "bot",
            content: `Your ticket has been created. The ticket number is ${ticketNumber}.`,
          },
        ]);
        setIsBotTyping(false);
        showServicesAndAskForMoreHelp();
      } else {
        const errorMessage = response.data.message;
        setIsBotTyping(true);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "bot", content: errorMessage },
        ]);
        setIsBotTyping(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
 
  const handleServiceClick = (serviceNumber) => {
    if (serviceNumber === 1) {
      setIsBotTyping(true);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "bot",
            content: "Please enter the ticket number you want to check.",
          },
        ]);
        setIsBotTyping(false);
      }, 1000);
    } else if (serviceNumber === 2) {
      setCreatingTicket(true);
      setTitle(null);
      setDescription(null);
      setUid(null);
 
      setIsBotTyping(true);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "bot",
            content: "Please provide a brief title for your ticket.",
          },
        ]);
        setIsBotTyping(false);
      }, 1000);
    } else if (serviceNumber === 3) {
      // implement start process
    } else {
      setIsBotTyping(true);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "bot",
            content:
              "I'm sorry, I didn't understand that. Please choose a valid service number.",
          },
        ]);
        setIsBotTyping(false);
      }, 1000);
    }
  };
 
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
 
      if (
        messages.length > 0 &&
        messages[messages.length - 1].role === "bot" &&
        (messages[messages.length - 1].content ===
          "Please enter the ticket number you want to check." ||
          messages[messages.length - 1].content ===
            "Please enter the correct ticket number you want to check.")
      ) {
        const ticketNumber = input;
        setIsBotTyping(true);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "user", content: input },
        ]);
        setIsBotTyping(false);
        setInput("");
        const success = await checkTicketStatus(ticketNumber);
        if (!success && wrongTicketAttempts >= 1) {
          showServicesAndAskForMoreHelp();
        }
      } else if (creatingTicket) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "user", content: input },
        ]);
        setInput("");
 
        if (!title) {
          setTitle(input);
          setIsBotTyping(true);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "bot",
              content: "Please provide a detailed description for your ticket.",
            },
          ]);
          setIsBotTyping(false);
        } else if (!description) {
          setDescription(input);
          setIsBotTyping(true);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "bot",
              content: "Please provide your windows login username",
            },
          ]);
          setIsBotTyping(false);
        } else if (!uid) {
          console.log("uid:", input);
          setUid(input);
          setIsBotTyping(true);
          await createTicket(title, description, input);
          setIsBotTyping(false);
          setCreatingTicket(false);
        }
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "user", content: input },
        ]);
        setIsBotTyping(true);
        setInput("");
        setIsBotTyping(false);
      }
    }
  };
 
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  return (
    <div className="chatbot-container">
      <div
        className={`chatbot ${
          isChatbotOpen ? "chatbot-open" : "chatbot-closed"
        }`}
      >
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div
              className="bot-message-image"
              style={{
                backgroundImage: `url(${chatbotIcon})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <span>Chatbot</span>
          </div>
          <button onClick={toggleChatbot}>&times;</button>
        </div>
        <div className="chatbot-content">
          {messages.map((message, index) => (
            <div key={index} className={`${message.role}-message-container`}>
              <div
                className={`message-wrapper ${
                  message.role === "bot" ? "bot-message-wrapper" : ""
                }`}
              >
                {message.role === "bot" && !message.serviceOnly && (
                  <div className="bot-message-icon">
                    <img
                      src={chatbotIcon}
                      alt="chatbot"
                      className="bot-message-image"
                    />
                    <span className="message-sender">Chatbot</span>
                  </div>
                )}
 
                {message.services ? (
                  <div className="services-container">{message.services}</div>
                ) : (
                  <p className={`${message.role}-message`}>{message.content}</p>
                )}
              </div>
              {message.role === "user" && (
                <span className={`${message.role}-message-sender`}></span>
              )}
            </div>
          ))}
          {isBotTyping && <TypingIndicator />}
 
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-footer">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message and press Enter"
            className="chatbot-input"
          />
        </div>
      </div>
      {!isChatbotOpen && (
        <div>
          <div className="popup-message">Want to see what I can do?🤖 </div>
          <button
            onClick={toggleChatbot}
            className="chatbot-icon"
            style={{
              backgroundImage: `url(${chatbotIcon})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      )}
    </div>
  );
};
 
export default Chatbot;