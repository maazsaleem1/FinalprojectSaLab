// services/ApiServices.js
import axios from 'axios';

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: ' http://localhost:8002/api/v1',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'ab6410c710c7ce43c36e37084a4b5205b0e1608477336023a8520c9f104398f9',
                'Cookie': '.Tunnels.Relay.WebForwarding.Cookies=CfDJ8Cs4yarc...' // trimmed

            },
            maxBodyLength: Infinity,
        });

        // 🔒 Add interceptor to include Authorization token dynamically
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token'); // ⬅️ Make sure you save token like this
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    async signup(email, password, fullName) {
        try {
            const response = await this.api.post('/auth/signup', {
                email,
                password,
                fullName,
            });
            return response.data;
        } catch (error) {
            console.error('Signup failed:', error.response?.data || error.message);
            return error.response?.data;
        }
    }

    async login(email, password, fullName) {
        try {
            const response = await this.api.post('/auth/login', {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            console.error('login failed:', error.response?.data || error.message);
            return error.response?.data;
        }
    }


    async getProfile() {
        try {
            const response = await this.api.get('auth/get-profile', {});
            return response.data;
        } catch (error) {
            console.error('get  failed:', error.response?.data || error.message);
            return error.response?.data;
        }
    }


    async createProfile(profileData) {
        try {
            const response = await this.api.post('/auth/create-profile', {
                fullName: profileData.fullName,
                gender: profileData.gender,
                contact: profileData.contact,
                address: profileData.address,
            });

            return response.data;
        } catch (error) {
            return {
                status: error.response?.status || 500,
                message: error.response?.data?.message || 'Something went wrong',
            };
        }
    }


    async addTodo(title, description, category, status, dueDate) {
        try {
            const response = await this.api.post('/todo', {
                title, description, category, status, dueDate
            });
            return response.data;
        } catch (error) {
            console.error('login failed:', error.response?.data || error.message);
            return error.response?.data;
        }
    }

    async getAllTodo() {
        try {
            const response = await this.api.get('/todo', {});
            return response.data;
        } catch (error) {
            console.error('get  failed:', error.response?.data || error.message);
            return error.response?.data;
        }
    }


    async deleteTodo(id) {
        try {
            const response = await this.api.delete(`/todo/${id}`, {});
            return response.data;
        } catch (error) {
            console.error('delete failed:', error.response?.data || error.message);
            return error.response?.data;
        }
    }

    async editTodo(id, updatedData) {
        try {
            const response = await this.api.put(`/todo/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('delete failed:', error.response?.data || error.message);
            return error.response?.data;
        }
    }
}

const apiService = new ApiService();
export default apiService;
