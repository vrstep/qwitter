import { BiHomeCircle } from "react-icons/bi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { BsTwitter } from "react-icons/bs";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

import { Link } from "react-router-dom";
const NAVIGATION_ITEMS = [
  {
    title: "Twitter",
    icon: BsTwitter,
  },
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: FaMagnifyingGlass,
  },
  {
    title: "Notifications",
    icon: FaRegBell,
  },
  {
    title: "Messages",
    icon: FaRegEnvelope,
  },
  {
    title: "Bookmarks",
    icon: FaRegBookmark,
  },
  {
    title: "Lists",
    icon: FaList,
  },
  {
    title: "Profile",
    icon: FaRegUser,
  },
];

function LeftSidebar() {
  return (
    <section className="fixed w-{275px} flex flex-col items-stretch h-screen">
      <div className="w-full flex flex-col items-stretch h-full space-y-4 mt-4">
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            to={`/${item.title.toLowerCase()}`}
            className="hover:bg-black/20 text-xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-3"
            key={item.title}
          >
            <div>
              <item.icon className="text-xl" />
            </div>
            {item.title !== "Twitter" && <div>{item.title}</div>}
          </Link>
        ))}
        <button className="bg-twitter text-white text-center rounded-full py-4 hover:bg-opacity-90 transition duration-100">
          Tweet
        </button>
      </div>
      <button className="rounded-full flex items-center space-x-2 mb-4 bg-transparent p-3 text-center hover:bg-black/20 transition duration-200 w-full justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-slate-400 w-9 h-9"></div>
          <div className="text-left text-xs">
            <div className="text-black font-bold mb-1">Username</div>
            <div className="text-gray-500">@username</div>
          </div>
        </div>
        <div>
          <PiDotsThreeOutlineFill />
        </div>
      </button>
    </section>
  );
}

export default LeftSidebar;
