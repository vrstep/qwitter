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

class PostService {
    getPosts() {
        return instance.get("");
    }

    getPostById(id: number) {
        return instance.get(`/${id}`);
    }

    getPostByAuthor(id: number) {
        return instance.get(`/author/${id}`);
    }

    createPost(data: any) {
        return instance.post("", data);
    }
}

export default new PostService();
