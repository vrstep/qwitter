import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import UserService from "@/services/UserService";
import AuthService from "@/services/AuthService";
import { Toaster, toast} from 'react-hot-toast';

function SettingsMenu() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleUsernameChange = async () => {
        const input = document.getElementById("change-username") as HTMLInputElement;
        const newUsername = input?.value;
        const response = await AuthService.getCurrentUser();
        const id = response.data.id;
        UserService.changeUsername(id, newUsername)
            .then((response) => {
                console.log(response.data);
                console.log(newUsername)
                setUsername(newUsername);
                setInputValue("");
                toast.success("Username changed successfully!")
            })
            .catch((e) => {
                console.log(e);
                toast.error("Oops, something went wrong!")
            });
    }

    const handleEmailChange = async () => {
        const input = document.getElementById("change-email") as HTMLInputElement;
        const newEmail = input?.value;
        const response = await AuthService.getCurrentUser();
        const id = response.data.id;
        UserService.changeEmail(id, newEmail)
            .then((response) => {
                console.log(response.data);
                console.log(newEmail)
                setEmail(newEmail);
                setInputValue("");
                toast.success("Email changed!");
            })
            .catch((e) => {
                console.log(e);
                toast.error("Something went wrong!");
            });
    }

    const handleChangePassword = async () => {
        const response = await AuthService.getCurrentUser();
        const id = response.data.id;
        const currentPasswordInput = document.getElementById("change-current-password") as HTMLInputElement;
        const newPasswordInput = document.getElementById("change-new-password") as HTMLInputElement;
        const confirmPasswordInput = document.getElementById("change-confirm-password") as HTMLInputElement;
    
        const currentPassword = currentPasswordInput?.value;
        const newPassword = newPasswordInput?.value;
        const confirmPassword = confirmPasswordInput?.value;
    
        if (newPassword !== confirmPassword) {
            console.error("New passwords do not match");
            return;
        }
    
        try {
            const response = await UserService.changePassword({
                currentPassword,
                newPassword,
                confirmPassword
            }, id);
            console.log(response.data);
            toast.success("Password changed");
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong!");
        }
    }

  return (
    <>
    <Toaster/>
      <div className="flex w-[48%] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-200">
          <div className="flex items-center justify-center py-4">
          <Tabs defaultValue="account" className="w-[400px] flex flex-col items-center justify-center gap-2">
              <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col space-y-4" value="account">
                  <Input id="change-email" type="email" placeholder="Email"/>
                  <Input id="change-username" type="text" placeholder="Username" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                  <Button onClick={()=> {
                    handleEmailChange();
                    handleUsernameChange();
                  }}>Save changes</Button>
              </TabsContent>
              <TabsContent className="flex flex-col space-y-4" value="password">
                  <Input id="change-current-password" type="password" placeholder="Current Password"/>
                  <Input id="change-new-password" type="password" placeholder="New Password"/>
                  <Input id="change-confirm-password" type="password" placeholder="Confirm New Password"/>
                  <Button onClick={handleChangePassword}>Change Password</Button>
              </TabsContent>
          </Tabs>
          </div>
      </div>
      </>
  );
}

export default SettingsMenu;
