import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/posts";

const instance = axios.create({
    baseURL: API_URL,
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

class ReplyService {
    async replyToPost(postId: number, reply: any) {
        return instance.post(`/${postId}/reply`, reply);
    }
}

export default new ReplyService();

