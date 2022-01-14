
import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import { UserContext } from './context/userContext';
import Home from "./Home";
import Login from "./Login";
import ProtectedPage from "./ProtectedPage";
import PublicPage from "./PublicPage";

function App() {
  const [user, setUser] = useState({ LoggedInStatus: "LoggedOut" });
  useEffect(() => {
    setTimeout(() => {      
      setUser({ LoggedInStatus: "LoggedIn" })
    }, 1000);

  }, [])

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/public">public</Link>
          </li>
          <li>
            <Link to="/protected">protected</Link>
          </li>
        </ul>
      </nav>

      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/public" element={<PublicPage />} />
          <Route
            path="/protected"
            element={
              <RequireAuth redirectTo="/login">
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

function RequireAuth({ children, redirectTo }) {
  const { user, setUser } = useContext(UserContext);
  return user?.LoggedInStatus === "LoggedIn" ? children : <Navigate to={redirectTo} />;
}


