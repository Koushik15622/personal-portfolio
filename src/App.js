import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Background } from "./components/Background";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Banner />
        <Skills />
        <Background />
        <Contact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
