import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <ContactPage />
          <footer className="relative mt-16">
            <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
              <div>
                <h4 className="text-white font-semibold mb-2">Dharaanishan S</h4>
                <p className="text-sm opacity-80">Data Analyst & Python Web Developer</p>
                <p className="text-sm mt-3 text-gray-400 max-w-md">
                  Passionate about creating intelligent solutions through AI, Machine Learning, and modern web technologies. Let's build something amazing together.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <a
                    href="https://github.com/Dharaanishan-3105"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dharaanishan-s/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="mailto:studentdharaan@gmail.com"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-2">Quick Links</h5>
                <ul className="space-y-1 text-sm opacity-80">
                  <li><a href="#Home" className="hover:text-white">Home</a></li>
                  <li><a href="#About" className="hover:text-white">About</a></li>
                  <li><a href="#Portofolio" className="hover:text-white">Projects</a></li>
                  <li><a href="#Contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-semibold mb-2">Contact Info</h5>
                <ul className="space-y-1 text-sm opacity-80">
                  <li>📧 studentdharaan@gmail.com</li>
                  <li>📍 Trichy, Tamil Nadu, India</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
              © 2025 Dharaanishan. Built with ❤ using modern web technologies
            </div>

            {/* Scroll-to-top Arrow */}
            <button
              aria-label="Scroll to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg border border-white/10 hover:scale-105 transition-transform"
            >
              ↑
            </button>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2023{" "}
          <a href="#" className="hover:underline">
            Dharaanishan™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;