import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaRegCommentDots, FaShare, FaThumbsUp } from "react-icons/fa";
import Card from "./Card";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IoThumbsDown } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import assets from "../assets";

export default function PostCard({ profile, item, personData }) {
  const [seeMore, setSeeMore] = useState(false);
  const [comment, setComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [noOfLikes, setNoOfLike] = useState(item?.likes?.length || 0);
  const [commentText, setCommentText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const desc = item?.desc;
  //  console.log(profile);
  //  console.log(item);
  //  console.log(item?._id);

  //  console.log(personData);

  // Post a comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (commentText.trim().length === 0)
      return toast.error("Please enter a comment");

    try {
      const res = await axios.post(
        'http://localhost:4000/api/comment',
        { postId: item._id, comment: commentText },
        { withCredentials: true }
      );
      setComments([res.data.comment, ...comments]);
      setCommentText("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while adding comment");
    }
  };

  // Like / Dislike a post
  const handleLikeFunc = async () => {
    try {
      await axios.post(
        'http://localhost:4000/api/posts/likeDislike',
        { postId: item._id },
        { withCredentials: true }
      );
      if (liked) {
        setNoOfLike((prev) => prev - 1);
        setLiked(false);
      } else {
        setNoOfLike((prev) => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while liking");
    }
  };

  // Fetch comments when opening comment box
  const handleCommentBox = async () => {
    setComment(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/comment/${item?._id}`
      );
      setComments(res.data.comments || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Check if user already liked the post
  useEffect(() => {
    if (!personData?._id) return;
    const selfId = personData._id.toString();
    const alreadyLiked = item?.likes?.some(
      (like) => like.toString() === selfId
    );
    setLiked(alreadyLiked);
  }, [item?.likes, personData]);

  const copytoshare = async () => {
    try {
      let res = `http://localhost:5173/profile/${item?.user?._id}/activities/${item?._id}`
      await navigator.clipboard.writeText(res);
      toast.error('copied to clipboard')
    } catch (err) {
      console.error("failed to copy", err)
    }
  }

 const handleDeleteClick=async()=>{
await axios.delete(`http://localhost:4000/api/posts/${item?._id}`,{withCredentials:true}).then(res=>{
  toast.success("post deleted successfully")
}).catch(err=>{
  toast.error("failed to delete post")
})
 }

  return (
    // <Card padding={0}>
    //   {/* Header */}
    //   <div className="flex gap-3 p-4 items-center">
    //     <img
    //       className="rounded-full w-12 h-12 border border-gray-200 cursor-pointer hover:scale-105 transition"
    //       src={item?.user?.profilePic || assets.image}
    //       alt="profile"
    //     />
    //     <div>
    //       <div className="text-base font-semibold">{item?.user?.name}</div>
    //       <div className="text-xs text-gray-500">{item?.user?.headline}</div>
    //     </div>
    //       {personData?._id === item?.user?._id && (
    //       <div className="relative">
    //         <MoreHorizIcon
    //           className="cursor-pointer text-gray-600 hover:bg-gray-200 rounded-full p-1 "
    //           onClick={() => setMenuOpen((prev) => !prev)}
    //         />

    //         {menuOpen && (
    //           <div className="absolute right-0 mt-2 w-32 bg-white shadow-md border rounded-md z-50">
    //             <button
    //               className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition"
    //               onClick={handleDeleteClick}
    //             >
    //               Delete Post
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     )}
    //   </div>

    //   {/* Description */}
    //   <div className="text-sm p-4 text-gray-700 leading-relaxed">
    //     {seeMore
    //       ? desc
    //       : desc?.length > 50
    //         ? `${desc.slice(0, 50)}...`
    //         : `${desc}`}{" "}
    //     {desc?.length > 50 && (
    //       <span
    //         onClick={() => setSeeMore((prev) => !prev)}
    //         className="cursor-pointer text-blue-600 hover:underline"
    //       >
    //         {seeMore ? "See Less" : "See More"}
    //       </span>
    //     )}
    //   </div>

    //   {/* Post Image */}
    //   {item?.image && (
    //     <div className="w-full max-h-96 overflow-hidden">
    //       <img
    //         className="w-full h-full object-cover rounded-md"
    //         src={item?.image}
    //         alt="post"
    //       />
    //     </div>
    //   )}

    //   {/* Likes / Comments count */}
    //   <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600">
    //     <div className="flex items-center gap-2">
    //       <FaRegThumbsUp className="text-blue-500" /> {noOfLikes} Likes
    //     </div>
    //     <div
    //       className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
    //       onClick={handleCommentBox}
    //     >
    //       <FaRegCommentDots /> {comments.length} Comments
    //     </div>
    //   </div>

    //   {/* Actions */}
    //   {!profile && (
    //     <div className="flex border-t border-gray-200 text-gray-600">
    //       <div
    //         onClick={handleLikeFunc}
    //         className="w-1/3 flex justify-center items-center gap-2 py-2 cursor-pointer hover:bg-gray-100"
    //       >
    //         {liked ? <FaRegThumbsUp /> : <FaThumbsUp />}{" "}
    //         <span>{liked ? "Liked" : "Like"}</span>
    //       </div>
    //       <div
    //         className="w-1/3 flex justify-center items-center gap-2 py-2 cursor-pointer hover:bg-gray-100"
    //         onClick={handleCommentBox}
    //       >
    //         <FaRegCommentDots /><span>Comment</span>
    //       </div>
    //       <div onClick={copytoshare} className="w-1/3 flex justify-center items-center gap-2 py-2 cursor-pointer hover:bg-gray-100">
    //         <FaShare /> <span>Share</span>
    //       </div>
    //     </div>
    //   )}

    //   {/* Comment Section */}
    //   {comment && (
    //     <div className="p-4 w-full border-t border-gray-100 bg-gray-50">
    //       <div className="flex gap-2 items-center">
    //         <img
    //           className="rounded-full w-10 h-10 border border-gray-200 cursor-pointer"
    //           src={personData?.profilePic || assets.image}
    //           alt="profile"
    //         />
    //         <form className="flex w-full gap-2" onSubmit={handleComment}>
    //           <input
    //             value={commentText}
    //             onChange={(e) => setCommentText(e.target.value)}
    //             className="flex-grow border rounded-full py-2 px-4 text-sm focus:ring focus:ring-blue-300"
    //             placeholder="Add a comment..."
    //           />
    //           <button
    //             type="submit"
    //             className="cursor-pointer bg-blue-500 text-white px-4 rounded-full text-sm"
    //           >
    //             Send
    //           </button>
    //         </form>
    //       </div>

    //       {/* Render Comments */}
    //       <div className="mt-4 space-y-3">
    //         {comments.map((c, index) => (
    //           <Link
    //             to={`/profile/${c?.user?._id}`}
    //             className="flex gap-3"
    //             key={index}
    //           >
    //             <img
    //               className="rounded-full w-8 h-8 border border-gray-200 cursor-pointer"
    //               src={c?.user?.profilePic || assets.image}
    //               alt="comment-user"
    //             />
    //             <div>
    //               <div className="text-sm font-semibold">{c?.user?.name}</div>
    //               <div className="text-xs text-gray-500">
    //                 {c?.user?.headline}
    //               </div>
    //               <p className="text-sm mt-1">{c?.comment}</p>
    //             </div>
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //   )}
    // </Card>


<Card className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto my-4 shadow-sm rounded-lg overflow-hidden">
  {/* Header */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-3">
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <img
        className="w-12 h-12 rounded-full border border-gray-200 cursor-pointer hover:scale-105 transition"
        src={item?.user?.profilePic || assets.image}
        alt="profile"
      />
      <div className="truncate">
        <div className="font-semibold text-base truncate">{item?.user?.name}</div>
        <div className="text-gray-500 text-sm truncate">{item?.user?.headline}</div>
      </div>
    </div>

    {personData?._id === item?.user?._id && (
      <div className="relative mt-2 sm:mt-0">
        <MoreHorizIcon
          className="cursor-pointer text-gray-600 hover:bg-gray-200 p-1 rounded-full"
          onClick={() => setMenuOpen((prev) => !prev)}
        />
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white shadow-md border rounded-md z-50">
            <button
              className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition"
              onClick={handleDeleteClick}
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    )}
  </div>

  {/* Description */}
  <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed break-words">
    {seeMore ? desc : desc?.length > 100 ? `${desc.slice(0, 100)}...` : desc}{" "}
    {desc?.length > 100 && (
      <span
        className="text-blue-600 cursor-pointer hover:underline"
        onClick={() => setSeeMore((prev) => !prev)}
      >
        {seeMore ? "See Less" : "See More"}
      </span>
    )}
  </div>

  {/* Post Image */}
  {item?.image && (
    <div className="w-full overflow-hidden">
      <img
        className="w-full h-auto object-cover rounded-md"
        src={item?.image}
        alt="post"
      />
    </div>
  )}

  {/* Likes / Comments */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 text-sm text-gray-600 border-t border-gray-200 gap-2 sm:gap-0">
    <div className="flex items-center gap-2">
      <FaRegThumbsUp className="text-blue-500" /> {noOfLikes} Likes
    </div>
    <div
      className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
      onClick={handleCommentBox}
    >
      <FaRegCommentDots /> {comments.length} Comments
    </div>
  </div>

  {/* Action Buttons */}
  {!profile && (
    <div className="flex flex-wrap sm:flex-nowrap border-t border-gray-200 text-gray-600">
      <div
        onClick={handleLikeFunc}
        className="flex-1 flex justify-center items-center gap-2 py-2 cursor-pointer hover:bg-gray-100"
      >
        {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
        <span>{liked ? "Liked" : "Like"}</span>
      </div>
      <div
        onClick={handleCommentBox}
        className="flex-1 flex justify-center items-center gap-2 py-2 cursor-pointer hover:bg-gray-100"
      >
        <FaRegCommentDots /> <span>Comment</span>
      </div>
      <div
        onClick={copytoshare}
        className="flex-1 flex justify-center items-center gap-2 py-2 cursor-pointer hover:bg-gray-100"
      >
        <FaShare /> <span>Share</span>
      </div>
    </div>
  )}

  {/* Comments Section */}
  {comment && (
    <div className="p-4 bg-gray-50 border-t border-gray-100">
      <div className="flex gap-2 items-center">
        <img
          className="w-10 h-10 rounded-full border border-gray-200"
          src={personData?.profilePic || assets.image}
          alt="profile"
        />
        <form className="flex w-full gap-2" onSubmit={handleComment}>
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow border rounded-full py-2 px-4 text-sm focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="px-4 py-1 rounded-full bg-blue-500 text-white text-sm"
          >
            Send
          </button>
        </form>
      </div>

      <div className="mt-4 space-y-3">
        {comments.map((c, index) => (
          <Link
            key={index}
            to={`/profile/${c?.user?._id}`}
            className="flex gap-3 hover:bg-gray-100 p-2 rounded-md transition"
          >
            <img
              className="w-8 h-8 rounded-full border border-gray-200"
              src={c?.user?.profilePic || assets.image}
              alt="comment-user"
            />
            <div>
              <div className="text-sm font-semibold truncate">{c?.user?.name}</div>
              <div className="text-xs text-gray-500 truncate">{c?.user?.headline}</div>
              <p className="text-sm mt-1 break-words">{c?.comment}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )}
</Card>


  );
}
