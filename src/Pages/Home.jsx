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
import SocialPreview from "../components/SocialPreview";

// Data Science Animation - Exact Match to Reference Image
const DataScienceAnimation = memo(() => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Central Monitor */}
    <div className="relative z-10">
      <div className="w-80 h-48 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg border-4 border-slate-500 shadow-2xl">
        <div className="w-full h-full p-6">
          {/* Code Lines */}
          <div className="space-y-3">
            <div className="h-3 bg-blue-400 rounded w-4/5 animate-pulse"></div>
            <div className="h-3 bg-green-400 rounded w-3/5 animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="h-3 bg-purple-400 rounded w-2/3 animate-pulse" style={{animationDelay: '0.4s'}}></div>
            <div className="h-3 bg-yellow-400 rounded w-1/2 animate-pulse" style={{animationDelay: '0.6s'}}></div>
          </div>
          
          {/* Code Icon - Bottom Left */}
          <div className="absolute bottom-6 left-6">
            <div className="w-10 h-8 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">&lt;/&gt;</span>
            </div>
          </div>
          
          {/* Data Visualization - Bottom Right */}
          <div className="absolute bottom-6 right-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
      
      {/* Monitor Stand */}
      <div className="w-40 h-6 bg-slate-500 mx-auto mt-3 rounded"></div>
      <div className="w-28 h-10 bg-slate-600 mx-auto mt-2 rounded"></div>
    </div>

    {/* Phone - Right Side */}
    <div className="absolute top-12 right-12 z-20">
      <div className="w-16 h-28 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg border-2 border-slate-500 shadow-lg animate-bounce" style={{animationDuration: '3s'}}>
        <div className="w-full h-full p-3">
          <div className="w-10 h-10 bg-green-500 rounded-full mx-auto mt-4 flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-full"></div>
          </div>
          <div className="w-6 h-6 bg-slate-400 rounded-full mx-auto mt-4"></div>
        </div>
      </div>
    </div>

    {/* Cloud - Top Left */}
    <div className="absolute top-6 left-12 z-20">
      <div className="w-20 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full relative animate-bounce" style={{animationDuration: '4s', animationDelay: '0.5s'}}>
        <div className="absolute -top-2 left-3 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        <div className="absolute -top-2 right-3 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        <div className="absolute -bottom-1 left-4 w-8 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        {/* Arrow pointing down */}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-3 border-r-3 border-t-6 border-transparent border-t-blue-400"></div>
        </div>
      </div>
    </div>

    {/* Data List - Top Center */}
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
      <div className="w-16 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded flex flex-col justify-between p-2 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '1s'}}>
        <div className="w-full h-1.5 bg-white rounded"></div>
        <div className="w-full h-1.5 bg-white rounded"></div>
        <div className="w-full h-1.5 bg-white rounded"></div>
      </div>
    </div>

    {/* Gear - Bottom Left */}
    <div className="absolute bottom-12 left-8 z-20">
      <div className="w-12 h-12 border-4 border-blue-400 rounded-full flex items-center justify-center animate-spin" style={{animationDuration: '8s'}}>
        <div className="w-6 h-6 border-2 border-blue-300 rounded-full"></div>
      </div>
    </div>

    {/* Gear - Top Right */}
    <div className="absolute top-24 right-20 z-20">
      <div className="w-10 h-10 border-3 border-purple-400 rounded-full flex items-center justify-center animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}>
        <div className="w-4 h-4 border border-purple-300 rounded-full"></div>
      </div>
    </div>

    {/* Chart - Bottom Right */}
    <div className="absolute bottom-20 right-8 z-20">
      <div className="w-16 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded flex items-end justify-between p-2 animate-bounce" style={{animationDuration: '2s'}}>
        <div className="w-2 h-6 bg-white rounded"></div>
        <div className="w-2 h-8 bg-white rounded"></div>
        <div className="w-2 h-4 bg-white rounded"></div>
        <div className="w-2 h-7 bg-white rounded"></div>
      </div>
    </div>

    {/* Background Gears - Large */}
    <div className="absolute inset-0 opacity-20 z-0">
      <div className="absolute top-1/4 left-1/4 w-24 h-24 border-3 border-gray-400 rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border-3 border-gray-400 rounded-full animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
    </div>
  </div>
));

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

const SocialLink = memo(({ icon: Icon, platform, onClick }) => (
  <button onClick={() => onClick(platform)} className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["AI & Data Science Student", "AI/ML/DS Enthusiast"];
const TECH_STACK = ["Python", "Artificial Intelligence", "Machine Learning", "Deep Learning", "PostgreSQL"];
const SOCIAL_LINKS = [
  { icon: Github, platform: "github" },
  { icon: Linkedin, platform: "linkedin" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [previewPlatform, setPreviewPlatform] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSocialClick = (platform) => {
    setPreviewPlatform(platform);
  };

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
                    <SocialLink key={index} {...social} onClick={handleSocialClick} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Data Science Animation */}
            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <DataScienceAnimation />
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Preview Modal */}
      <SocialPreview
        isOpen={previewPlatform !== null}
        onClose={() => setPreviewPlatform(null)}
        platform={previewPlatform}
      />
    </div>
  );
};

export default memo(Home);
