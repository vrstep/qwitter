import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/posts";

const instance = axios.create({
    baseURL: API_URL,
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
} );

class LikeService {
    async likePost(postId: number, userId: number) {
        return instance.post(`/${postId}/like/${userId}`);
    }

    async unlikePost(postId: number, userId: number) {
        return instance.post(`/${postId}/unlike/${userId}`);
    }
}

export default new LikeService();