import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoShowcase from './VideoShowcase';
import { CiInstagram } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { FaBehance } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import pdfcv from '../assets/rajanmishracv.pdf';
import CvPdfViewer from './CvPdfViewer';


const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Skills data
  const skills = [
    { name: 'Adobe Premiere Pro', level: 95, icon: '🎬' },
    { name: 'DaVinci Resolve', level: 90, icon: '🎨' },
    { name: 'Adobe After Effects', level: 88, icon: '✨' },
    { name: 'Motion Graphics', level: 85, icon: '🔄' },
    { name: 'Color Grading', level: 90, icon: '🌈' },
    { name: 'Visual Effects (VFX)', level: 82, icon: '🔥' },
    { name: 'Audio Editing', level: 80, icon: '🎵' },
    { name: 'AI Video Tools', level: 75, icon: '🤖' }
  ];

  // Projects data
  const projects = [
    {
      title: 'Corporate Law Mastery Programme',
      description: 'End-to-end production of 27+ courses with 1,000+ video outputs',
      collaborators: 'CII, Bennett University, NALSAR University',
      category: 'educational',
      utl: 'https://ebclearning.com/programs/corporate-law-diploma/about'
    },
    {
      title: 'Advocate-on-Record Examination',
      description: 'High-quality graphics and course materials for AoR live classes',
      collaborators: 'Dr Charu Mathur',
      category: 'educational',
      utl: 'https://ebclearning.com/courses/aor-exam-course/'
    },
    {
      title: 'Advanced Diploma in Aviation Law',
      description: 'Managed live classes and technical solutions for enhanced engagement',
      collaborators: 'Grayspace Law and Policy Consulting',
      category: 'educational',
      utl: 'https://ebclearning.com/programs/aviation-law-advanced-diploma-online-programme/about'
    },
    {
      title: 'Interview & Talk Shows',
      description: 'Planned, managed and executed professional interviews and talk shows',
      collaborators: '',
      category: 'entertainment',
      utl: 'https://ebclearning.com/courses/ram-jethmalani-law-resilience-justice-online-talk/'
    },
    
  ];

    const form = useRef();
  const [formData, setFormData] = useState({
    from_name: "",
    email: "",
    message: "",
  });

  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

// submit handler
const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
        "service_u9hkd7q",   // from EmailJS
        "template_u91pk9k",  // from EmailJS
        form.current,
        "7MeEUX8_0wQOpJx-h"    // from EmailJS
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          setFormData({ from_name: "", email: "", message: "" });
          // e.target.reset(); // clear form
        },
        (error) => {
          console.error(error);
          alert("❌ Failed to send message. Try again.");
        }
      );


    }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 px-4 md:px-8 ${isScrolled ? 'py-3 bg-gray-900/90 backdrop-blur-md shadow-lg' : 'py-5'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-red-500">Rajan</span>Mishra
            <span className="ml-2 text-red-500 text-xl">🎬</span>
          </motion.div>
          
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {['home', 'work', 'about', 'skills', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`relative group px-2 py-1 ${activeTab === item ? 'text-red-500' : 'text-white'}`}
                onClick={() => setActiveTab(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          
          <button 
            className="md:hidden flex flex-col space-y-1.5 z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-0 left-0 w-full h-screen bg-gray-900/95 backdrop-blur-md pt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col space-y-8 items-center justify-center h-full">
                {['home', 'work', 'about', 'skills', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className={`text-2xl font-medium ${activeTab === item ? 'text-red-500' : 'text-white'}`}
                    onClick={() => {
                      setActiveTab(item);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20 px-4 md:px-8">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 py-16 md:py-24">
          <motion.div
            className="max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h6 className="text-red-500 text-lg md:text-xl mb-4 md:mb-6 flex items-center" variants={itemVariants}>
              <span className="mr-2">🎬</span> Senior Video Editor & Producer
            </motion.h6>
            <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight" variants={itemVariants}>
              Creating <span className="text-red-500">Visual Stories</span> That Captivate & Engage
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-3xl" variants={itemVariants}>
              9+ years of expertise in end-to-end video production, editing, and motion graphics. 
              Transforming concepts into compelling visual narratives that resonate with audiences.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" variants={itemVariants}>
              <button 
                className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-md font-medium transition-colors flex items-center justify-center"
                onClick={() => setActiveTab('work')}
              >
                <span className="mr-2">🎥</span> View My Work
              </button>
              <button 
                className="px-6 py-3 border border-gray-600 hover:border-red-500 rounded-md font-medium transition-colors flex items-center justify-center"
                onClick={() => setActiveTab('contact')}
              >
                <span className="mr-2">📞</span> Get In Touch
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 z-10">
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-px h-10 bg-gray-400 relative">
            <div className="absolute top-0 left-0 w-full h-5 bg-red-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

<section>
    <VideoShowcase />
</section>

      {/* Work/Projects Section */}
      <section id="work" className="py-16 md:py-24 px-4 md:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Featured <span className="text-red-500">Projects</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:border-red-500 transition-colors"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-500 opacity-80"></div>
                  <div className="absolute bottom-4 left-4 text-5xl opacity-30">
                    {index % 3 === 0 ? '🎓' : index % 3 === 1 ? '🎬' : '📊'}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="px-4 py-2 bg-red-500 rounded-md font-medium flex items-center" onClick={() => window.open(project.utl || '', '_blank')}>
                      <span className="mr-2">👁️</span> View Project
                    </button>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  {project.collaborators && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Collaborators:</span> {project.collaborators}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <motion.div 
              className="lg:w-2/3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">About <span className="text-red-500">Me</span></h2>
              <p className="text-lg text-gray-300 mb-6">
                Creative and detail-oriented video specialist with end-to-end expertise in digital content creation. 
                With over 9 years of experience, I specialize in pre-production planning, on-set coordination, shooting, 
                and advanced post-production techniques that ensure impactful visual storytelling.
              </p>
              <p className="text-lg text-gray-300 mb-10">
                My proven ability to collaborate with cross-functional teams has resulted in compelling content for 
                marketing, branding, and educational purposes. I'm expert in motion graphics, color grading, 
                audio mixing, and visual effects, and adept at managing multiple projects under tight deadlines 
                while maintaining high production quality.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="block text-3xl md:text-4xl font-bold text-red-500">9+</span>
                  <span className="text-gray-400">Years Experience</span>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="block text-3xl md:text-4xl font-bold text-red-500">1000+</span>
                  <span className="text-gray-400">Videos Produced</span>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="block text-3xl md:text-4xl font-bold text-red-500">27+</span>
                  <span className="text-gray-400">Courses Managed</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/3 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-purple-600 to-red-500 rounded-full flex items-center justify-center text-9xl">
                  🎬
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                  <div className="text-center">
                    <div className="text-red-500 font-bold">Rajan Mishra</div>
                    <div className="text-sm text-gray-400">Senior Video Editor</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 px-4 md:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Technical <span className="text-red-500">Expertise</span>
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <div className="lg:w-2/3 space-y-6 md:space-y-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 p-4 md:p-5 rounded-xl border border-gray-700"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{skill.icon}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-red-500 font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="lg:w-1/3 flex justify-center items-start"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 w-full">
                <h3 className="text-xl font-bold mb-4 text-center">Software Proficiency</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Illustrator', 'Audition'].map((software, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-700/30 p-3 rounded-lg text-center border border-gray-600"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-lg font-medium">{software}</div>
                      <div className="text-red-500 text-sm font-bold">Expert</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    
      <section className="min-h-screen bg-[#1b1936] p-6">
        <CvPdfViewer src={pdfcv} height='65vh' />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Get In <span className="text-red-500">Touch</span>
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold mb-6">Let's create something amazing together</h3>
              <p className="text-gray-400 mb-10 text-lg">
                I'm always interested in new challenges and opportunities to bring 
                creative visions to life through video.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                  <div className="bg-red-500 p-3 rounded-md mr-4">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-sm">Email</span>
                    <a href="mailto:mishrarajan542@gmail.com" className="text-lg hover:text-red-500 transition-colors">mishrarajan542@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                  <div className="bg-red-500 p-3 rounded-md mr-4">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-sm">Phone</span>
                    <a href="tel:+919140260273" className="text-lg hover:text-red-500 transition-colors">+91 9140260273</a>
                  </div>
                </div>
                
                <div className="flex items-start bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                  <div className="bg-red-500 p-3 rounded-md mr-4">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-sm">Location</span>
                    <span className="text-lg">Greater Noida, India</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-10">
                <a href="https://www.facebook.com/rajan.mishra.77282" target="_blank" className="px-4 py-2 border border-gray-600 hover:border-red-500 rounded-md transition-colors flex items-center">
                  <span className="mr-2 border-1 rounded-full p-1"><FaFacebook /></span> Facebook
                </a>
                <a href="https://www.behance.net/rajanmishra" target='_blank' className="px-4 py-2 border border-gray-600 hover:border-red-500 rounded-md transition-colors flex items-center">
                  <span className="mr-2 border-1 rounded-full p-1"><FaBehance /></span> Behance
                </a>
                <a href="https://www.linkedin.com/in/rajan-mishra1511/" target='_blank' className="px-4 py-2 border border-gray-600 hover:border-red-500 rounded-md transition-colors flex items-center">
                  <span className="mr-2 border-1 rounded-full p-1"><FaLinkedin /></span> LinkedIn
                </a>
                <a href="https://www.instagram.com/rajanmishragamer/" target="_blank" className="px-4 py-2 border border-gray-600 hover:border-red-500 rounded-md transition-colors flex items-center">
                  <span className="mr-2 border-1 rounded-full p-1"><CiInstagram /></span> Instagram
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-gray-400 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-gray-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
                      required
                      name="from_name"
                value={formData.from_name}
                onChange={changeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-400 mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-gray-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
                      required
                      name='email'
                      value={formData.email}
                onChange={changeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-400 mb-2">Your Message</label>
                    <textarea 
                      id="message"
                      placeholder="How can I help you?"
                      rows="5"
                      name="message"
                      className="w-full px-4 py-3 bg-gray-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
                      required  value={formData.message}
                onChange={changeHandler}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" onClick={handleSubmit}
                    className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 rounded-md font-medium transition-colors flex items-center justify-center"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-4 md:px-8 bg-gray-900/80">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4 flex items-center justify-center">
            <span className="text-red-500">Rajan</span>Mishra
            <span className="ml-2 text-red-500">🎬</span>
          </div>
          <p className="text-gray-400 mb-6">Senior Video Editor & Producer</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6">
            <a href="#home" className="text-gray-400 hover:text-red-500 transition-colors">Home</a>
            <a href="#work" className="text-gray-400 hover:text-red-500 transition-colors">Work</a>
            <a href="#about" className="text-gray-400 hover:text-red-500 transition-colors">About</a>
            <a href="#skills" className="text-gray-400 hover:text-red-500 transition-colors">Skills</a>
            <a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors">Contact</a>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Rajan Mishra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;