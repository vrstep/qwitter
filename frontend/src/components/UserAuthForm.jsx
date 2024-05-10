import { Button } from "@/components/ui/button";
import RegisterDialog from "../components/RegisterDialog";
import LoginDialog from "./LoginDialog";

function UserAuthForm() {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-5xl font-bold mb-3">Happening now</h1>
      <h2 className="text-xl font-bold mb-5">Join today.</h2>
      <RegisterDialog showError={message => console.error(message)}/>
      <LoginDialog />
    </div>
  );
}

export default UserAuthForm;
