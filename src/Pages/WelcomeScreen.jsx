import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, User } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Logo */}
              <motion.div
                className="flex justify-center mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="relative group">
                  {/* Glowing Background */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-indigo-600/40 via-purple-600/40 to-pink-600/40 rounded-full blur-2xl opacity-70 animate-pulse"></div>
                  
                  {/* Logo Container - Circular */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-full border-2 border-white/30 flex items-center justify-center shadow-2xl overflow-hidden">
                    {/* Inner Glow */}
                    <div className="absolute inset-3 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-sm"></div>
                    
                    {/* Logo Image - Circular */}
                    <img 
                      src="/logo.png" 
                      alt="Dharaanishan S Logo" 
                      className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full z-10 border-2 border-white/20"
                    />
                    
                    {/* Rotating Ring */}
                    <div className="absolute inset-0 border-2 border-transparent rounded-full" 
                         style={{
                           background: 'conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.5), rgba(168, 85, 247, 0.5), transparent)',
                           animation: 'spin 8s linear infinite'
                         }}>
                    </div>
                  </div>
                  
                  {/* Floating Particles */}
                  <div className="absolute -top-3 -right-3 w-4 h-4 bg-indigo-400 rounded-full animate-bounce opacity-70"></div>
                  <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute top-1/2 -left-5 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/2 -right-5 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '1.5s'}}></div>
                </div>
              </motion.div>

              {/* Icons */}
              <motion.div
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div
                    key={index}
                    data-aos="fade-down"
                    data-aos-delay={index * 200 + 400}
                  >
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                className="text-center mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  <div className="mb-2 sm:mb-4">
                    <span
                      data-aos="fade-right"
                      data-aos-delay="200"
                      className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                    >
                      Welcome
                    </span>{" "}
                    <span
                      data-aos="fade-right"
                      data-aos-delay="400"
                      className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                    >
                      To
                    </span>{" "}
                    <span
                      data-aos="fade-right"
                      data-aos-delay="600"
                      className="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                    >
                      My
                    </span>
                  </div>
                  <div>
                    <span
                      data-aos="fade-up"
                      data-aos-delay="800"
                      className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      Portfolio
                    </span>{" "}
                    <span
                      data-aos="fade-up"
                      data-aos-delay="1000"
                      className="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      Website
                    </span>
                  </div>
                </h1>
              </motion.div>

              {/* Website Link */}
              <motion.div
                className="text-center"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Dharaanishan's Portfolio
                    </span>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
