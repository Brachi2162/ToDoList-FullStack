import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Interceptor להוספת הטוקן לכל בקשה (Request)
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Interceptor לטיפול בשגיאות (Response) - אם אין הרשאה, עוברים ללוגין
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/"; // רענון הדף שיקפיץ את מסך הלוגין
    }
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const res = await api.get("/items");
    return res.data;
  },
  addTask: async (name) => {
    const res = await api.post("/items", { name, isComplete: false });
    return res.data;
  },
  setCompleted: async (id, isComplete, name) => {
    const res = await api.put(`/items/${id}`, { name, isComplete });
    return res.data;
  },
  deleteTask: async (id) => {
    const res = await api.delete(`/items/${id}`);
    return res.data;
  },
  login: async (username, password) => {
    const res = await api.post("/login", { username, password });
    return res.data; 
  },
  register: async (username, password) => {
    const res = await api.post("/register", { username, password });
    return res.data;
  }
};