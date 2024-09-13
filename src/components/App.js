import React, { useEffect } from "react";

import Header from "./header";
import About from "./about";

import "./css/App.css";

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
    </div>
  );
}

export default App;
