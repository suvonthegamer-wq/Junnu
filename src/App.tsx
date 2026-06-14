import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ParticleBackground from './components/ParticleBackground';
import CursorTrail from './components/CursorTrail';
import SoundSystem from './components/SoundSystem';
import { Heart } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Pages
import WelcomePage from './pages/WelcomePage';
import UniversePage from './pages/UniversePage';
import QuestPage from './pages/QuestPage';
import LetterPage from './pages/LetterPage';
import ClosingPage from './pages/ClosingPage';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isComfortMode, setIsComfortMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [atmosphere, setAtmosphere] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('night');
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  // Time-based atmosphere
  useEffect(() => {
    const updateAtmosphere = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 11) setAtmosphere('morning');
      else if (hour >= 11 && hour < 17) setAtmosphere('afternoon');
      else if (hour >= 17 && hour < 21) setAtmosphere('evening');
      else setAtmosphere('night');
    };
    updateAtmosphere();
    const interval = setInterval(updateAtmosphere, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Return greeting
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setShowWelcomeBack(true);
        setTimeout(() => setShowWelcomeBack(false), 4000);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const atmosphereStyles = useMemo(() => {
    switch (atmosphere) {
      case 'morning': return 'bg-gradient-to-br from-orange-200/20 via-warm-gold/20 to-champagne/10';
      case 'afternoon': return 'bg-gradient-to-br from-blue-200/20 via-sky-100/20 to-white/10';
      case 'evening': return 'bg-gradient-to-br from-rose-gold/20 via-blush-pink/20 to-midnight/10';
      case 'night': return 'bg-gradient-to-br from-indigo-950/40 via-midnight to-black/20';
      default: return '';
    }
  }, [atmosphere]);

  return (
    <ParticlesProvider init={async (engine) => await loadSlim(engine)}>
      <div className={cn("relative min-h-screen transition-colors duration-2000 overflow-hidden", atmosphereStyles)}>
      <ParticleBackground />
      <CursorTrail />
      <SoundSystem isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      {/* Global Comfort Mode Heart */}
      <button 
        onClick={() => setIsComfortMode(!isComfortMode)}
        className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 hover:bg-rose-500/20 transition-all duration-500 group"
      >
        <Heart className={cn("w-6 h-6 transition-all duration-500", isComfortMode ? "fill-rose-500 text-rose-500 scale-125" : "text-white/40 group-hover:text-soft-rose")} />
      </button>

      {/* Comfort Mode Overlay */}
      <AnimatePresence>
        {isComfortMode && (
          <ComfortOverlay onClose={() => setIsComfortMode(false)} />
        )}
      </AnimatePresence>

      {/* Welcome Back Notification */}
      <AnimatePresence>
        {showWelcomeBack && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-[150] px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl"
          >
            <p className="text-soft-rose font-handwritten text-xl">Welcome back, Junita. 💕 Your world missed you. ✨</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bengali Whispers */}
      <WhisperSystem />

      {/* Rare Butterfly Blessing */}
      <ButterflyEvent />

      {/* Main Pages */}
      <main className="relative z-10 w-full h-full min-h-screen">
        <AnimatePresence mode="wait">
          <PageTransition transitionKey={currentPage}>
            {currentPage === 0 && <WelcomePage onNext={() => setCurrentPage(1)} setIsPlaying={setIsPlaying} />}
            {currentPage === 1 && <UniversePage onNext={() => setCurrentPage(2)} />}
            {currentPage === 2 && <QuestPage onNext={() => setCurrentPage(3)} />}
            {currentPage === 3 && <LetterPage onNext={() => setCurrentPage(4)} />}
            {currentPage === 4 && <ClosingPage onRestart={() => setCurrentPage(0)} />}
          </PageTransition>
        </AnimatePresence>
      </main>
      </div>
    </ParticlesProvider>
  );
}

function PageTransition({ children, transitionKey }: { children: React.ReactNode; transitionKey: any }) {
  const transitions = [
    { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.1 } }, // Bloom
    { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '-100%' } }, // Petal sweep feel
    { initial: { opacity: 0, filter: 'blur(20px)' }, animate: { opacity: 1, filter: 'blur(0px)' }, exit: { opacity: 0, filter: 'blur(20px)' } }, // Dreamy
  ];
  const t = transitions[0]; 

  return (
    <motion.div
      key={transitionKey}
      initial={t.initial}
      animate={t.animate}
      exit={t.exit}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      className="w-full h-full min-h-screen flex items-center justify-center px-6"
    >
      {children}
    </motion.div>
  );
}

function ComfortOverlay({ onClose }: { onClose: () => void }) {
  const affirmations = [
    "You are safe here. 💕",
    "You are so deeply loved. 🌹",
    "It's okay to rest. You are enough. 🌙",
    "This world was made just for you. ✨",
    "You are never alone. 💗",
    "তুমি আমার সব কিছু। 💕",
    "তুমি না থাকলে দিন কাটে না। ✨",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const itv = setInterval(() => setIndex(prev => (prev + 1) % affirmations.length), 5000);
    return () => clearInterval(itv);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-orange-950/20 backdrop-blur-[30px] flex items-center justify-center p-12 text-center"
      onClick={onClose}
    >
      <div className="max-w-xl flex flex-col items-center gap-8">
        <Heart className="w-16 h-16 text-rose-400 fill-rose-400 animate-pulse" />
        <AnimatePresence mode="wait">
          <motion.p 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-4xl md:text-5xl font-heading text-white drop-shadow-lg leading-relaxed px-4 h-32 flex items-center justify-center"
          >
            {affirmations[index]}
          </motion.p>
        </AnimatePresence>
        <p className="text-white/60 font-body tracking-[0.2em] text-sm uppercase">Tap anywhere to return softly 🌸</p>
      </div>
    </motion.div>
  );
}

function WhisperSystem() {
  const whispers = [
    "তুমি আমার সব কিছু 💕",
    "তোমার হাসিতে আমি হারিয়ে যাই ✨",
    "তুমি এত সুন্দর কেন? 🌸",
    "তোমাকে দেখলেই বুকটা ধুক ধুক করে 💓",
    "তুমি আমার একমাত্র দুর্বলতা 💗",
    "তোমার চোখে ডুবে যেতে চাই 💫",
    "তুমি না থাকলে দিন কাটে না 🌙",
    "তুমি আমার বুকের ভেতর থাকো 💞",
  ];

  const [activeWhispers, setActiveWhispers] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  useEffect(() => {
    const spawnWhisper = () => {
      if (Math.random() > 0.7) {
        const id = Date.now();
        const text = whispers[Math.floor(Math.random() * whispers.length)];
        const x = Math.random() * 80 + 10; // 10-90%
        const y = Math.random() * 80 + 10;
        setActiveWhispers(prev => [...prev, { id, text, x, y }]);
        setTimeout(() => setActiveWhispers(prev => prev.filter(w => w.id !== id)), 8000);
      }
    };
    const itv = setInterval(spawnWhisper, 10000);
    return () => clearInterval(itv);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <AnimatePresence>
        {activeWhispers.map(w => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute font-bengali text-white text-2xl"
            style={{ left: `${w.x}%`, top: `${w.y}%` }}
          >
            {w.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ButterflyEvent() {
  const [butterfly, setButterfly] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const spawn = () => {
      if (Math.random() > 0.8) {
        setButterfly({ x: -100, y: Math.random() * 80 + 10 });
      }
    };
    const itv = setInterval(spawn, 120000); // Every 2-3 mins 
    return () => clearInterval(itv);
  }, []);

  if (!butterfly) return null;

  return (
    <motion.div 
      initial={{ left: -100, top: `${butterfly.y}%` }}
      animate={{ left: '110%' }}
      transition={{ duration: 15, ease: "linear" }}
      onAnimationComplete={() => setButterfly(null)}
      className="fixed z-[90] cursor-pointer"
      onClick={() => {
        // Sparkle burst logic here
        setButterfly(null);
      }}
    >
      <div className="text-4xl">🦋</div>
      <motion.div 
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 bg-warm-gold/30 blur-xl rounded-full"
      />
    </motion.div>
  );
}
