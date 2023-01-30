import { useEffect, useState } from "react";
import io from "Socket.IO-client";
const socket = io("http://localhost:3000/api/socket");
console.log(socket);

const chat = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("message", message);
  };

  return (
    <div className="h-screen">
      <form onClick={handleSubmit}>
        <input
          className="bg.-black"
          placeholder="Type something"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default chat;
