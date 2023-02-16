import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

let socket;

export default function Chat({ match }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const mensajes = useRef(null);

  const scrollToBottom = () => {
    mensajes.current?.scrollIntoView({ block: "end" });
  };

  useEffect(() => {
    setMessages(match.chat);
  }, []);

  useEffect(() => {
    socketInitializer();
    scrollToBottom();
  }, [message, messages]);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg) => {
      console.log("msg", msg);
      setMessages([...messages, { author: msg.author, message: msg.message }]);
    });
    // socket.off("newIncomingMessage", message);
  };

  const sendMessage = async () => {
    socket.emit("createdMessage", { author: match.myUser, message });
    setMessages([...messages, { author: match.myUser, message }]);

    await axios.put("/api/match", {
      id: match.id,
      mensaje: message,
      author: match.myUser,
    });

    setMessage("");
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <div className="gap-4 flex flex-col items-center justify-around w-screen h-[90%] border-t border-gray-600">
      <div className="flex flex-col bg-gray-900 w-full h-full shadow-md text-white">
        <div className="h-full last:border-b-0 overflow-y-scroll scroll-auto">
          {messages.map((msg, i) => {
            return (
              <div className="w-full py-1 px-2 border-gray-200" key={i}>
                <div className="chat-message">
                  {msg.author == match.myUser ? (
                    <div class="chat-message">
                      <div class="flex items-end justify-end">
                        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div>
                            <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white text-base">
                              {msg.message}
                            </span>
                          </div>
                          {/* <span>{msg.author}</span> */}
                        </div>
                        {/* <img src={match.myUserImages[0]} alt="My profile" class="w-6 h-6 rounded-full order-2"/> */}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 text-base">
                            {msg.message}
                          </span>
                        </div>
                        {/* <span>{msg.author}</span> */}
                      </div>
                      <img
                        src={match.user.images[0]}
                        alt="My profile"
                        class="w-6 h-6 rounded-full order-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={mensajes}></div>
        </div>
        <div className=" w-full flex rounded-bl-md p-2">
          <input
            type="text"
            placeholder="Escribí un mensaje..."
            value={message}
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-md py-3"
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={handleKeypress}
          />
          <div className="border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
            <button
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              onClick={() => {
                sendMessage();
              }}
            >
              {/* <span class="font-bold">Enviar</span> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
