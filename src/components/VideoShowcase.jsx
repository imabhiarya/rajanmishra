import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import reelvideo from '../assets/reel2.mp4';
import reelThumb from '../assets/gsb_and_sanjay.jpg';

const VideoShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);

  // Sample video data - replace with your actual videos
  const videoProjects = [
    {
      id: 1,
      title: 'Corporate Law Mastery Programme',
      description: 'End-to-end production of 27+ courses with 1,000+ video outputs',
      category: 'educational',
      thumbnail: 'https://img.youtube.com/vi/k91FMINbTJQ/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/k91FMINbTJQ',
      duration: '3:23',
      techniques: ['Shooting','Color Grading', 'Motion Graphics', 'Multi-cam Editing']
    },
    {
      id: 2,
      title: 'Directions and Video Shoot',
      description: 'Product launch campaign with dynamic editing and effects',
      category: 'ad-shoot',
      thumbnail: 'https://img.youtube.com/vi/5A2b9u3MpL4/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/5A2b9u3MpL4',
      duration: '1:30',
      techniques: ['Visual Effects', 'Sound Design', 'Color Correction']
    },
    // {
    //   id: 3,
    //   title: 'Documentary Series',
    //   description: 'Long-form storytelling with cinematic visuals',
    //   category: 'documentary',
    //   thumbnail: 'https://placehold.co/800x450/0ea5e9/white?text=Documentary',
    //   videoUrl: 'https://player.vimeo.com/video/370756693',
    //   duration: '15:20',
    //   techniques: ['Cinematic Color', 'Audio Mixing', 'Narrative Editing']
    // },
    {
      id: 4,
      title: 'Music Video',
      description: 'High-energy editing synchronized to music',
      category: 'music',
      thumbnail: 'https://img.youtube.com/vi/KUQwl7WXT28/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/KUQwl7WXT28',
      duration: '3:50',
      techniques: ['Rhythmic Editing', 'Visual Effects', 'Color Grading']
    },
    {
      id: 5,
      title: 'Social Media Campaign',
      description: 'Short-form content optimized for social platforms',
      category: 'reels',
      thumbnail: `${reelThumb}`,
      videoUrl: `${reelvideo}`,
      duration: '0:45',
      techniques: ['Fast-paced Editing', 'Motion Graphics', 'Square Format']
    },
    {
      id: 6,
      title: 'Podcast / Talks',
      description: 'Multi-camera professional interviews',
      category: 'talks',
      thumbnail: 'https://img.youtube.com/vi/1tc4ZMUzQrc/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/1tc4ZMUzQrc',
      duration: '18:07',
      techniques: ['Multi-cam Editing', 'Color Matching', 'Audio Enhancement']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'educational', name: 'Educational' },
    { id: 'ad-shoot', name: 'Ad Shoot' },
    { id: 'reels', name: 'Reels' },
    { id: 'music', name: 'Music' },
    { id: 'talks', name: 'Talks' }
  ];



  const filteredVideos = activeCategory === 'all' 
    ? videoProjects 
    : videoProjects.filter(video => video.category === activeCategory);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) closeVideoModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <section id="showcase" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Video <span className="text-red-500">Showcase</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            A curated selection of my best work demonstrating expertise in editing, motion graphics, and visual storytelling
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-all ${activeCategory === category.id 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-red-500 transition-colors"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div 
                className="relative overflow-hidden cursor-pointer"
                onClick={() => openVideoModal(video)}
              >
                <div className="aspect-video bg-gray-700 relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  {/* <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all"></div> */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-gray-400 text-sm md:text-base mb-3">{video.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {video.techniques.map((tech, i) => (
                    <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {isModalOpen && selectedVideo && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideoModal}
            >
              <motion.div
                className="bg-gray-900 rounded-xl overflow-hidden w-full max-w-4xl relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeVideoModal}
                  className="absolute -top-12 right-0 text-white text-3xl z-10 hover:text-red-500 transition-colors"
                >
                  &times;
                </button>
                
                <div className="aspect-video bg-black">
                  <iframe
                    src={selectedVideo.videoUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    ref={videoRef}
                    title={selectedVideo.title}
                  ></iframe>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-300 mb-4">{selectedVideo.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.techniques.map((tech, i) => (
                      <span key={i} className="text-sm bg-red-500 text-white px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Want to see more of my work?</h3>
          <a 
            href="#contact" 
            className="inline-block px-8 py-3 bg-red-500 hover:bg-red-600 rounded-md font-medium transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;




