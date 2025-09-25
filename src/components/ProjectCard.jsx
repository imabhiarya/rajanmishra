import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      whileHover={{ y: -5 }} // lifts card on hover
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Video Thumbnail (plays on hover) */}
      <video 
        className="w-full h-auto object-cover"
        muted 
        playsInline 
        loop 
        poster={project.posterImage}
        // Play on hover, pause on leave
        onMouseOver={e => e.target.play()}
        onMouseOut={e => { e.target.currentTime = 0; e.target.pause();}}
      >
        <source src={project.thumbnailLoop} type="video/mp4" />
      </video>
      
      {/* Overlay that appears on hover */}
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
      >
        <h3 className="text-white text-xl font-bold">{project.title}</h3>
        <p className="text-gray-300">{project.category}</p>
      </motion.div>
    </motion.div>
  );
};
export default ProjectCard;