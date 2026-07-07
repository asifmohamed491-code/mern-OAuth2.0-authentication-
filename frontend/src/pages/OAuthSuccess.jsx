import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../utils/axios";

const OAuthSuccess = ({ setUser }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const login = async () => {
      const token = searchParams.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Save Access Token
      localStorage.setItem("accessToken", token);

      try {
        // Fetch Logged In User
        const res = await axios.get("/api/users/me");

        // Save User in React State
        setUser(res.data);

        // Redirect Home
        navigate("/");
      } catch (err) {
        console.log(err);

        localStorage.removeItem("accessToken");

        navigate("/login");
      }
    };

    login();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-xl font-semibold">
        Logging you in...
      </h2>
    </div>
  );
};

export default OAuthSuccess;