import * as React from "react";
import LeftSidebar from "../components/LeftSidebar";
import MainComponent from "../components/MainComponent";
import Rightsidebar from "../components/RightSidebar";

function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="max-w-screen-xl w-full h-full flex relative">
        <LeftSidebar />
        <MainComponent />
        <Rightsidebar />
      </div>
    </div>
  );
}

export default Home;
