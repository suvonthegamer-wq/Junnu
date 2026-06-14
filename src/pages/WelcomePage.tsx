import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { playSound, vibrate } from '../components/SoundSystem';

export default function WelcomePage({ onNext, setIsPlaying }: { onNext: () => void; setIsPlaying: (p: boolean) => void }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (holding) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            onNext();
            return 100;
          }
          return prev + 1;
        });
      }, 30);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [holding, onNext]);

  const handleStart = () => {
    setHolding(true);
    setIsPlaying(true);
    playSound('chime');
    vibrate(50);
  };

  const handleEnd = () => {
    setHolding(false);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="font-bengali text-[20vw] text-white opacity-10 select-none"
        >
          জুনিতা
        </motion.div>
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-7xl md:text-9xl text-rose-gold mb-4"
      >
        {"JUNITA".split("").map((l, i) => (
          <motion.span 
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
        className="text-xl md:text-2xl text-champagne/80 font-handwritten mb-12 italic"
      >
        This world was made just for you. 🌸
      </motion.p>

      <div className="relative">
        <motion.div
          animate={{ 
            scale: holding ? [1, 1.2, 1.1] : [1, 1.05, 1],
            boxShadow: holding ? "0 0 50px rgba(255, 205, 210, 0.6)" : "0 0 20px rgba(255, 205, 210, 0.2)"
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-soft-rose/40 to-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer select-none"
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
        >
          <div className="text-center p-4">
            <span className="text-xs uppercase tracking-[0.3em] text-white/80 block mb-1">
              {holding ? 'Opening...' : 'Hold here'}
            </span>
            <span className="text-2xl">🌸</span>
          </div>

          {/* Circular Progress */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset={300 - (300 * progress) / 100}
              className="text-rose-gold transition-all duration-100"
            />
          </svg>
        </motion.div>

        {holding && (
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-white/20 rounded-full z-10"
          />
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3 }}
        className="mt-12 text-white/30 font-light tracking-widest text-xs"
      >
        FROM SHOROB WITH LOVE 💕
      </motion.div>
    </div>
  );
}
