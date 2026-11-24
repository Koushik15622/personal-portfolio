import { useState } from "react";
import 'bootstrap/scss/bootstrap.scss';
import './App.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Background } from "./components/Background";
import { Footer } from "./components/Footer";

function App() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "dark";
    } catch {
      return false;
    }
  });

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    } catch {
      // Browsers with storage disabled still support switching for this visit.
    }
  }

  return (
    <div className="App" data-theme={dark ? "dark" : "light"}>
      <NavBar dark={dark} toggleTheme={toggleTheme} />
      <Banner />
      <Skills />
      <Background />
      <Footer />
    </div>
  );
}

export default App;
