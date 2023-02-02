import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

let socket;

export default function Chat({ match }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { data: session, status } = useSession();

  console.log("MATCH CHAT>>", match);

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
    socket.emit("createdMessage", { author: chosenUsername, message });
    setMessages([...messages, { author: chosenUsername, message }]);
    console.log("resultado", { author: chosenUsername, message });

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
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-500">
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        <p className="font-bold text-white text-xl">
          Your username: {match.user.name}
        </p>
        <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md ">
          <div className="h-full last:border-b-0 overflow-y-scroll">
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
          <div className="border-t border-gray-300 w-full flex rounded-bl-md">
            <input
              type="text"
              placeholder="New message..."
              value={message}
              className="outline-none py-2 px-2 rounded-bl-md flex-1"
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={handleKeypress}
            />
            <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
              <button
                className="group-hover:text-white px-3 h-full"
                onClick={() => {
                  sendMessage();
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
