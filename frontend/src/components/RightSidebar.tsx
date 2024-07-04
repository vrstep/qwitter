import { BsSearch } from "react-icons/bs";

function RightSidebar() {
  return (
    <section className="sticky top-2 mt-2 w-[30%] flex flex-col space-y-4 items-stretch h-screen px-6">
      <div>
        <div className="relative w-full h-full group">
        <input
            type="text"
            placeholder="Search"
            id="searchBox"
            className="focus:border-twitter focus:border w-full h-full outline-none bg-gray-100 rounded-full px-11 py-3 pr-4"
          />
            <label htmlFor="searchBox" className="absolute top-0 left-0 h-full flex items-center justify-center p-4 peer-focus:text-twitter">
            <BsSearch className="w-5 h-5"/>
            </label>
        </div>
      </div>
      <div></div>
      <div></div>
    </section>
  );
}

export default RightSidebar;
