import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Convertion } from "../components/Covertion";
import { Advertisement } from "../components/Advertiement";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageIcon from "@mui/icons-material/Image";
import axios from 'axios'
export default function Messages() {

  const [conversations, setConversations] = useState([]);

  const [ownData, setownData] = useState(null)

  const [activeCover, setActiveCover] = useState(null)
  const [selectedCover, setselectedCover] = useState(null)

  const [messages, setMessages] = useState([]);

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

  const fetchMessages = async () => {
    await axios.get(`http://localhost:4000/api/messages/${activeCover}`, { withCredentials: true }).then(res => {
      console.log(res);
      setMessages(res.data.message)

    }).catch(err => {
      console.log(err);
      alert("some went wrong")

    })
  }

  const fetchConversation = async () => {
    await axios.get(`http://localhost:4000/api/chats/get-chat`, { withCredentials: true }).then(res => {
      console.log(res.data.conversations);
      setConversations(res.data.conversations);
      if (res.data?.conversation?.length) {

       setActiveCover(res.data?.conversation[0]?._id)

      let ownId = ownData?._id;
      let arr = res.data?.conversation[0]?.members?.filter((it) => it._id !== ownId);
      setselectedCover(arr[0])
      }
    }).catch(err => {
      // console.log(err);
      alert("some erroe in conversation")

    })
  }

  // console.log(selectedCover);


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
                {
                  conversations.map((item, index) => {
                    return (

                      <Convertion activeCover={activeCover} handleSelectedCover={handleSelectedCover} item={item} key={item._id} index={index} ownData={ownData} />
                    )
                  })
                }
              </div>

              {/* Chat Box */}
              <div className="w-full md:w-[62%] flex flex-col">
                {/* Chat Header */}
                <div className="py-3 px-4 border-b border-white/20 flex justify-between items-center bg-white/10">
                  <div>
                    <p className="text-sm font-semibold">{selectedCover?.name}</p>
                    <p className="text-xs text-gray-600">{selectedCover?.headline}</p>
                  </div>
                  <MoreHorizIcon className="cursor-pointer" />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {/* User message */}
                  <div className="flex items-start gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={selectedCover?.profilePic}
                      alt="user"
                    />
                    <div className="max-w-[75%]">
                      <div className="text-sm font-semibold">{selectedCover?.name}</div>
                      <div className="text-sm mt-1 p-2 rounded-xl bg-white/70 backdrop-blur-md shadow-sm">
                        {selectedCover?.headline}
                      </div>
                    </div>
                  </div>


                  {
                    messages.map((item, index) => {
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="shrink-0">
                            <img className="w-10 h-10 rounded-full object-cover"
                              src={item?.sender?.profilePic}
                              alt="user"
                            />
                          </div>
                          <div className="max-w-[75%]">
                            <div className="text-sm font-semibold">{item?.sender?.name}</div>
                            <div className="text-sm mt-1 p-2 rounded-xl bg-white/70 backdrop-blur-md shadow-sm">
                              {item?.members}
                            </div>

                            {
                              item?.picture && <div>                  
                                  <img
                              className="w-[220px] h-[160px] mt-2 rounded-xl shadow-md"
                              src={item?.picture}
                              alt="attachment"
                            />
                            </div>
                            }

                          </div>
                        </div>
                      )
                    })
                  }
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


