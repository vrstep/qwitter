import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BsChat } from "react-icons/bs";
import { BsDot, BsThreeDots } from "react-icons/bs";
import {useState } from "react";
import ReplyService from "@/services/ReplyService";
import AuthService from "@/services/AuthService";
import { Toaster, toast } from "react-hot-toast";

const ReplyDialog = ({post}) => {
    const [reply, setReply] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleReply = async () => {
        const input = document.querySelector("textarea");
        const content = input?.value;
        const response = await AuthService.getCurrentUser();
        const author = {id: response.data.id}
        ReplyService.replyToPost(post.id, { content, author })
            .then((response) => {
                console.log(response.data);
                setReply([response.data, ...reply]);
                setInputValue("");
                toast.success("Replied");
            })
            .catch((e) => {
                console.log(e);
                toast.error("Something went wrong");
            });
    };
    return (
        <>
        <Toaster />
        <Dialog>
            <DialogTrigger asChild>
                <button
                    onClick={() => {
                        {
                            /* reply modal */
                        }
                    }}
                    className="rounded-full hover:bg-black/20 transition duration-200 p-3 cursor-pointer"
                >
                    <BsChat />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
            <div key={post.id} className="border-b-[0.3px] py-3 flex space-x-3 border-gray-200">
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
                  <div className="text-black text-sm my-4">{post.content}</div>
                </div>
            </div>
            <div className="text-sm">
                Replying to @{post.author.realUsername}
            </div>
            <div className="flex w-full items-center space-x-1">
                <div>
                    <div className="w-10 h-10 bg-slate-400 rounded-full"></div>
                </div>
                <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Post your reply" className="w-full h-full placeholder:text-xl bg-transparent outline-none p-4 border-none border-b-[0.5px] border-gray-200"/>
            </div>
            <div className="w-full max-w-[100px]">
                  <button onClick={handleReply} className="bg-twitter text-white text-center rounded-full px-1 py-2 w-full hover:bg-opacity-90 transition duration-100 font-bold">
                    Reply
                  </button>
                </div>
            </DialogContent>
        </Dialog>
        </>
    );
};

export default ReplyDialog;
