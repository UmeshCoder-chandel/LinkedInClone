import React, { useState } from "react";
import axios from "axios";

const MessageModal = ({ selfData, userData }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      await axios.post("https://linkedinclone-backend-i2bq.onrender.com/api/chats/add-chat", {
        recieverId: userData?._id,
        message: message,
      }, { withCredentials: true });
    window.location.reload();
    } catch (err) {
      console.error("Error sending message", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5">
      <div className="w-full mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Message"
          cols={10}
          rows={5}
        ></textarea>
      </div>
      <div
        onClick={handleSendMessage}
        className={`${
          loading ? "bg-gray-400" : "bg-blue-950"
        } text-white w-fit py-1 px-3 cursor-pointer rounded-2xl`}
      >
        {loading ? "Sending..." : "Send"}
      </div>
    </div>
  );
};

export default MessageModal;
