import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar"
import axios from './utils/axios';
import Notfound from './components/Notfound';
import OAuthSuccess from "./pages/OAuthSuccess";


function App() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      // 🔥 IMPORTANT CHECK
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/users/me");
        setUser(res.data);
      } catch (err) {
        console.log("❌ USER FETCH FAILED");

        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
        <div className='text-xl text-white'>
          Loading ...
        </div>

      </div>
    )
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home user={user} error={error} />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/oauth-success"
          element={<OAuthSuccess  setUser={setUser}  />}
        />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </Router>
  )
}

export default App
