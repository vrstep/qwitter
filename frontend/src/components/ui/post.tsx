import { BsDot, BsThreeDots } from "react-icons/bs";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { IoStatsChartOutline, IoShareOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import ReplyDialog from "../ReplyDialog";
import { useState } from "react";
import AuthService from "@/services/AuthService";
import LikeService from "@/services/LikeService";
import { Toaster, toast } from "react-hot-toast";

const Post = ({ post }) => {

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = async () => {
        const response = await AuthService.getCurrentUser();
        const userId = response.data.id;
        if (isLiked) {
            LikeService.unlikePost(post.id, userId)
                .then(() => {
                    setLike(like - 1);
                    setIsLiked(false);
                    console.log("unliked");
                    toast.success("Unliked");
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Something went wrong");
                });
        } else {
            LikeService.likePost(post.id, userId)
                .then(() => {
                    setLike(like + 1);
                    setIsLiked(true);
                    console.log("liked");
                    toast.success("Liked");
                })
                .catch((e) => {
                    console.log(e);
                    toast.error("Something went wrong");
                });
        }
    }



    return (
        <>
        <Toaster />
          <div
              key={post.id} className="border-b-[0.5px] hover:bg-black/5 transition-all cursor-pointer px-4 py-2 flex space-x-3 border-gray-200">
              <div>
                  <div className="w-10 h-10 bg-slate-400 rounded-full"></div>
              </div>
              <div className="flex flex-col space-y-0.5">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 w-full">
                          <div className="font-bold">
                              {post.author.firstName}
                          </div>
                          <div className="text-gray-500">
                              @{post.author.realUsername}
                          </div>
                          <div>
                              <BsDot />
                          </div>
                          <div className="text-sm text-gray-500">
                              {post.posted_date}
                          </div>
                      </div>
                      <div>
                          <BsThreeDots />
                      </div>
                  </div>
                  <div onClick={() => {console.log("clicked")}} className="text-black text-base w-full">{post.content}</div>
                  <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl"></div>
                  <div className="flex items-center justify-between mt-2 w-full">
                      <ReplyDialog post={post}/>
                      <button className="rounded-full hover:bg-black/20 transition duration-200 p-3 cursor-pointer">
                          <AiOutlineRetweet />
                      </button>
                      <button onClick={handleLike} className="flex items-center rounded-full hover:bg-black/20 transition duration-200 p-3 cursor-pointer">
                          <AiOutlineHeart />
                            <span className="ml-1">{like}</span>
                      </button>
                      <div>
                          <IoStatsChartOutline />
                      </div>
                      <div className="flex space-x-2.5">
                          <div>
                              <FaRegBookmark />
                          </div>
                          <div>
                              <IoShareOutline />
                          </div>
                      </div>
                  </div>
                </div>
            </div>
        </>
    );
};

export default Post;
