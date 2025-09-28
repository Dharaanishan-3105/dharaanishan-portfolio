import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
} from "lucide-react";
// Removed Lottie import - using CSS animations instead
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    {/* Name Display */}
    <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-300">
        Dharaanishan S
      </h2>
    </div>
    
    {/* Main Title */}
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Data
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Analyst
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs sm:text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-gray-200 ${
              text === "Contact"
                ? "group-hover:translate-x-1"
                : "group-hover:rotate-45"
            } transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["AI & Data Science Student", "AI/ML/DS Enthusiast"];
const TECH_STACK = ["Python", "Artificial Intelligence", "Machine Learning", "Deep Learning", "PostgreSQL"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/Dharaanishan-3105" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/dharaanishan-selvendran-4d312005" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Data Science Animation Component
  const DataScienceAnimation = () => (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main Monitor */}
      <div className="relative">
        {/* Monitor Screen */}
        <div className="w-64 h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-4 border-gray-600 shadow-2xl">
          {/* Screen Content */}
          <div className="w-full h-full p-4">
            {/* Code Lines */}
            <div className="space-y-2">
              <div className="h-2 bg-blue-400 rounded w-3/4 animate-pulse"></div>
              <div className="h-2 bg-green-400 rounded w-1/2 animate-pulse delay-100"></div>
              <div className="h-2 bg-purple-400 rounded w-2/3 animate-pulse delay-200"></div>
              <div className="h-2 bg-yellow-400 rounded w-1/3 animate-pulse delay-300"></div>
            </div>
            
            {/* Data Visualization */}
            <div className="absolute bottom-4 right-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
        
        {/* Monitor Stand */}
        <div className="w-32 h-4 bg-gray-600 mx-auto mt-2 rounded"></div>
        <div className="w-20 h-8 bg-gray-700 mx-auto mt-1 rounded"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-8 right-8">
        {/* Phone */}
        <div className="w-12 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border-2 border-gray-500 shadow-lg animate-float">
          <div className="w-full h-full p-2">
            <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mt-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Icon */}
      <div className="absolute top-4 left-8 animate-float-delayed">
        <div className="w-16 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full relative">
          <div className="absolute -top-2 left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          <div className="absolute -top-2 right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          <div className="absolute -bottom-1 left-4 w-8 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
      </div>

      {/* Gear Icons */}
      <div className="absolute bottom-8 left-4 animate-spin-slow">
        <div className="w-8 h-8 border-4 border-gray-400 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
        </div>
      </div>

      <div className="absolute top-16 right-16 animate-spin-reverse">
        <div className="w-6 h-6 border-3 border-gray-400 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 border border-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Chart Icon */}
      <div className="absolute bottom-16 right-4 animate-bounce-slow">
        <div className="w-12 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded flex items-end justify-between p-1">
          <div className="w-2 h-4 bg-white rounded"></div>
          <div className="w-2 h-6 bg-white rounded"></div>
          <div className="w-2 h-3 bg-white rounded"></div>
          <div className="w-2 h-5 bg-white rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-0">
            {/* Left Column */}
            <div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="space-y-8 sm:space-y-10">
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="h-8 flex items-center"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p
                  className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  Implementing data-driven solutions to real-world problems through
                  AI, Machine Learning, and Web Development technologies.
                </p>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-3 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-row gap-3 w-full justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <CTAButton
                    href="#Portofolio"
                    text="Projects"
                    icon={ExternalLink}
                  />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div
                  className="flex gap-3 sm:gap-4 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1600"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Optimized Lottie Animation */}
            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full opacity-90">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                  }`}
                ></div>

                <div
                  className={`relative z-10 w-full opacity-90 transform transition-transform duration-500 ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}
                >
                  <DataScienceAnimation />
                </div>

                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-50" : "opacity-20"
                  }`}
                >
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
