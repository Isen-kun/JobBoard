import React, { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
// import AppRoutes from './AppRoutes';
// import { Layout } from './components/Layout';
// import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <header>{/* <NavBar /> */}</header>
        <main>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="home" element={<Home />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}
