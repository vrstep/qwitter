import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { IoShareOutline, IoStatsChartOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";

const MainComponent = () => {
  return (
    <main className="ml-[275px] mx-2 flex w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-200">
          <h1 className="text-xl font-bold p-2 backdrop-blur bg-white/10 sticky top-0">Home</h1>
          <div className="flex items-stretch py-4 space-x-2 px-4 border-t-[0.5px] border-b-[0.5px] border-gray-200 relative">
            <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
            <div className="flex flex-col w-full h-full">
                <input
                  type="text"
                  className="w-full h-full placeholder:text-xl bg-transparent outline-none p-4 border-none border-b-[0.5px] border-gray-200"
                  placeholder="What's happening?"
                />
              <div className="w-full flex justify-between items-center">
                <div></div>
                <div className="w-full max-w-[100px]">
                  <button className="bg-twitter text-white text-center rounded-full px-1 py-2 w-full hover:bg-opacity-90 transition duration-100 font-bold">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {
              Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="border-b-[0.5px] px-4 py-2 flex space-x-3 border-gray-200">
                  <div>
                    <div className="w-10 h-10 bg-slate-400 rounded-full"></div>
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 w-full">
                      <div className="font-bold">John Doe</div>
                      <div className="text-gray-500">{"@johndoe"}</div>
                      <div><BsDot/></div>
                      <div>September 12</div>
                      
                      </div>
                      <div><BsThreeDots/></div>
                    </div>
                    <div className="text-black text-sm ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores impedit natus eligendi mollitia repellendus at quasi sapiente nobis vel, officia excepturi nam autem soluta culpa, dolore voluptatum ut nihil nulla!
                    </div>
                    <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl">
                    </div>
                    <div className="flex items-center justify-between mt-2 w-full">
                      <div className="rounded-full hover:bg-black/20 transition duration-200 p-2 cursor-pointer">
                        <BsChat/>
                      </div>
                      <div>
                        <AiOutlineRetweet/>
                      </div>
                      <div>
                        <AiOutlineHeart/>
                      </div>
                      <div>
                        <IoStatsChartOutline/>
                      </div>
                      <div className="flex space-x-2.5">
                      <div>
                      <FaRegBookmark/>
                      </div>
                      <div>
                        <IoShareOutline/>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </main>
  )
}

export default MainComponent