import { BiHomeCircle } from "react-icons/bi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { BsTwitter } from "react-icons/bs";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/drop-down-menu"

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "@/services/AuthService";
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
    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchCurrentUser = async () => {
            AuthService.getCurrentUser()
                .then((response) => {
                    setUser(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        fetchCurrentUser();
    }, []);

    return (
        <section className="sticky top-0 w-[22%] flex flex-col items-stretch h-screen px-4">
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
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="rounded-full flex items-center space-x-2 mb-4 bg-transparent p-3 text-center hover:bg-black/20 transition duration-200 w-full justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-slate-400 rounded-full"></div>
                            <div className="flex flex-col">
                                <div className="font-bold">{user?.firstName}</div>
                                <div className="text-gray-500">@{user?.realUsername}</div>
                            </div>
                        </div>
                        <div>
                            <PiDotsThreeOutlineFill />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <button onClick={AuthService.logout}>Logout</button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </section>
    );
}

export default LeftSidebar;
