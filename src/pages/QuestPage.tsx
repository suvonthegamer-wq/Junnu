import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSound, vibrate } from '../components/SoundSystem';

export default function QuestPage({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setProgress(((step - 1) / 4) * 100);
  }, [step]);

  const handleQuestComplete = () => {
    if (step < 4) {
      setStep(step + 1);
      playSound('sparkle');
    } else {
      setComplete(true);
      playSound('chime');
      vibrate([100, 50, 100]);
      setTimeout(onNext, 5000);
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!complete ? (
          <motion.div 
            key="quest"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full flex flex-col items-center"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-soft-rose mb-4 font-heading">Junita's Magical Quest 🌸✨</h2>
              <p className="text-champagne/60 font-body">Complete all 4 parts to unlock something beautiful for you... 💕</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-white/10 rounded-full mb-16 overflow-hidden relative">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="absolute inset-0 bg-gradient-to-r from-soft-rose to-warm-gold shadow-[0_0_15px_rgba(255,205,210,0.5)]"
              />
            </div>

            <div className="w-full min-h-[400px] flex items-center justify-center p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 relative overflow-hidden">
              {step === 1 && <QuestOne onComplete={handleQuestComplete} />}
              {step === 2 && <QuestTwo onComplete={handleQuestComplete} />}
              {step === 3 && <QuestThree onComplete={handleQuestComplete} />}
              {step === 4 && <QuestFour onComplete={handleQuestComplete} />}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center px-6"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl mb-8"
            >
              🎊
            </motion.div>
            <h3 className="text-4xl md:text-6xl text-warm-gold font-heading mb-6">You did it, Junita! 💫✨</h3>
            <p className="text-2xl text-white/80 font-handwritten leading-relaxed">
              You always find a way to make everything magical. <br/> Just like you do in real life. 🌸💕
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuestOne({ onComplete }: { onComplete: () => void }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    setPos({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
  }, []);

  return (
    <div className="w-full h-full text-center">
      <p className="text-xl text-white/70 mb-4 italic">Find the Hidden Heart 💕</p>
      <motion.button
        onClick={onComplete}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.5 }}
        style={{ position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%` }}
        className="w-10 h-10 flex items-center justify-center bg-rose-400/20 rounded-full text-rose-400 blur-[2px] hover:blur-0 transition-all shadow-[0_0_20px_rgba(251,113,133,0.4)]"
      >
        <Heart className="fill-current w-6 h-6" />
      </motion.button>
    </div>
  );
}

function QuestTwo({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [
    { id: 'yellow', color: 'bg-yellow-200', text: "Even on bright days, you shine brighter than the sun. ☀️", label: '🌻' },
    { id: 'pink', color: 'bg-rose-200', text: "Soft and sweet — just like you, Junita. 💕", label: '🌸' },
    { id: 'blue', color: 'bg-blue-200', text: "It's okay to feel blue. But know that even then, you are so loved. 💙", label: '💙' },
    { id: 'purple', color: 'bg-purple-200', text: "You have always been magical. This color knows it too. ✨", label: '💜' },
  ];

  return (
    <div className="w-full text-center flex flex-col items-center gap-8">
      <p className="text-xl text-white/70 mb-4 italic">What color is your happiness today? 🌈</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => {
              setSelected(opt.id);
              setTimeout(onComplete, 3000);
            }}
            whileHover={{ y: -5, scale: 1.1 }}
            className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${opt.color} text-3xl shadow-xl flex items-center justify-center border-4 border-white/30`}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-handwritten text-warm-gold transition-all"
          >
            {options.find(o => o.id === selected)?.text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuestThree({ onComplete }: { onComplete: () => void }) {
  const [stars, setStars] = useState([
    { id: 1, x: 20, y: 30, placed: false },
    { id: 2, x: 80, y: 20, placed: false },
    { id: 3, x: 10, y: 70, placed: false },
    { id: 4, x: 90, y: 80, placed: false },
    { id: 5, x: 50, y: 50, placed: false },
  ]);

  const targetPoints = [
    { x: 50, y: 30 }, { x: 30, y: 50 }, { x: 50, y: 70 }, { x: 70, y: 50 }, { x: 50, y: 50 }
  ];

  const handleStarClick = (id: number) => {
    setStars(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, placed: true } : s);
      if (updated.every(s => s.placed)) {
        setTimeout(onComplete, 1000);
      }
      return updated;
    });
    playSound('sparkle');
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center">
      <p className="text-xl text-white/70 mb-12 italic">Arrange the Stars ⭐ (Tap them into place)</p>
      
      <div className="relative w-64 h-64 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center">
        <Heart className="w-48 h-48 text-white/5" />
        
        {stars.map((star, i) => (
          <motion.button
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            animate={{ 
              left: star.placed ? `${targetPoints[i].x}%` : `${star.x}%`,
              top: star.placed ? `${targetPoints[i].y}%` : `${star.y}%`,
              scale: star.placed ? [1, 1.5, 1.2] : 1,
              opacity: 1
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 ${star.placed ? 'text-warm-gold' : 'text-white/40'}`}
          >
            <Sparkles className="w-8 h-8" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function QuestFour({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl text-white/70 mb-12 italic">Click Shorob's Heart 💖</p>
      <motion.button
        onClick={() => {
          vibrate([200, 100, 200]);
          onComplete();
        }}
        whileHover={{ scale: 1.1 }}
        animate={{ 
          scale: [1, 1.1, 1],
          boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 60px rgba(251,113,133,0.5)", "0 0 0px rgba(0,0,0,0)"]
        }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-48 h-48 rounded-full bg-gradient-to-br from-rose-500 to-rose-400 flex flex-col items-center justify-center shadow-2xl relative"
      >
        <Heart className="w-20 h-20 text-white mb-2" />
        <span className="text-white font-bold tracking-widest text-sm uppercase">SHOROB</span>
        
        {/* Animated aura */}
        <div className="absolute inset-0 rounded-full animate-ping bg-rose-400 opacity-20 pointer-events-none" />
      </motion.button>
    </div>
  );
}
