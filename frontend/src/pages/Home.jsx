import * as React from "react";
import LeftSidebar from "../components/LeftSidebar";
import MainComponent from "../components/MainComponent";
import Rightsidebar from "../components/Rightsidebar";

function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="max-w-screen-xl w-full h-full flex relative">
        <LeftSidebar />
        <MainComponent />
        <Rightsidebar />
        <section></section>
      </div>
    </div>
  );
}

export default Home;
