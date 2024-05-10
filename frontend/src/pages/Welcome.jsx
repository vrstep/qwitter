import { cn } from "@/lib/utils";
import UserAuthForm from "../components/UserAuthForm";

function Welcome() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
        <div className="image">
          <svg className="w-auto h-auto">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </div>
        <div className="content">
          <UserAuthForm />
        </div>
        <div className="footer"></div>
      </div>
    </div>
  );
}

export default Welcome;
