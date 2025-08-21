import React, { useState } from "react";
import { FaRegThumbsUp, FaRegCommentDots, FaShare } from "react-icons/fa";
import Card from "./Card";

export default function PostCard({ profile, item, personData ,key}) {
  const [seeMore, setSeeMore] = useState(false);
  const [comment, setComment] = useState(false);

  const desc = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus consequuntur enim.`;

  const handleComment = (e) => {
    e.preventDefault();
    setComment(!comment);
  };

  return (
    <Card padding={0}>
      {/* Header */}
      <div className="flex gap-3 p-4 items-center">
        <img
          className="rounded-full w-12 h-12 border border-gray-200 cursor-pointer hover:scale-105 transition"
          src={
            item?.user?.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"
          }
          alt=""
        />
        <div>
          <div className="text-base font-semibold">{item?.user?.name}</div>
          <div className="text-xs text-gray-500">{item?.user?.headline || "Software Engineer"}</div>
        </div>
      </div>

      {/* Description */}
      <div className="text-sm p-4 text-gray-700 leading-relaxed">
        {seeMore ? desc : `${desc.slice(0, 80)}...`}{" "}
        <span
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? "See Less" : "See More"}
        </span>
      </div>

      {/* Post Image */}
      <div className="w-full max-h-96 overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-md"
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKyyl57N-3um2nrU83PZgwIwA6uSzQnefrsg&s"
          }
          alt=""
        />
      </div>

      {/* Likes / Comments count */}
      <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaRegThumbsUp className="text-blue-500" /> 1 Like
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
          onClick={handleComment}
        >
          <FaRegCommentDots /> 1 Comment
        </div>
      </div>

      {/* Actions */}
      {profile && (
        <div className="flex border-t border-gray-200 text-gray-600">
          <div className="w-1/3 flex justify-center items-center gap-2 py-2 cursor-pointer hover:bg-gray-100">
            <FaRegThumbsUp /> <span>Like</span>
          </div>
          <div
            className="w-1/3 flex justify-center items-center gap-2 py-2 cursor-pointer hover:bg-gray-100"
            onClick={handleComment}
          >
            <FaRegCommentDots /> <span>Comment</span>
          </div>
          <div className="w-1/3 flex justify-center items-center gap-2 py-2 cursor-pointer hover:bg-gray-100">
            <FaShare /> <span>Share</span>
          </div>
        </div>
      )}

      {/* Comment Section */}
      {comment && (
        <div className="p-4 w-full border-t border-gray-100 bg-gray-50">
          <div className="flex gap-2 items-center">
            <img
              className="rounded-full w-10 h-10 border border-gray-200 cursor-pointer"
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"
              }
              alt=""
            />
            <form className="flex w-full gap-2" onSubmit={handleComment}>
              <input
                className="flex-grow border rounded-full py-2 px-4 text-sm focus:ring focus:ring-blue-300"
                placeholder="Add a comment..."
              />
              <button
                type="submit"
                className="cursor-pointer bg-blue-500 text-white px-4 rounded-full text-sm"
              >
                Send
              </button>
            </form>
          </div>

          {/* Example Comment */}
          <div className="mt-4">
            <div className="flex gap-3">
              <img
                className="rounded-full w-8 h-8 border border-gray-200 cursor-pointer"
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s"
                }
                alt=""
              />
              <div>
                <div className="text-sm font-semibold">User 1</div>
                <div className="text-xs text-gray-500">2h ago</div>
                <p className="text-sm mt-1">This is beautiful!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
