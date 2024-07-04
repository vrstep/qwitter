import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/users";

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

class UserService {
    async getAllUsers() {
        return instance.get("");
    }

    async getUserById(id: number) {
        return instance.get(`/${id}`);
    }

    async deleteUser(id: number) {
        return instance.delete(`/${id}`);
    }

    async changeUsername(id: number, username: string) {
        return instance.put(`/changeUsername/${id}`, username, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    }

    async changeEmail(id: number, email: string) {
        return instance.put(`/changeEmail/${id}`, email, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    }

    async changePassword(data: { currentPassword: string, newPassword: string, confirmPassword: string }, id: number) {
        return instance.put(`/changePassword/${id}`, data);
    }

    async setProfilePicture(username: String, file: File) {
        const formData = new FormData();
        formData.append('image', file);

        return instance.post(`/setProfilePicture/${username}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default new UserService();
