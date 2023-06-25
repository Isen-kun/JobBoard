import React, { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/Navbar/NavBar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Applications from "./pages/Applications";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <header>{true && <NavBar />}</header>
        <main>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="home" element={<Home />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="applications" element={<Applications />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
