import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "./components/sections/About";
import Project from "./components/sections/Project";
import Article from "./components/sections/Article";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Education from "./components/sections/Education";
import Skill from "./components/sections/Skill";
import Experience from "./components/sections/Experience";
import Gallery from "./components/sections/Gallery";
import ToastContainer from "./components/ui/toast-container";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skill />
      <Experience />
      <Project />
      <Article />
      <Gallery />
      <Contact />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
