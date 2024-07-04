import Post from "./ui/post";
import PostService from "@/services/PostService";
import { useEffect, useState } from "react";
import AuthService from "@/services/AuthService";

const MainComponent = () => {

	const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		PostService.getPosts()
			.then((response) => {
				setPosts(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const handleTweet = async () => {
    const input = document.querySelector("input");
    console.log(input?.value);
    const content = input?.value;
    const response = await AuthService.getCurrentUser();
    const author = {id: response.data.id}
    console.log(author);
    PostService.createPost({ content, author })
        .then((response) => {
            console.log(response.data);
            setPosts([response.data, ...posts]);
            setInputValue("");
        })
        .catch((e) => {
            console.log(e);
        });
}

  return (
    <main className="flex w-[48%] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-200">
          <h1 className="text-xl font-bold p-2 backdrop-blur bg-white/10 sticky top-0">Home</h1>
          <div className="flex items-stretch py-4 space-x-2 px-4 border-t-[0.5px] border-b-[0.5px] border-gray-200 relative">
            <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
            <div className="flex flex-col w-full h-full">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full h-full placeholder:text-xl bg-transparent outline-none p-4 border-none border-b-[0.5px] border-gray-200"
                  placeholder="What's happening?"
                />
              <div className="w-full flex justify-between items-center">
                <div>
                  {/*here will be buttons for adding stuff to tweet*/}
                </div>
                <div className="w-full max-w-[100px]">
                  <button onClick={handleTweet} className="bg-twitter text-white text-center rounded-full px-1 py-2 w-full hover:bg-opacity-90 transition duration-100 font-bold">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
			{posts.map((post) => (
			  <Post key={post.id} post={post} />
			))}
          </div>
        </main>
  )
}

export default MainComponent;