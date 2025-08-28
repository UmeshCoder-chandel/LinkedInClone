import React from "react";
import Card from "../components/Card";
import { Convertion } from "../components/Covertion";
import { Advertisement } from "../components/Advertiement";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageIcon from "@mui/icons-material/Image";

export default function Messages() {
  return (
    <div className="px-5 xl:px-32 py-8 flex gap-6 w-full mt-20 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 min-h-screen">
      <div className="flex w-full gap-6">
        {/* Left Section */}
        <div className="w-full md:w-[72%]">
          <div className="backdrop-blur-xl bg-white/40 shadow-lg rounded-2xl overflow-hidden border border-white/20">
            {/* Header */}
            <div className="border-b border-white/30 px-5 py-3 font-semibold text-xl bg-white/10">
              Messaging
            </div>

            {/* Tabs */}
            <div className="border-b border-white/30 px-5 py-2">
              <div className="py-1 px-4 cursor-pointer hover:bg-blue-600 bg-blue-700 font-medium flex items-center gap-2 w-fit rounded-full text-white text-sm">
                Focused <ArrowDropDownIcon fontSize="small" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row w-full">
              {/* Chat List */}
              <div className="h-[600px] overflow-auto w-full md:w-[38%] border-r border-white/20">
                <Convertion />
                <Convertion />
                <Convertion />
                <Convertion />
              </div>

              {/* Chat Box */}
              <div className="w-full md:w-[62%] flex flex-col">
                {/* Chat Header */}
                <div className="py-3 px-4 border-b border-white/20 flex justify-between items-center bg-white/10">
                  <div>
                    <p className="text-sm font-semibold">User 1</p>
                    <p className="text-xs text-gray-600">hi this is user 1</p>
                  </div>
                  <MoreHorizIcon className="cursor-pointer" />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {/* User message */}
                  <div className="flex items-start gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"
                      alt="user"
                    />
                    <div className="max-w-[75%]">
                      <div className="text-sm font-semibold">User 1</div>
                      <div className="text-sm mt-1 p-2 rounded-xl bg-white/70 backdrop-blur-md shadow-sm">
                        this is message 1
                      </div>
                      <img
                        className="w-[220px] h-[160px] mt-2 rounded-xl shadow-md"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"
                        alt="attachment"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"
                      alt="user"
                    />
                    <div className="max-w-[75%]">
                      <div className="text-sm font-semibold">User 1</div>
                      <div className="text-sm mt-1 p-2 rounded-xl bg-white/70 backdrop-blur-md shadow-sm">
                        this is message 1
                      </div>
                      <img
                        className="w-[220px] h-[160px] mt-2 rounded-xl shadow-md"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"
                        alt="attachment"
                      />
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-white/20 p-3 bg-white/10">
                  <textarea
                    className="bg-white/50 backdrop-blur-md outline-none rounded-xl text-sm w-full p-3 resize-none shadow-sm"
                    rows={3}
                    placeholder="Write a message..."
                  ></textarea>

                  <div className="flex justify-between items-center mt-2">
                    <label
                      htmlFor="messageImage"
                      className="cursor-pointer hover:opacity-80"
                    >
                      <ImageIcon />
                    </label>
                    <input id="messageImage" type="file" className="hidden" />

                    <button className="px-5 py-2 rounded-full bg-blue-700 text-white text-sm hover:bg-blue-800 transition">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:block md:w-[25%]">
          <div className="sticky top-24">
            <Advertisement />
          </div>
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5000"); // backend URL

// export default function Messages() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [selectedUser, setSelectedUser] = useState("USER_ID_2"); // dynamic later
//   const currentUser = "USER_ID_1"; // from auth context

//   // Fetch old messages
//   useEffect(() => {
//     const fetchMessages = async () => {
//       const res = await axios.get(
//         `http://localhost:5000/api/messages/${currentUser}/${selectedUser}`
//       );
//       setMessages(res.data);
//     };
//     fetchMessages();
//   }, [selectedUser]);

//   // Listen for real-time messages
//   useEffect(() => {
//     socket.on("receiveMessage", (message) => {
//       if (
//         (message.sender === currentUser && message.receiver === selectedUser) ||
//         (message.sender === selectedUser && message.receiver === currentUser)
//       ) {
//         setMessages((prev) => [...prev, message]);
//       }
//     });
//     return () => socket.off("receiveMessage");
//   }, [selectedUser]);

//   // Send message
//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMsg = {
//       sender: currentUser,
//       receiver: selectedUser,
//       text: input,
//     };

//     // Save in DB
//     await axios.post("http://localhost:5000/api/messages", newMsg);

//     // Emit to socket
//     socket.emit("sendMessage", newMsg);

//     setInput("");
//   };

//   return (
//     <div className="flex flex-col h-[80vh] border rounded-xl">
//       {/* Chat Box */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex ${
//               msg.sender === currentUser ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`p-2 rounded-lg max-w-xs ${
//                 msg.sender === currentUser
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="p-3 border-t flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border rounded-lg"
//         />
//         <button
//           onClick={sendMessage}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
