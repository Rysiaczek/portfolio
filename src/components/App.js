import React, { useEffect } from "react";

import About from "./about";
import Header from "./header";
import Projects from "./projects";
import Skils from "./skils";

import "./css/App.css";
import Contact from "./contact";

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="app">
      <Header />
      <About />
      <Projects />
      <Skils />
      <Contact />
    </div>
  );
}

export default App;
