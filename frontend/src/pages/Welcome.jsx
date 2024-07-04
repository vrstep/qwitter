import { cn } from "@/lib/utils";
import UserAuthForm from "../components/UserAuthForm";
import whatshappening from "../assets/whatshappening.png";

function Welcome() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
        <div className="image">
          <img src={whatshappening} alt="whatshappening" />
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
