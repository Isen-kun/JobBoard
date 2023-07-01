import { useContext } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import NavBar from "./Components/Navbar/NavBar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";
import { AuthContext } from "./contexts/AuthContext";
import PrivateRoute from "./Components/Register-Login/PrivateRoute";
import Locations from "./pages/Locations";
import Categories from "./pages/Categories";
import Skills from "./pages/Skills";
import "./Styles.css";
import EmployerDetails from "./pages/EmployerDetails";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <header>{currentUser && <NavBar />}</header>
      <main className="bg-image">
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
            path="locations"
            element={
              <PrivateRoute>
                <Locations />
              </PrivateRoute>
            }
          />
          <Route
            path="skills"
            element={
              <PrivateRoute>
                <Skills />
              </PrivateRoute>
            }
          />
          <Route
            path="categories"
            element={
              <PrivateRoute>
                <Categories />
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
          <Route
            path="employer"
            element={
              <PrivateRoute>
                <EmployerDetails />
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
