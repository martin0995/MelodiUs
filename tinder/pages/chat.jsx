import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

let socket;

export default function Chat({ match }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(match.chat);
  }, []);

  useEffect(() => {
    socketInitializer();
    console.log("MENSAJES>>", messages);
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
    console.log("resultado", { author: match.myUser, message });

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
    <div className="gap-4 flex flex-col items-center justify-around w-screen h-[87%]">
      <div className="flex flex-col bg-gray-800 w-full h-full shadow-md text-white">
        <div className="h-full last:border-b-0 overflow-y-scroll scroll-auto">
          {messages.map((msg, i) => {
            return (
              <div
                className="w-full py-1 px-2 border-b border-gray-200"
                key={i}
              >
                {msg.author} : {msg.message}
              </div>
            );
          })}
        </div>
        <div className="border-t bg-verdedos w-full flex rounded-bl-md">
          <input
            type="text"
            placeholder="Escribí un mensaje..."
            value={message}
            className="outline-none py-2 px-2 rounded-bl-md flex-1 bg-verdedos"
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={handleKeypress}
          />
          <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
            <button
              className="group-hover:text-white px-3 h-full bg-verdedos"
              onClick={() => {
                sendMessage();
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
