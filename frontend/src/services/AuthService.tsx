import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/auth";

const instance = axios.create({
    baseURL: API_URL,
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

class AuthService {

    async getCurrentUser() {
        return instance.get("/currentuser");
    }

    logout() {
        localStorage.removeItem("token");
        window.location.reload();
        return instance.post("/logout");
    }
}

export default new AuthService();