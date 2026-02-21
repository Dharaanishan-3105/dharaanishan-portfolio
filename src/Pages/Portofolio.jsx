import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
// Removed SwipeableViews due to React 18 compatibility issues
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes, ExternalLink, Mail } from "lucide-react";
import { 
  SiPython, 
  SiHtml5, 
  SiJavascript, 
  SiMysql, 
  SiPostgresql, 
  SiMongodb, 
  SiFlask, 
  SiDjango, 
  SiTensorflow, 
  SiOpencv, 
  SiPandas,
  SiR,
  SiGit,
  SiNumpy
} from "react-icons/si";
import { 
  FaJava, 
  FaCoffee, 
  FaDatabase, 
  FaCode, 
  FaFileExcel, 
  FaChartLine, 
  FaTable, 
  FaChartBar, 
  FaChartArea, 
  FaServer, 
  FaTerminal, 
  FaPython, 
  FaBrain, 
  FaEye, 
  FaBookOpen 
} from "react-icons/fa";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  // Programming Languages
  { icon: SiPython, language: "Python" },
  { icon: SiR, language: "R" },
  { icon: FaJava, language: "Java" },
  { icon: SiHtml5, language: "HTML/CSS" },
  { icon: SiJavascript, language: "JavaScript" },
  
  // Databases
  { icon: SiMysql, language: "MySQL" },
  { icon: SiPostgresql, language: "PostgreSQL" },
  { icon: SiMongodb, language: "MongoDB" },
  
  // Tools & Software
  { icon: FaFileExcel, language: "Excel" },
  { icon: FaChartBar, language: "PowerBI" },
  { icon: FaChartArea, language: "Tableau" },
  { icon: SiGit, language: "Git" },
  { icon: FaServer, language: "Hadoop" },
  { icon: FaTerminal, language: "VS Code" },
  { icon: FaPython, language: "Anaconda Navigator" },
  { icon: FaBookOpen, language: "Jupyter Notebook" },
  
  // Frameworks
  { icon: SiFlask, language: "Flask" },
  { icon: SiDjango, language: "Django" },
  { icon: SiTensorflow, language: "TensorFlow" },
  { icon: FaBrain, language: "PyTorch" },
  { icon: SiOpencv, language: "OpenCV" },
  { icon: FaEye, language: "Scikit-learn" },
  { icon: SiPandas, language: "Pandas" },
  { icon: SiNumpy, language: "NumPy" },
  { icon: FaChartLine, language: "Matplotlib" },
];

// ——— Edit your projects here: add, remove, update titles, GitHub links, images, and add liveDemoUrl when you have a live demo ———
const PORTFOLIO_PROJECTS = [
  {
    id: "neethi-ai",
    title: "NeethiAI – AI-Powered Legal Assistant",
    year: "2026",
    description: "AI-driven legal assistance platform tailored for Indian citizens, offering bilingual support (Tamil & English) to answer legal queries, analyze legal documents, and detect fraudulent legal notices. Built with a scalable Flask backend, PostgreSQL storage, advanced OCR, and large language model integration for contextual legal guidance.",
    image: "https://opengraph.githubassets.com/f6563d69971bb2f0dfe681eae2f76e410257399c2111a551ba696b6b1c15e441/Dharaanishan-3105/Neethi-AI",
    imageAlt: "NeethiAI Legal Assistant Interface",
    techStack: ["Python", "Flask", "PostgreSQL", "EasyOCR", "HTML", "CSS", "JavaScript"],
    features: [
      "AI-powered legal query resolution with contextual responses",
      "Bilingual support in Tamil and English",
      "Document upload and analysis (PDF, DOCX, images)",
      "OCR extraction and fraud detection for legal documents",
      "Voice input/output with multilingual support",
      "Responsive, mobile-friendly Progressive Web App design"
    ],
    githubUrl: "https://github.com/Dharaanishan-3105/Neethi-AI",
    liveDemoUrl: "https://neethi-ai-6c31.onrender.com",
    badges: [],
    showInInitial: true,
  },
  {
    id: "healthsync-hms",
    title: "HealthSync – Smart Hospital Management System",
    year: "2025",
    description: "Comprehensive AI-powered hospital management system built with Flask and PostgreSQL to streamline healthcare operations. Includes role-based access control, patient records, appointment scheduling, prescriptions, billing, lab results, and predictive analytics.",
    image: "https://opengraph.githubassets.com/66ee713bc491eb2902e2274ab3ab69e1d34344f21345516bc3727e9573b12ac1/Dharaanishan-3105/Healthsync",
    imageAlt: "HealthSync Hospital Management System Dashboard",
    techStack: ["Python", "Flask", "PostgreSQL", "HTML", "CSS", "JavaScript"],
    features: [
      "Role-based access control for admin, doctor, nurse, patient & staff",
      "Patient management with medical history and insurance tracking",
      "Appointment scheduling and telemedicine support",
      "Prescription and lab test management",
      "Billing & payment with insurance claim handling",
      "AI-powered predictive analytics and smart scheduling"
    ],
    githubUrl: "https://github.com/Dharaanishan-3105/Healthsync",
    liveDemoUrl: null,
    badges: [],
    showInInitial: true,
  },
  {
    id: "parkaro-smart-parking",
    title: "ParKaro – Smart Urban Parking System",
    year: "2026",
    description: "Web-based smart parking management platform designed to improve parking efficiency in busy cities. Users can search and reserve parking slots in real time, make online payments, and manage bookings while admins can configure locations, pricing rules, and analytics dashboards for operational insights.",
    image: "https://opengraph.githubassets.com/d9a871a903cd97c1c95750517669f16fa651e058d826aeb91d3952802aef2473/Dharaanishan-3105/ParKaro",
    imageAlt: "ParKaro Smart Parking Management System",
    techStack: ["Python", "Django", "MySQL", "HTML", "CSS", "JavaScript"],
    features: [
      "Real-time parking slot discovery and reservation",
      "Secure user authentication and vehicle profile management",
      "Online payments and QR-based entry/exit logging",
      "Dynamic pricing and refund policy configuration",
      "Admin dashboard with revenue & utilization analytics",
      "Booking history, extension, cancellation, and CSV export"
    ],
    githubUrl: "https://github.com/Dharaanishan-3105/ParKaro",
    liveDemoUrl: null,
    badges: [],
    showInInitial: true,
  },
  {
    id: "facesense",
    title: "FaceSense – Intelligent Face Recognition Attendance System",
    year: "2025",
    description: "AI-powered attendance system that uses real-time face recognition to automatically record and manage attendance with secure structured storage. Built with Python, OpenCV, Flask backend and an interactive React frontend.",
    image: "https://opengraph.githubassets.com/b1769c019163fc56bb4152f5233fbcba2dcf79d40336f8559aab2ca79cc066c0/Dharaanishan-3105/FaceSense",
    imageAlt: "FaceSense Intelligent Face Recognition Attendance System",
    techStack: ["Python", "OpenCV", "Flask", "React", "MySQL"],
    features: [
      "Real-time face recognition for attendance tracking",
      "Role-based dashboards for admin, teachers, and kiosk",
      "Secure SQL-based data storage",
      "Register students and staff with detailed profiles",
      "Campus boundary checks for valid attendance",
      "Export attendance reports to Excel"
    ],
    githubUrl: "https://github.com/Dharaanishan-3105/FaceSense",
    liveDemoUrl: null,
    badges: [],
    showInInitial: true,
  },
  {
    id: "firealert",
    title: "FireAlert – Real-Time Fire Detection System",
    year: "2024",
    description: "AI-powered real-time fire detection system built with a custom-trained deep learning model. The system analyzes live camera feeds to detect flames and smoke, triggers instant alerts, and provides a web-based monitoring dashboard using Streamlit for real-time visualization and control.",
    image: "https://opengraph.githubassets.com/60b0c517f34d6aaa3016f1c15aca290ea799cf5da8bf523a90e30c2c96a3ef74/Dharaanishan-3105/FireAlert",
    imageAlt: "FireAlert Real-Time Fire Detection System Dashboard",
    techStack: ["Python", "Deep Learning", "OpenCV", "Streamlit", "Machine Learning"],
    features: [
      "Custom-trained fire detection model (not color-based)",
      "Real-time video stream analysis",
      "Instant alert triggering on fire detection",
      "Web-based monitoring dashboard using Streamlit",
      "Detection logging for monitoring and analysis",
      "Designed for CCTV-based deployment in homes, offices, and industries"
    ],
    githubUrl: "https://github.com/Dharaanishan-3105/FireAlert",
    liveDemoUrl: "https://firealert-dharaanishan.streamlit.app/",
    badges: [],
    showInInitial: true,
  },
  {
    id: "resultinsight",
    title: "ResultInsight – Student Result Analyzer",
    year: "2026",
    description: "Interactive web app that analyzes student result CSV files to produce visual insights, predictive arrear risk scoring, and downloadable PDF reports. Built with Streamlit, Plotly charts and logistic regression to help educators quickly assess performance trends.",
    image: "https://opengraph.githubassets.com/ffa7569d2d29ea71abb60acf1d805ff7333d674a3e316933489641fe3beff4af/Dharaanishan-3105/ResultInsight",
    imageAlt: "ResultInsight Student Result Analyzer Dashboard",
    techStack: ["Python", "Streamlit", "Pandas", "Plotly", "scikit-learn"],
    features: [
      "Upload student result CSV for instant insights",
      "Top performer rankings and subject-wise analysis",
      "Interactive Plotly charts for distribution and arrears",
      "Arrear-risk prediction using logistic regression",
      "Generate and download PDF summary reports"
    ],
    githubUrl: "https://github.com/Dharaanishan-3105/ResultInsight",
    liveDemoUrl: "https://resultinsight-dharaanishan.streamlit.app/",
    badges: [],
    showInInitial: true,
  },


  // Add more projects below; set showInInitial: false to show only when "See More" is clicked
  // {
  //   id: "object-detection",
  //   title: "Object Detection Mobile App",
  //   year: "2025",
  //   description: "Real-time mobile app for object detection with camera input. Provides bounding boxes, confidence scores, and Text-to-Speech feedback, optimized for Android devices.",
  //   image: "/projects/object-detection.png",
  //   imageAlt: "Object Detection App",
  //   techStack: ["Python", "TensorFlow Lite", "Android Studio", "Gradle"],
  //   features: ["Realtime bounding boxes", "TTS feedback", "Device optimized"],
  //   githubUrl: "https://github.com/Dharaanishan-3105/Object-Detection-Mobile-App",
  //   liveDemoUrl: null,
  //   badges: [],
  //   showInInitial: false,
  // },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllTechStack, setShowAllTechStack] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
    // Scroll to the appropriate section based on tab
    setTimeout(() => {
      if (newValue === 0) {
        // Projects tab - scroll to projects section
        const projectsSection = document.querySelector('#Portofolio');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (newValue === 1) {
        // Certificates tab - scroll to certificates section
        const certificatesSection = document.querySelector('#Portofolio');
        if (certificatesSection) {
          certificatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (newValue === 2) {
        // Tech Stack tab - scroll to tech stack section
        const techStackSection = document.querySelector('#Portofolio');
        if (techStackSection) {
          techStackSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else if (type === 'certificates') {
      setShowAllCertificates(prev => !prev);
    } else if (type === 'techstack') {
      setShowAllTechStack(prev => !prev);
    }
  }, []);

  const displayedProjectsFromData = showAllProjects ? PORTFOLIO_PROJECTS : PORTFOLIO_PROJECTS.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);
  const displayedTechStack = showAllTechStack ? techStacks : techStacks.slice(0, 12);

  const openProjectModal = (project) => {
    setActiveProject({
      Title: project.title,
      Description: project.description,
      Img: project.image,
      TechStack: project.techStack,
      Features: project.features,
      Github: project.githubUrl,
      LiveDemoUrl: project.liveDemoUrl || null,
    });
  };

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <div className="tab-content">
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                  {displayedProjectsFromData.map((project, index) => (
                    <div
                      key={project.id}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 1 ? "1200" : "1000"}
                    >
                      <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="relative">
                          <img src={project.image} alt={project.imageAlt || project.title} className="w-full h-52 object-contain bg-white/5" />
                          {project.badges && project.badges.length > 0 && (
                            <div className="absolute top-3 right-3 flex gap-2">
                              {project.badges.map((badge) => (
                                <span
                                  key={badge}
                                  className={`px-2 py-0.5 text-[10px] rounded-full border ${
                                    badge === "FEATURED" ? "bg-pink-500/20 text-pink-300 border-pink-400/30" : "bg-green-500/20 text-green-300 border-green-400/30"
                                  }`}
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                            <span className="text-[11px] text-gray-300 bg-white/5 rounded-full px-2 py-0.5 border border-white/10">{project.year}</span>
                          </div>
                          <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-5">
                            {project.techStack.map((tech) => (
                              <span key={tech} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded border border-white/10">{tech}</span>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 justify-between">
                            <button onClick={() => openProjectModal(project)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 text-sm border border-white/10">Project details</button>
                            <div className="flex items-center gap-2">
                              {project.liveDemoUrl && (
                                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-600/20 text-green-300 text-sm font-medium border border-green-400/30 hover:bg-green-600/30">
                                  Live Demo
                                </a>
                              )}
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View Project →</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* See More Button for Projects - only when there are more than initial count */}
                {PORTFOLIO_PROJECTS.length > initialItems && (
                  <div className="flex justify-center mt-8">
                    <ToggleButton 
                      onClick={() => toggleShowMore('projects')} 
                      isShowingMore={showAllProjects} 
                    />
                  </div>
                )}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="w-full max-w-4xl">
                <div 
                  className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 text-center backdrop-blur-xl border border-white/10"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      20+ Professional Certificates
                    </h3>
                    <p className="text-gray-300 text-lg mb-8">
                      I have earned over 20 professional certificates in AI, Machine Learning, Web Development, and Data Science. 
                      Full certificates available upon request for verified employers.
                    </p>
                  </div>
                  
                  {/* Certificate Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        AI & Machine Learning
                      </h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• .</li>
                        <li>• .</li>
                        <li>• .</li>
                        <li>• .</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Web Development
                      </h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• .</li>
                        <li>• .</li>
                        <li>• .</li>
                        <li>• .</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        Data Science
                      </h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• .</li>
                        <li>• .</li>
                        <li>• .</li>
                        <li>• .</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        Cloud & Tools
                      </h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• .</li>
                        <li>• .</li>
                        <li>• .</li>
                        <li>• .</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Watermarked Certificates Preview */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-4 text-center">
                      Certificate Preview
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Replace these with your actual watermarked certificate Google Drive links */}
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                        <img 
                          src="https://drive.google.com/thumbnail?id=YOUR_CERTIFICATE_1_ID&sz=w400" 
                          alt="Certificate 1 Preview"
                          className="w-full h-32 object-cover rounded-lg mb-2"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-32 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-lg mb-2 flex items-center justify-center text-gray-400" style={{display: 'none'}}>
                          Certificate 1
                        </div>
                        <p className="text-sm text-gray-300">AI/ML Certificate</p>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                        <img 
                          src="https://drive.google.com/thumbnail?id=YOUR_CERTIFICATE_2_ID&sz=w400" 
                          alt="Certificate 2 Preview"
                          className="w-full h-32 object-cover rounded-lg mb-2"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-32 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-lg mb-2 flex items-center justify-center text-gray-400" style={{display: 'none'}}>
                          Certificate 2
                        </div>
                        <p className="text-sm text-gray-300">Data Science Certificate</p>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                        <img 
                          src="https://drive.google.com/thumbnail?id=YOUR_CERTIFICATE_3_ID&sz=w400" 
                          alt="Certificate 3 Preview"
                          className="w-full h-32 object-cover rounded-lg mb-2"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-32 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-lg mb-2 flex items-center justify-center text-gray-400" style={{display: 'none'}}>
                          Certificate 3
                        </div>
                        <p className="text-sm text-gray-300">Web Development Certificate</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://drive.google.com/drive/folders/1QR4HPqFdkwxURAW9VBt06rK2BDhaoX6J"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                      onClick={(e) => {
                        // Check if link is accessible
                        console.log('🔗 Opening certificates folder...');
                        console.log('📁 Folder ID: 1QR4HPqFdkwxURAW9VBt06rK2BDhaoX6J');
                        console.log('💡 If 404 error: Make sure folder is set to "Anyone with the link can view"');
                      }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      View All Certificates
                    </a>
                    
                    <a
                      href="mailto:studentdharaan@gmail.com?subject=Certificate Verification Request&body=Hello Dharaanishan,%0D%0A%0D%0AI would like to request access to your professional certificates for verification purposes.%0D%0A%0D%0APlease provide your company details and verification requirements.%0D%0A%0D%0AThank you."
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      <Mail className="w-5 h-5" />
                      Request Full Certificates
                    </a>
                    
                    <a
                      href="https://www.linkedin.com/in/dharaanishan-selvendran-4d312005"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View LinkedIn
                    </a>
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-400">
                    <p>🔒 Certificates are protected for security and authenticity</p>
                    <p>📧 Available upon verified employer request</p>
                    <p>✅ All certificates are verified and authentic</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                  {displayedTechStack.map((stack, index) => (
                    <div
                      key={index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                    </div>
                  ))}
                </div>

                {/* See More Button for Tech Stack */}
                <div className="flex justify-center mt-8">
                  <ToggleButton 
                    onClick={() => toggleShowMore('techstack')} 
                    isShowingMore={showAllTechStack} 
                  />
                </div>
              </div>
            </div>
          </TabPanel>
        </div>
      </Box>

      {/* Project Details Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60" onClick={() => setActiveProject(null)}>
          <div className="relative w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b0b14] border border-white/10" onClick={(e)=>e.stopPropagation()}>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">{activeProject.Title}</h3>
                <button className="px-3 py-1 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20" onClick={()=>setActiveProject(null)}>Close</button>
              </div>
              <img src={activeProject.Img} alt={activeProject.Title} className="w-full max-h-72 object-contain rounded-xl border border-white/10 mb-6 bg-white/5" />
              <p className="text-gray-300 mb-6">{activeProject.Description}</p>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Project Details</h4>
                  <ul className="space-y-2">
                    {(activeProject.Features||[]).map((f,i)=> (
                      <li key={i} className="flex items-start gap-2 text-gray-300"><span className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></span>{f}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {(activeProject.TechStack||[]).map((t,i)=> (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-200 border border-white/10">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-3">
                {activeProject.LiveDemoUrl && (
                  <a href={activeProject.LiveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600/20 text-green-200 border border-green-400/30 hover:bg-green-600/30">Live Demo <ExternalLink className="w-4 h-4"/></a>
                )}
                <a href={activeProject.Github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/20 text-indigo-200 border border-indigo-400/30 hover:bg-indigo-600/30">View Project <ExternalLink className="w-4 h-4"/></a>
                <button className="px-4 py-2 rounded-lg bg-white/10 text-gray-200 hover:bg-white/20" onClick={()=>setActiveProject(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}