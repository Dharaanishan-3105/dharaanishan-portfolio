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

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
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
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {/* NeethiAI - Legal AI Chatbot */}
                <div
                  data-aos="fade-up-right"
                  data-aos-duration="1000"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">NeethiAI – Legal AI Chatbot</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        A GenAI-based legal assistant that answers legal queries in English/Tamil, summarizes legal documents, detects fake notices, and provides tax/legal guidance using verified government sources.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">Python</span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">Flask</span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">PostgreSQL</span>
                        <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">HTML/CSS</span>
                      </div>
                    </div>
                    <a 
                      href="https://github.com/Dharaanishan-3105/NeethiAI-Legal-Chatbot" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200"
                    >
                      View Project →
                    </a>
                  </div>
                </div>

                {/* HealthSync – Hospital Management System */}
                <div
                  data-aos="fade-up"
                  data-aos-duration="1200"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">HealthSync – Hospital Management System</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        A web-based platform to manage patient records, doctor appointments, and prescriptions securely. Automates hospital operations with role-based access for patients, doctors, and staff.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">Python</span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">Flask</span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">PostgreSQL</span>
                        <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded">Machine Learning</span>
                      </div>
                    </div>
                    <a 
                      href="https://github.com/Dharaanishan-3105/HealthSync-Hospital-Management" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200"
                    >
                      View Project →
                    </a>
                  </div>
                </div>

                {/* Face Recognition Attendance System */}
                <div
                  data-aos="fade-up-left"
                  data-aos-duration="1000"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">Face Recognition Attendance System</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Automated student attendance using real-time face detection and recognition. Marks IN/OUT time, stores records in a database, and exports daily reports to Excel.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">Python</span>
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded">OpenCV</span>
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">SQLite</span>
                      </div>
                    </div>
                    <a 
                      href="https://github.com/Dharaanishan-3105/Face-Recognition-Attendance" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200"
                    >
                      View Project →
                    </a>
                  </div>
                </div>

                {/* Object Detection Mobile App */}
                <div
                  data-aos="fade-up-right"
                  data-aos-duration="1200"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">Object Detection Mobile App</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Real-time mobile app for object detection with camera input. Provides bounding boxes, confidence scores, and Text-to-Speech feedback, optimized for Android devices.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">Python</span>
                        <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">TensorFlow Lite</span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">Android Studio</span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">Gradle</span>
                      </div>
                    </div>
                    <a 
                      href="https://github.com/Dharaanishan-3105/Object-Detection-Mobile-App" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200"
                    >
                      View Project →
                    </a>
                  </div>
                </div>

              {/* Fire Detection & Alert System */}
              <div
                data-aos="fade-up"
                data-aos-duration="1100"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">Fire Detection & Alert System</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Real-time AI-based system that detects fire through camera feed and instantly triggers an audible alarm and sends email alerts. Logs all detection events and provides configurable sensitivity for flexible deployment in homes, offices, or industries.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">Python</span>
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded">OpenCV</span>
                      <span className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded">Deep Learning</span>
                    </div>
                  </div>
                  <a 
                    href="https://github.com/Dharaanishan-3105/Fire-Detection-Alert-System" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-200"
                  >
                    View Project →
                  </a>
                </div>
              </div>
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
                        <li>• Google AI/ML Fundamentals</li>
                        <li>• IBM Data Science Professional</li>
                        <li>• Microsoft Azure AI Fundamentals</li>
                        <li>• TensorFlow Developer Certificate</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Web Development
                      </h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• FreeCodeCamp Full Stack</li>
                        <li>• The Odin Project Web Dev</li>
                        <li>• Meta Front-End Developer</li>
                        <li>• React Developer Certificate</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        Data Science
                      </h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• IBM Data Science Professional</li>
                        <li>• Google Data Analytics</li>
                        <li>• Coursera ML Specialization</li>
                        <li>• Python for Data Science</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        Cloud & Tools
                      </h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• AWS Cloud Practitioner</li>
                        <li>• Google Cloud Platform</li>
                        <li>• Docker & Kubernetes</li>
                        <li>• Git & Version Control</li>
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}