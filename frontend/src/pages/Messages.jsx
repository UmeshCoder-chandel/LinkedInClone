import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { Convertion } from "../components/Covertion";
import { Advertisement } from "../components/Advertiement";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageIcon from "@mui/icons-material/Image";
import axios from 'axios'
import assets from "../assets";
import { toast } from "react-toastify";
import socket from "../../socket";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [ownData, setownData] = useState(null)
  const [activeCover, setActiveCover] = useState(null)
  const [selectedCover, setselectedCover] = useState(null)
  const [loading, setLoading] = useState(false)
  const [conversationsLoading, setConversationsLoading] = useState(true)
  const [messages, setMessages] = useState([]);
  const [imageLink, setImageLink] = useState(null)
  const [messageText, setMessageText] = useState("")
  const [sendingMessage, setSendingMessage] = useState(false)
  const [socketConnected, setSocketConnected] = useState(false)

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Socket connection management
  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Socket connected');
        setSocketConnected(true);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
        setSocketConnected(false);
      });

      return () => {
        socket.off('connect');
        socket.off('disconnect');
      };
    }
  }, [socket]);

  const handleSelectedCover = (id, userData) => {
    setActiveCover(id);
    setselectedCover(userData)
  }

  useEffect(() => {
    let userData = localStorage.getItem('userInfo')
    setownData(userData ? JSON.parse(userData) : null)
    fetchConversation()
  }, [])

  useEffect(() => {
    if (activeCover) {
      fetchMessages();
    }
  }, [activeCover])

  // Socket connection for real-time messaging
  useEffect(() => {
    if (socket && activeCover) {
      // Join the conversation room
      socket.emit("joinConversation", activeCover);
      
      socket.on("receiveMessage", (newMessage) => {
        console.log("Received new message:", newMessage);
        if (newMessage.conversation === activeCover) {
          // Check if this message is not already in the messages array
          setMessages(prev => {
            const messageExists = prev.some(msg => msg._id === newMessage._id);
            if (!messageExists) {
              return [...prev, newMessage];
            }
            return prev;
          });
        }
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [activeCover, socket]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`https://linkedinclone-backend-i2bq.onrender.com/api/messages/conversation/${activeCover}`, { withCredentials: true });
      console.log(res.data);
      setMessages(res.data.message || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch messages");
      setMessages([]);
    }
  } 

  const handleInputImage = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const maxSize = 10 * 1024 * 1024; // 5MB limit
    
    if (file.size > maxSize) {
      toast.error("Image size should be less than 10MB");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "linkdinClone");
    
    setLoading(true);
    setImageLink(null);

    try {
      const res = await axios.post("https://linkedinclone-backend-i2bq.onrender.com/api/upload", data);
      const imageUrl = res.data?.data;
      console.log(imageUrl);
      setImageLink(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  }

  const fetchConversation = async () => {
    try {
      const res = await axios.get(`https://linkedinclone-backend-i2bq.onrender.com/api/chats/get-chat`, { withCredentials: true });
      console.log(res.data.conversations);
      setConversations(res.data.conversations);
      
      if (res.data?.conversations?.length > 0) {
        const firstConversation = res.data.conversations[0];
        setActiveCover(firstConversation._id);

        let ownId = ownData?._id;
        let otherMember = firstConversation.members?.find((member) => member._id !== ownId);
        setselectedCover(otherMember);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch conversations");
    }
  }

  const handleSendMessage = async () => {
    if (!messageText.trim() && !imageLink) {
      toast.error("Please enter a message or upload an image");
      return;
    }

    if (!activeCover) {
      toast.error("Please select a conversation");
      return;
    }

    setSendingMessage(true);

    try {
      const messageData = {
        conversation: activeCover,
        message: messageText.trim(),
        picture: imageLink
      };

      const res = await axios.post(`https://linkedinclone-backend-i2bq.onrender.com/api/messages`, messageData, { withCredentials: true });
      console.log(res.data);

      // Clear the input fields
      setMessageText("");
      setImageLink(null);
      
      // Emit socket event for real-time messaging (this will trigger receiveMessage for other users)
      if (socket) {
        socket.emit("sendMessage", res.data);
      }

      toast.success("Message sent successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  const removeImage = () => {
    setImageLink(null);
  }

  return (
    <div className="px-5 xl:px-32 py-8 flex gap-6 w-full mt-20 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 min-h-screen">
      <div className="flex w-full gap-6">
        {/* Left Section */}
        <div className="w-full md:w-[72%]">
          <div className="backdrop-blur-xl bg-white/40 shadow-lg rounded-2xl overflow-hidden border border-white/20">
            {/* Header */}
            <div className="border-b border-white/30 px-5 py-3 font-semibold text-xl bg-white/10 flex items-center justify-between">
              <span>Messaging</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${socketConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {socketConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
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
                {conversations.length > 0 ? (
                  conversations.map((item, index) => (
                    <Convertion 
                      activeCover={activeCover} 
                      handleSelectedCover={handleSelectedCover} 
                      item={item} 
                      key={item._id} 
                      index={index} 
                      ownData={ownData} 
                    />
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No conversations yet
                  </div>
                )}
              </div>

              {/* Chat Box */}
              <div className="w-full md:w-[62%] flex flex-col">
                {/* Chat Header */}
                <div className="py-3 px-4 border-b border-white/20 flex justify-between items-center bg-white/10">
                  <div>
                    <p className="text-sm font-semibold">{selectedCover?.name || "Select a conversation"}</p>
                    <p className="text-xs text-gray-600">{selectedCover?.headline || "Start messaging"}</p>
                  </div>
                  <MoreHorizIcon className="cursor-pointer" />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto p-4 space-y-4 h-[400px]">
                  {messages.length > 0 ? (
                    messages.map((item, index) => {
                      const isOwnMessage = item?.sender?._id === ownData?._id;
                      
                      return (
                        <div key={index} className={`flex items-start gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
                          <div className="shrink-0">
                            <img 
                              className="w-10 h-10 rounded-full object-cover"
                              src={item?.sender?.profilePic}
                              alt="user"
                              crossOrigin="anonymous"
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = assets.image }}
                            />
                          </div>
                          <div className={`max-w-[75%] ${isOwnMessage ? 'text-right' : ''}`}>
                            <div className={`text-sm font-semibold ${isOwnMessage ? 'text-blue-600' : ''}`}>
                              {item?.sender?.name}
                            </div>
                            <div className={`text-sm mt-1 p-2 rounded-xl shadow-sm ${
                              isOwnMessage 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-white/70 backdrop-blur-md'
                            }`}>
                              {item?.message}
                            </div>

                            {item?.picture && (
                              <div className="mt-2">
                                <img
                                  className="w-[220px] h-[160px] rounded-xl shadow-md"
                                  src={item?.picture}
                                  alt="attachment"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-gray-500 mt-8">
                      {selectedCover ? "No messages yet. Start the conversation!" : "Select a conversation to start messaging"}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-white/20 p-3 bg-white/10">
                  {/* Image Preview */}
                  {imageLink && (
                    <div className="mb-3 relative">
                      <img
                        src={imageLink}
                        alt="preview"
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <textarea 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-white/50 backdrop-blur-md outline-none rounded-xl text-sm w-full p-3 resize-none shadow-sm"
                    rows={3}
                    placeholder="Write a message..."
                    disabled={sendingMessage}
                  />

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="messageImage"
                        className="cursor-pointer hover:opacity-80 p-2 rounded-full hover:bg-gray-100"
                        title="Attach image"
                      >
                        <ImageIcon />
                      </label>
                      <input 
                        id="messageImage" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleInputImage}
                        disabled={loading}
                      />
                      {loading && (
                        <span className="text-sm text-gray-500">Uploading...</span>
                      )}
                    </div>
                    
                    <button 
                      onClick={handleSendMessage} 
                      disabled={sendingMessage || (!messageText.trim() && !imageLink)}
                      className="px-5 py-2 rounded-full bg-blue-700 text-white text-sm hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {sendingMessage ? "Sending..." : "Send"}
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


