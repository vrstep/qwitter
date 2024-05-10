import React, { useState } from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import axios from "axios";
import { Button } from "@/components/ui/button";

function RegisterDialog() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    try {
      const response = await axios.post("http://localhost:8000/api/v1/auth/register", {
        firstName,
        email,
        password,
      });
      console.log(response.data);
    }
    catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div className="mt-4">
      <Dialog>
        <DialogTrigger>
          <Button className="w-full max-w-xs text-white font-bold py-2 px-4 rounded">
            Create a new account
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white p-6 rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              Create a new account
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={register}>
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
          </div>
          {error && <span className="text-red-500">{error}</span>}
          <Button type="submit" onClick={register} className="w-full max-w-xs text-white font-bold py-2 px-4 rounded">
            Register
          </Button>
          </form>
          </DialogContent>
      </Dialog>
    </div>
  );
}
export default RegisterDialog;
