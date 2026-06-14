import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function ClosingPage({ onRestart }: { onRestart: () => void }) {
  const [showStar, setShowStar] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [revealComplete, setRevealComplete] = useState(false);

  const messages = [
    "Junita. 🌸",
    "You are not just someone I think about.",
    "You are someone I feel — deeply, warmly, endlessly. 💞",
    "Whenever you're sad, come here. 💕",
    "And remember: you are loved. 🌟",
    "Truly.",
    "By me.",
    "Always. 💕",
    "— Shorob 🌹"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowStar(true), 15000); // Reveal hidden star after constellations
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Shooting Star effect */}
      <div className="absolute top-1/4 left-0 w-full overflow-hidden pointer-events-none">
        <motion.div 
           initial={{ x: -100, opacity: 0 }}
           animate={{ x: '100vw', opacity: [0, 1, 0] }}
           transition={{ duration: 3, delay: 2, ease: 'linear' }}
           className="h-1 w-40 bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]"
        />
      </div>

      <div className="text-center space-y-8 max-w-2xl px-6 relative z-10">
        {messages.map((m, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 2, duration: 1.5 }}
            onAnimationComplete={() => {
              if (i === messages.length - 1) setRevealComplete(true);
            }}
            className={`font-handwritten leading-relaxed ${
              i === 0 ? 'text-6xl md:text-8xl text-soft-rose' : 
              i === messages.length - 1 ? 'text-3xl text-rose-gold mt-8' : 
              'text-2xl md:text-3xl text-white/90'
            }`}
          >
            {m}
          </motion.p>
        ))}
      </div>

      <AnimatePresence>
        {revealComplete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center mt-20 gap-12"
          >
            {/* Constellation Simulation */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <Heart className="w-48 h-48 text-soft-rose/20 fill-soft-rose/20 animate-pulse" />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                className="absolute font-bengali text-6xl text-white select-none whitespace-nowrap"
              >
                জুনিতা
              </motion.div>
            </div>

            <motion.button
              onClick={onRestart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-12 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white/60 hover:text-soft-rose transition-all uppercase tracking-[0.4em] text-xs"
            >
              🌸 Go Back to the Beginning 🌸
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Star */}
      <AnimatePresence>
        {showStar && !secretOpen && (
          <motion.button
            onClick={() => setSecretOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            whileHover={{ scale: 2, rotate: 90 }}
            className="fixed bottom-12 right-12 text-warm-gold/40 hover:text-warm-gold hover:opacity-100 transition-all z-[100]"
          >
            <Sparkles className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Secret Planet Overlay */}
      <AnimatePresence>
        {secretOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[500] bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
            onClick={() => setSecretOpen(false)}
          >
            <div className="max-w-2xl space-y-12">
              <p className="font-handwritten text-white/40 text-2xl">এই মুহূর্তটা শুধু আমাদের। 🌙</p>
              
              <div className="space-y-6">
                {"তোমাকে নিয়ে একটা ছোট্ট পৃথিবী বানাতে চাই। 🌍|যেখানে শুধু তুমি আর আমি। 💕|আমাদের হাসি। আমাদের ঝগড়া। আমাদের সব। ✨|তুমি কি আমার সেই পৃথিবীতে থাকবে? 🌸".split('|').map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 2, duration: 1.5 }}
                    className="font-bengali text-3xl md:text-4xl text-soft-rose leading-loose"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 10 }}
                className="flex flex-col items-center gap-4 text-warm-gold"
              >
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-warm-gold/20 blur-xl rounded-full animate-pulse" />
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="relative text-6xl"
                  >
                    🏠
                  </motion.div>
                </div>
                <p className="text-xs uppercase tracking-widest opacity-40">Tap anywhere to return to the stars</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
