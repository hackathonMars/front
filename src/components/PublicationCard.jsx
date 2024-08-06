import React, { useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const PublicationCard = ({
  avatar,
  username,
  time,
  text,
  image,
  likes,
  commentsCount
}) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentButtonClick = () => {
    setShowCommentInput((prev) => !prev);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments((prev) => [...prev, comment]);
      setComment("");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md shadow-green-200 rounded-lg overflow-hidden">
      <div className="px-4 py-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
            alt="Avatar"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{username || "John Doe"}</p>
            <p className="text-gray-600">{time || "2 hours ago"}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="mt-2 text-gray-700">
            {text || "If a dog chews shoes whose shoes does he choose?"}
          </p>
        </div>
      </div>
      {image && (
        <img
          className="w-full"
          src={image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
          alt="Post"
        />
      )}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between border-b pb-2">
          <p>{likes || "32 likes"}</p>
          <p>{commentsCount || "21 comments"}</p>
        </div>
        <div className="flex justify-around pt-2">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <BiLike />
            <span>Like</span>
          </button>
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            onClick={handleCommentButtonClick}
          >
            <FaRegCommentDots />
            <span>Comment</span>
          </button>
        </div>
      </div>
      {showCommentInput && (
        <div className="px-4 py-4">
          <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-grow px-4 py-2 border rounded-md"
              placeholder="Write a comment..."
              value={comment}
              onChange={handleCommentChange}
            />
            {comment.trim() && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Post
              </button>
            )}
          </form>
          <div className="mt-4 space-y-4">
            <AnimatePresence>
              {comments.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="chat chat-start"
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Comment Avatar"
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                      />
                    </div>
                  </div>
                  <div className="chat-bubble">{comment}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicationCard;
