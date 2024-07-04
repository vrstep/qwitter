import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const EditProfileDialog = () => {
    return(
    <Dialog>
        <DialogTrigger asChild>
            <button className="bg-blue-500 text-white py-1 px-4 rounded-full">
            Edit Profile
            </button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center p-4 border-b dark:border-zinc-700">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Edit profile</h2>
                    <button className="text-zinc-500 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>
                </div>
                <div className="relative">
                    <img src="https://placehold.co/600x200" alt="Cover Image" className="w-full h-40 object-cover rounded-t-lg"/>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-zinc-800 bg-opacity-50 text-white p-2 rounded-full">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex justify-center -mt-12">
                    <div className="relative">
                        <img src="https://placehold.co/100x100" alt="Profile Image" className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-800"/>
                        <div className="absolute inset-0 flex items-center justify-center left-0">
                            <button className="bg-zinc-800 bg-opacity-50 text-white p-2 rounded-full">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4">
                                    </path>
                                </svg>
                            </button> {/* This button !!! */}
                        </div>
                    </div>
                </div>
                <form className="p-4 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                        <input type="text" id="name" className="mt-1 block w-full border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" value="アミルです"/>
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Bio</label>
                        <textarea id="bio" className="mt-1 block w-full border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
                        </textarea>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </DialogContent>
    </Dialog>
    );

}

export default EditProfileDialog;
