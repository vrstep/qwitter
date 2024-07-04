import EditProfileDialog from "./EditProfileDialog";

function Profile() {
    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
    
          <div className="relative">
            <img src="https://placehold.co/600x200" alt="Banner Photo" className="w-full h-48 object-cover"/>

            <div className="absolute -bottom-12 left-4">
              <img src="https://placehold.co/100x100" alt="Profile Photo" className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-900"/>
            </div>
          </div>
          <div className="p-4 pt-16">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">アミルです</h1>
                <p className="text-zinc-500">@vrstep02</p>
              </div>
              <EditProfileDialog />
            </div>
            <p className="text-zinc-500 mt-2"><i className="far fa-calendar-alt"></i> Joined March 2020</p>
            <div className="flex space-x-4 mt-2">
              <span><strong>338</strong> Following</span>
              <span><strong>33</strong> Followers</span>
            </div>
            <div className="flex justify-between mt-4 border-b border-zinc-200 dark:border-zinc-700">
              <button className="py-2 px-4 border-b-2 border-blue-500">Posts</button>
              <button className="py-2 px-4">Replies</button>
              <button className="py-2 px-4">Media</button>
              <button className="py-2 px-4">Likes</button>
            </div>
          </div>
          
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex space-x-4">
              <img src="https://placehold.co/50x50" alt="User Photo" className="w-12 h-12 rounded-full"/>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <span className="font-bold">Ekoru</span> <span className="text-zinc-500">@ek0ru · May 29</span>
                  </div>
                  <div className="text-zinc-500">...</div>
                </div>
                <p className="mt-2">まとめ</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <img src="https://placehold.co/150x150" alt="GIF 1" className="w-full h-auto"/>
                  <img src="https://placehold.co/150x150" alt="GIF 2" className="w-full h-auto"/>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Profile;