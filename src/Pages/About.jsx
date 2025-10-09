import React, { useEffect, memo, useMemo, useState } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  UserCheck,
  Briefcase,
  GraduationCap,
  Trophy,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Empowering businesses through intelligent data solutions
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* Professional Profile Frame - Clean & Elegant */}
      <div className="relative">
        {/* Subtle Background Glow - Away from face */}
        <div className="absolute -inset-8 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-full blur-2xl opacity-60"></div>
        
        {/* Main Profile Container */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96">
          {/* Professional Border Ring */}
          <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-r from-cyan-400 to-blue-500">
            <div className="w-full h-full bg-gray-900 rounded-full overflow-hidden">
              <img 
                src="/Dharaanishan.jpg" 
                alt="Dharaanishan S - AI & Data Science Professional"
                className="w-full h-full object-cover"
                onLoad={(e) => {
                  console.log('✅ Profile image loaded successfully');
                  e.target.nextSibling.style.display = 'none';
                }}
                onError={(e) => {
                  console.log('❌ Image failed to load, showing fallback');
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold" style={{display: 'none'}}>
                DS
              </div>
            </div>
          </div>
          
          {/* Subtle Background Elements - Positioned away from face */}
          <div className="absolute -top-12 -right-12 w-4 h-4 bg-cyan-400/40 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-12 -left-12 w-3 h-3 bg-blue-500/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/4 -left-16 w-2 h-2 bg-purple-500/40 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 -right-16 w-2 h-2 bg-cyan-300/40 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>
        
        {/* Elegant Rotating Ring - Subtle */}
        <div className="absolute inset-0 border border-transparent rounded-full" 
             style={{
               background: 'conic-gradient(from 0deg, transparent, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3), transparent)',
               animation: 'spin 12s linear infinite'
             }}>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation, onClick }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span
            className="text-4xl font-bold text-white"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
            className="text-sm uppercase tracking-wider text-gray-300 mb-2"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-gray-400"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  )
);

// Enhanced Experience Card Component
const ExperienceCard = memo(({ experience, isExpanded, onToggle }) => {
  const Icon = experience.icon;
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-2xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-5 rounded-2xl`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${experience.color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{experience.title}</h3>
              <p className="text-gray-300">{experience.company}</p>
            </div>
          </div>
          <button
            onClick={() => onToggle(experience.id)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {experience.duration}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {experience.location}
          </div>
          <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
            {experience.type}
          </span>
        </div>

        <p className="text-gray-300 mb-4">{experience.description}</p>

        {isExpanded && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Key Achievements</h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

// Enhanced Achievement Card Component
const AchievementCard = memo(({ achievement, isExpanded, onToggle }) => {
  const Icon = achievement.icon;
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-2xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-5 rounded-2xl`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
              <p className="text-gray-300">{achievement.organization}</p>
            </div>
          </div>
          <button
            onClick={() => onToggle(achievement.id)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {achievement.date}
          </div>
          <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
            {achievement.category}
          </span>
        </div>

        <p className="text-gray-300 mb-4">{achievement.description}</p>

        {isExpanded && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Project Details</h4>
              <ul className="space-y-2">
                {achievement.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {achievement.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const AboutPage = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]"
    );

    const startDate = new Date("2022-08-01");
    const today = new Date();
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today <
      new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
        ? 1
        : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience,
    };
  }, []);

  // Work Experience Data
  const workExperience = [
    {
      id: 'web-dev-intern',
      title: 'Web Development Intern',
      company: 'Sri Sai Tech and HR Solutions',
      duration: 'Aug 2024 - Sep 2024',
      location: 'Trichy, India',
      type: 'Internship',
      description: 'Successfully completed a 120-hour Web Development internship at Sri Sai Tech and HR Solutions.',
      achievements: [
        'Gained practical experience in building and deploying web applications',
        'Demonstrated strong problem-solving abilities and attention to detail',
        'Worked on real-world development tasks and projects',
        'Completed comprehensive web development training program'
      ],
      technologies: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Web Development'],
      icon: Briefcase,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'shadowfox-ds-intern-2025',
      title: 'Data Science Intern — ShadowFox (MSME Initiative)',
      company: 'ShadowFox',
      duration: 'Mar 2025',
      location: 'Virtual',
      type: 'Internship',
      description: 'Completed a one-month virtual internship focusing on practical applications of Data Science across Beginner, Intermediate, and Advanced phases.',
      achievements: [
        'Beginner: Built data visualizations with Matplotlib and Seaborn',
        "Intermediate: Performed EDA on Delhi's AQI to study seasonal and regional pollutant behavior",
        'Advanced: Analysed IPL fielding performance and built a simple scoring model',
        'Improved analytical, documentation, and presentation skills using real datasets',
      ],
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      icon: Briefcase,
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  // Achievements Data
  const achievements = [
    {
      id: 'project-expo-2024',
      title: '1st Prize - Project Expo',
      organization: 'Indra Ganesan College of Engineering',
      date: '2024',
      category: 'Innovation',
      description: 'Won First Prize in Project Expo (2024) with "Fire Detection & Alert System".',
      details: [
        'Developed real-time AI-based fire detection with alerts',
        'Demonstrated system reliability and configurable sensitivity',
      ],
      technologies: ['Python', 'OpenCV', 'Deep Learning'],
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      year: '2024'
    },
    {
      id: 'project-expo-2025',
      title: '1st Prize - Project Expo',
      organization: 'Indra Ganesan College of Engineering',
      date: '2025',
      category: 'Innovation',
      description: 'Won First Prize in Project Expo (2025) with "NeethiAI – A GenAI Legal Companion".',
      details: [
        'Bilingual legal Q&A and document summarization',
        'Fake notice detection using verified sources',
      ],
      technologies: ['Python', 'Flask', 'PostgreSQL'],
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      year: '2025'
    },
    {
      id: 'sih-2024-internal-finalist',
      title: 'Smart India Hackathon Finalist (Internal) – 2024',
      organization: 'Smart India Hackathon – Student Innovation',
      date: '2024',
      category: 'AI, Accessibility',
      description: 'AI‑Powered Sign Language Learning and Conversion: Bridging Communication for the Deaf and Mute.',
      details: [
        'Two‑way Sign ↔ Speech/Text using CV, NLP, and avatars',
        'Interactive sign learning modules and accessibility focus',
        'Real-time gesture recognition via camera',
        'Voice-to-sign conversion and educational modules'
      ],
      technologies: ['Computer Vision', 'NLP', 'Web Platform', '3D Avatars'],
      icon: Award,
      color: 'from-sky-500 to-indigo-500',
      year: '2024'
    },
    {
      id: 'mole-1-0-special-prize-2025',
      title: 'Mole 1.0 Hackathon – Special Prize Winner',
      organization: 'Indra Ganesan Institutions (Internal Idea Event)',
      date: '24 Mar 2025',
      category: 'Hackathon',
      description: 'Won the Special Prize for developing an AI-based communication and learning platform that translates Tamil Sign Language gestures into text and speech in real time.',
      details: [
        'Real‑time TSL to text/speech with interactive learning',
        'Bridges communication gaps using AI and computer vision',
        'Interactive sign-learning module to help bridge communication between deaf/mute individuals and the hearing community',
        'Promoting inclusivity and accessibility through AI and computer vision'
      ],
      technologies: ['Python', 'Computer Vision', 'NLP', 'Web', 'Tamil Sign Language'],
      icon: Award,
      color: 'from-fuchsia-500 to-pink-500',
      year: '2025'
    },
    {
      id: 'typewriting-english-2023',
      title: 'Government Technical Examination – Typewriting (English)',
      organization: 'Dept. of Technical Education, Govt. of Tamil Nadu',
      date: 'Feb 2023',
      category: 'Certification',
      description: 'Successfully completed the Junior Grade Typewriting in English with a speed of 30 words per minute, awarded First Class with Distinction by the Government of Tamil Nadu, Department of Technical Education.',
      details: [
        'Demonstrates high typing accuracy and documentation skills',
        'This certification demonstrates strong typing accuracy, focus, and professional documentation skills',
        'Completed with First Class with Distinction grade'
      ],
      technologies: ['English Typewriting', 'Documentation', 'Professional Skills'],
      icon: GraduationCap,
      color: 'from-indigo-500 to-purple-500',
      year: '2023'
    },
    {
      id: 'sih-2023-internal-finalist',
      title: 'Smart India Hackathon Finalist (Internal) – 2023',
      organization: 'Smart India Hackathon – Student Innovation',
      date: '2023',
      category: 'AI, Computer Vision',
      description:
        'Proposed an AI-powered wearable mobility aid combining stereo vision and deep learning to assist visually impaired users with real-time detection of traffic signs, moving obstacles, hanging objects, elevation changes, and crosswalks. Delivered voice-based feedback over Bluetooth and full voice-command operation for hands-free navigation.',
      details: [
        'Integrated OAK-D depth camera for stereo vision and depth perception',
        'Custom-trained object detection models for navigation cues',
        'GPS-based routing with voice-guided assistance',
        'Solar-powered battery support for portable, power-efficient usage',
      ],
      technologies: ['Stereo Vision', 'Deep Learning', 'OAK-D', 'Edge AI', 'TTS'],
      icon: Award,
      color: 'from-emerald-500 to-teal-500',
      year: '2023'
    },
    {
      id: 'webots-neotrex-2024',
      title: '1st Prize - Webots (Web Development)',
      organization: 'M.A.M College of Engineering',
      date: '2024',
      category: 'Web Development',
      description: 'Won 1st Prize in Webots (Web Development) competition at NEOTREX\'24.',
      details: [
        'Competed in web development challenges',
        'Demonstrated proficiency in modern web technologies',
        'Solved complex web development problems',
        'Achieved top position among participating teams'
      ],
      technologies: ['Web Development', 'HTML/CSS', 'JavaScript', 'React', 'Node.js'],
      icon: Award,
      color: 'from-green-500 to-teal-500',
      year: '2024'
    },
    {
      id: 'srm-competitions-2024',
      title: '2nd Prize - Multiple Events',
      organization: 'SRM Valliammai Engineering College',
      date: '2024',
      category: 'Competitions',
      description: 'Won 2nd Prize in both Analytix (Technical) and Flick Frenzy (Non-Technical) events.',
      details: [
        'Analytix (Technical): Demonstrated analytical and technical skills',
        'Flick Frenzy (Non-Technical): Showcased creativity and innovation',
        'Competed against students from multiple colleges',
        'Achieved recognition in both technical and non-technical domains'
      ],
      technologies: ['Technical Analysis', 'Problem Solving', 'Innovation', 'Creativity'],
      icon: GraduationCap,
      color: 'from-indigo-500 to-purple-500',
      year: '2024'
    }
  ];

  // Group achievements by year for timeline view
  const achievementsByYear = useMemo(() => {
    const groups = {};
    achievements.forEach((item) => {
      const extracted = (item.date && item.date.match(/\d{4}/g)) || [];
      const year = item.year || (extracted.length ? extracted[0] : 'Other');
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
    });
    // Sort years desc and items by title
    return Object.entries(groups)
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([year, items]) => [year, items.sort((x, y) => x.title.localeCompare(y.title))]);
  }, [achievements]);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();

    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: 4,
        label: "Major Projects",
        description: "AI & ML solutions implemented",
        animation: "fade-right",
        onClick: () => {
          // Scroll to Portfolio projects section
          const portfolioSection = document.querySelector("#Portofolio");
          if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
            // Wait a bit then switch to projects tab
            setTimeout(() => {
              const projectsTab = document.querySelector('[data-tab="projects"]');
              if (projectsTab) projectsTab.click();
            }, 500);
          }
        }
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: 20,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
        onClick: () => {
          // Scroll to Portfolio certificates section
          const portfolioSection = document.querySelector("#Portofolio");
          if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
            // Wait a bit then switch to certificates tab
            setTimeout(() => {
              const certificatesTab = document.querySelector('[data-tab="certificates"]');
              if (certificatesTab) certificatesTab.click();
            }, 500);
          }
        }
      },
      {
        icon: UserCheck,
        color: "from-[#6366f1] to-[#a855f7]",
        value: "★",
        label: "Experience & Achievements",
        description: "Professional journey & awards",
        animation: "fade-left",
        onClick: () => {
          setActiveSection('experience');
        }
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Dharaanishan S
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              I am a dedicated AI & Data Science professional with a strong foundation in machine learning, data analysis, and web technologies. Currently pursuing B.Tech at Indra Ganesan College of Engineering with an 8.32 CGPA, I specialize in developing intelligent solutions that drive business value. My expertise spans Python, machine learning frameworks, and full-stack development, with a proven track record of delivering innovative projects in hackathons and professional environments. I have successfully completed internships and won multiple awards, including 1st Prize in Project Expo and Webots competitions, demonstrating my commitment to excellence in technology and innovation.
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a
                href="https://drive.google.com/drive/folders/19c-DoQZKJNRqAGKjx7sxYp50R6QlzYwp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              <a href="#Portofolio" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200"
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 px-4">
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-1 sm:p-2 border border-white/10 w-full max-w-md">
            <div className="flex gap-1 sm:gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: Globe },
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'achievements', label: 'Achievements', icon: Trophy }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-xl transition-all duration-300 text-xs sm:text-sm flex-1 justify-center ${
                    activeSection === tab.id
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {statsData.map((stat) => (
              <StatCard 
                key={stat.label} 
                {...stat} 
                onClick={stat.onClick}
              />
            ))}
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="space-y-6 mt-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Work Experience</h3>
            {workExperience.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isExpanded={expandedCard === exp.id}
                onToggle={(id) => setExpandedCard(expandedCard === id ? null : id)}
              />
            ))}
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="space-y-10 mt-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Achievements & Awards</h3>
            <div className="relative">
              {/* Timeline vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />

              <div className="space-y-10">
                {achievementsByYear.map(([year, items]) => (
                  <div key={year} className="relative pl-14">
                    {/* Year Node */}
                    <div className="absolute left-1 top-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center text-white font-bold shadow-lg">
                        {year}
                      </div>
                    </div>

                    {/* Year Section Card */}
                    <div className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Highlights of {year}</h4>

                      <div className="space-y-4">
                        {items.map((achievement) => {
                          const IconComp = achievement.icon;
                          return (
                            <div key={achievement.id} className="group bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                                    <IconComp className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <div className="text-white font-semibold">
                                      {achievement.title}
                                    </div>
                                    <div className="text-gray-400 text-sm">{achievement.organization}</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setExpandedCard(expandedCard === achievement.id ? null : achievement.id)}
                                  className="px-3 py-1.5 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
                                >
                                  {expandedCard === achievement.id ? 'Hide' : 'View'}
                                </button>
                              </div>

                              {expandedCard === achievement.id && (
                                <div className="mt-4 border-t border-white/10 pt-4 animate-fadeIn">
                                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{achievement.date}</div>
                                    <span className="px-2 py-1 bg-white/10 rounded-full text-xs">{achievement.category}</span>
                                  </div>
                                  <p className="text-gray-300 mb-3">{achievement.description}</p>
                                  <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                      <h5 className="text-sm font-semibold text-white mb-2">Project Details</h5>
                                      <ul className="space-y-2">
                                        {achievement.details.map((d, i) => (
                                          <li key={i} className="flex items-start gap-2 text-gray-300">
                                            <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-2 flex-shrink-0" />
                                            {d}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <h5 className="text-sm font-semibold text-white mb-2">Technologies Used</h5>
                                      <div className="flex flex-wrap gap-2">
                                        {achievement.technologies.map((t, i) => (
                                          <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">{t}</span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
