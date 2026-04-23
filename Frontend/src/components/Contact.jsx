import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiActivity, FiShield } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const formRef = useRef();
  
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const frameCount = 160;
  const imagesRef = useRef([]);
  const seqRef = useRef({ frame: 0 });

  const currentFrame = (index) => `/image3/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

  // 1. Preload Sequence
  useEffect(() => {
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
            if (loadedCount === frameCount) setLoaded(true);
        };
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === frameCount) setLoaded(true);
        };
        imagesRef.current.push(img);
    }
  }, []);

  // 2. GSAP Scroll and Render Logic (Hero Sync)
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Responsive Canvas Size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    const render = () => {
      if (!canvas || !imagesRef.current.length) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let frameIdx = Math.round(seqRef.current.frame);
      if (frameIdx >= frameCount) frameIdx = frameCount - 1;

      const img = imagesRef.current[frameIdx];
      if (img && img.complete && img.naturalWidth !== 0) {
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
      setCurrentFrameIdx(frameIdx);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Scroll Animation - Disable pin on mobile
    const isMobile = window.innerWidth < 768;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1.2,
        pin: !isMobile, // Only pin on desktop
        anticipatePin: 1
      }
    });

    tl.to(seqRef.current, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().filter(t => t.trigger === containerRef.current).forEach(t => t.kill());
    };
  }, [loaded]);

  const sendEmail = (e) => {
    e.preventDefault();
    window.open(
      `https://wa.me/919345476559?text=Hello%20Shajan%20 R%2C%0A%0AI%20would%20like%20to%20get%20in%20touch%20regarding%20your%20services.%20Please%20find%20my%20details%20below%3A%0A%0AName%3A%20${encodeURIComponent(name)}%0AEmail%3A%20${encodeURIComponent(email)}%0AMessage%3A%20${encodeURIComponent(message)}%0A%0ALooking%20forward%20to%20your%20response.%0AThank%20you.`,
      "_blank"
    );

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div
      ref={containerRef}
      id="contact"
      className={`relative w-full ${isInputFocused ? 'min-h-screen' : 'h-screen'} bg-[#020202] overflow-hidden flex items-center justify-center font-mono select-none`}
    >
      {/* 1. Loading Module (Ultra-high Z) */}
      <AnimatePresence>
        {!loaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-[#020202]"
          >
            <div className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 animate-pulse">
              SYNCING_COMM_STREAM {loadingProgress}%
            </div>
            <div className="w-64 h-[2px] bg-cyan-950/30 overflow-hidden">
               <motion.div 
                 className="h-full bg-cyan-500" 
                 style={{ width: `${loadingProgress}%` }}
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Cinematic Canvas Layer (Z-0) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 3. Aesthetic Overlays (Z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-radial-vignette opacity-40" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {/* 4. Peripheral HUD Elements (Z-20) */}
      <AnimatePresence>
        {loaded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 pointer-events-none p-10"
          >
            {/* ...existing code... */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Central Contact UI (Z-50) */}
      <AnimatePresence>
        {loaded && currentFrameIdx >= 120 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-50 w-full max-w-4xl px-6 pointer-events-auto mt-0 md:mt-36"
          >
            <div className="text-center mb-8">
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                CONTACT
              </h2>
              <div className="flex items-center justify-center space-x-2 text-cyan-500/60 font-mono text-[9px] tracking-[0.6em] uppercase">
                <FiShield />
                <span>Whatsapp</span>
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 md:p-14 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 md:space-y-10 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div className="space-y-3">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-cyan-500/50 block ml-1"><FiUser /> NAME</label>
                  <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder="ENTER NAME"
                    required
                    className="w-full bg-white/5 border-b border-white/10 py-3 md:py-4 px-5 text-white text-[11px] outline-none focus:border-cyan-600 transition-all placeholder:text-cyan-950/20 touch-manipulation"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-cyan-500/50 block ml-1"><FiMail /> EMAIL</label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder="ENTER EMAIL"
                    required
                    className="w-full bg-white/5 border-b border-white/10 py-3 md:py-4 px-5 text-white text-[11px] outline-none focus:border-cyan-600 transition-all placeholder:text-cyan-950/20 touch-manipulation"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-cyan-500/50 block ml-1"><FiMessageSquare /> DESCRIPTION</label>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="ENTER MESSAGE"
                  required
                  className="w-full bg-white/5 border-b border-white/10 py-3 md:py-4 px-5 text-white text-[11px] outline-none focus:border-cyan-600 transition-all min-h-[100px] md:min-h-[140px] resize-none placeholder:text-cyan-950/20 touch-manipulation"
                />
              </div>

              <div className="flex justify-center md:justify-end">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(6, 182, 212, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="group flex items-center space-x-6 bg-cyan-600 text-black font-black text-[11px] uppercase tracking-[0.6em] px-8 md:px-24 py-4 md:py-6 shadow-2xl transition-all"
                >
                  <span>CONTACT</span>
                  <FiSend className="text-lg transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer
        position="bottom-right"
        toastClassName="bg-black border border-cyan-500/30 text-white font-mono text-[9px] rounded-none backdrop-blur-xl"
        progressClassName="bg-cyan-600"
      />
    </div>
  );
};

export default Contact;