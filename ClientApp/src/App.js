import { useContext } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import NavBar from "./Components/Navbar/NavBar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import { AuthContext } from "./contexts/AuthContext";
import PrivateRoute from "./Components/Register-Login/PrivateRoute";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <header>{currentUser && <NavBar />}</header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? <Navigate to="/home" replace /> : <Landing />
            }
          />
          <Route
            path="home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="jobs"
            element={
              <PrivateRoute>
                <Jobs />
              </PrivateRoute>
            }
          />
          <Route
            path="applications"
            element={
              <PrivateRoute>
                <Applications />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
