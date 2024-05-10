import React, { useState } from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from '@/components/ui/button';
import axios from 'axios';

function LoginDialog() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form submitted");

        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/authenticate", {
                email,
                password,
            });
            console.log(response.data);

            // Save the token in local storage
            const token = response.data.token;
            localStorage.setItem("token", token);
            setIsAuthenticated(true);

        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="w-full max-w-xs text-white font-bold py-2 px-4 rounded">
                    Login
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-lg shadow-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-4">
                        Login
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded p-2 mb-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded p-2 mb-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <span className="text-red-500">{error}</span>}
                    </div>
                    <div>
                        <Button type="submit" onClick={handleSubmit} className="w-full max-w-xs text-white font-bold py-2 px-4 rounded">
                            Login
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog;