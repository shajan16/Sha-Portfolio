import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import twitt from "../assets/sha/file_00000000e09471fab15bfa073f0c5bd5.png";
import TD from "../assets/sha/18e6c55b-9c59-4e1c-ada6-59ff2acad1bb.png";
import ecom from "../assets/sha/Screenshot 2026-04-07 at 12.54.35 PM.png";

const projectData = [
  {
    image: twitt,
    title: "Twitter Clone",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "https://twitter-3hwv.onrender.com/",
  },
  {
    image: TD,
    title: "Truth or Dare Game",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "https://truth-or-dare-nypt.onrender.com/",
  },
  {
    image: ecom,
    title: "Custom Website",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "https://www.strikextechin.site",
  },
];

let github = () => {
  alert("Github repository is private for now. If you want to see the code, please contact me directly.");
  window.location.href = "#contact";
};

const Portfolio = () => {
  return (
    <section id="projects" className="bg-[#020202] w-[95%] md:w-full py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-blue-500 font-mono tracking-[0.4em] uppercase text-[10px] mb-4"
        >
          Project Showcase
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter"
        >
          Selected Works<span className="text-blue-500">.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projectData.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/10"
          >
            <div className="relative overflow-hidden aspect-[4/3] rounded-[1.5rem] m-2">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[9px] uppercase tracking-widest font-mono px-3 py-1 bg-white/10 text-blue-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a onClick={github} target="_blank" rel="noopener noreferrer" aria-label="Github Repository" className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all border border-white/10">
                  <FiGithub size={20} />
                </a>
                <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="p-3 bg-white/5 text-white rounded-xl hover:bg-blue-600 transition-all border border-white/10">
                  <FiExternalLink size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
