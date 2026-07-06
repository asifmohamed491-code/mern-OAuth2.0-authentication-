import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

//  request interceptor
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//  response interceptor
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    //  HARD STOP → if refresh itself fails → logout
    if (original.url?.includes("/api/users/refresh")) {
  

      localStorage.removeItem("accessToken");
      window.location.href = "/login";

      return Promise.reject(err);
    }

    //  handle 401
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const res = await instance.post("/api/users/refresh");

        const newToken = res.data.accessToken;

    

        localStorage.setItem("accessToken", newToken);

        original.headers.Authorization = `Bearer ${newToken}`;

        return instance(original);

      } catch (e) {

        localStorage.removeItem("accessToken");
        window.location.href = "/login";

        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);

export default instance;