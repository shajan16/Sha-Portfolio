import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);

//   const textContainerRef = useRef(null);
//   const roleWrapperRef = useRef(null);
//   const subtitleWrapperRef = useRef(null);
//   const highlightWrapperRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    const bootTl = gsap.timeline({ delay: 0.5 });

    bootTl.fromTo('.noise-overlay', { opacity: 0 }, { opacity: 0.15, duration: 1 }, 0);
    bootTl.fromTo('.center-glow', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5 }, 0.2);

    bootTl.fromTo('nav',
      { y: -50, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0)', duration: 1 },
      0.5
    );

    bootTl.to('.hud-element', {
      opacity: 1,
      duration: 0.1,
      stagger: 0.1,
    }, 1);

  }, []);

  useEffect(() => {
    const tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500",
        scrub: 0.5,
        pin: true,
      }
    });

    tlScroll.fromTo('.portfolio-ui',
      { opacity: 1, filter: "blur(0px)" },
      { opacity: 0, filter: "blur(6px)", duration: 1 },
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-sans tracking-wide"
    >
      {/* Background Grid */}
      <div className="portfolio-ui absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Noise */}
      <div className="portfolio-ui noise-overlay absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
        }}
      />

      {/* Glow */}
      <div className="portfolio-ui center-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none opacity-0 mix-blend-screen z-[1]" />

      {/* HUD */}
      <div className="portfolio-ui absolute top-28 left-8 z-[60] font-mono text-[10px] text-blue-400 tracking-widest flex flex-col space-y-1.5 pointer-events-none">
        <span className="hud-element opacity-0">&gt; SYSTEM ONLINE</span>
        <span className="hud-element opacity-0">&gt; INITIALIZING PORTFOLIO v2.0</span>
      </div>

      {/* Text Content */}
      <AnimatePresence>
        {loaded && (
          <div className="portfolio-ui absolute inset-0 z-[50] flex flex-col items-center justify-center text-center px-8">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-7xl font-bold text-white tracking-[0.1em] uppercase"
            >
              SHAJAN
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mt-6 text-sm font-mono tracking-[0.3em] text-gray-400 uppercase"
            >
              Full Stack Developer
            </motion.h2>

            <div className="mt-4 text-xl">
          <span className="text-blue-400">I BUILD: </span> <br />
          <TypeAnimation
            sequence={[
              "Web Applications",
              2000,
              "MERN Stack Projects",
              2000,
              "Creative Interfaces",
              2000,
              "Responsive Designs",
              2000,
              "Modern Technologies",
              2000,
            ]}
            repeat={Infinity}
            speed={50}
          />
        </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-8 max-w-xl text-gray-500"
            >
              Crafting modern, scalable and high-performance web applications with precision engineering and seamless user experience.
            </motion.p>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}