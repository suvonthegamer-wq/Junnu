import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { playSound, vibrate } from '../components/SoundSystem';
import { Flower, X } from 'lucide-react';

export default function LetterPage({ onNext }: { onNext: () => void }) {
  const [sealed, setSealed] = useState(false);
  const [gardenOpen, setGardenOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSeal = () => {
    setSealed(true);
    playSound('thud');
    vibrate(100);
  };

  const affirmations = [
    "You make ordinary days feel special. ✨",
    "You deserve kindness, happiness, and every beautiful thing. 💝",
    "You are loved more than you know. 🌹",
    "You are enough, exactly as you are. 💗",
    "Your heart is one of the most beautiful things about you. 🌸"
  ];

  const [gardenAff, setGardenAff] = useState(affirmations[0]);

  const nextGardenAff = () => {
    setGardenAff(affirmations[Math.floor(Math.random() * affirmations.length)]);
    playSound('sparkle');
  };

  return (
    <div className="w-full max-w-3xl py-20 bg-warm-cream/95 text-gray-800 rounded-lg shadow-2xl overflow-y-auto max-h-[80vh] scroll-smooth p-8 md:p-16 relative border-[12px] border-double border-rose-gold/20">
      
      {/* English Letter */}
      <div className="font-handwritten text-2xl md:text-3xl leading-relaxed space-y-8 mb-16">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>Dear Junita, 🌸</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}>Every time I see your name, I smile without even trying. 😊</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} viewport={{ once: true }}>You have this way of making ordinary moments feel like the most important ones. ✨</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} viewport={{ once: true }}>I notice everything about you. The way you laugh 😄. The way you care 💕. The way you just... exist so beautifully 🌸.</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }} viewport={{ once: true }}>You don't always see what I see. But I see it. Every single day. 👀💗</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 2.5 }} viewport={{ once: true }}>You are not just someone I think about — you are someone I feel. 💞</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 3 }} viewport={{ once: true }}>I am so grateful you are in my life. Truly. 🙏💕</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 3.5 }} viewport={{ once: true }}>Whenever you feel low — come back here. Read this again. Because this doesn't change. 🌟</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 4 }} viewport={{ once: true }}>You are loved. By me. Completely. 💝</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 4.5 }} className="text-right" viewport={{ once: true }}>— Shorob 💕</motion.p>
      </div>

      <hr className="border-rose-gold/20 my-12" />

      {/* Bengali Letter */}
      <div className="font-bengali text-2xl text-rose-gold/90 leading-loose space-y-6 text-right pb-20">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }}>জুনিতা, 🌸</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}>তোমার কথা মনে হলেই বুকের ভেতরে একটা উষ্ণতা অনুভব করি। 💞</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} viewport={{ once: true }}>তুমি হয়তো জানো না, তোমার ছোট ছোট কাজগুলো আমার কাছে কতটা মূল্যবান। ✨</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} viewport={{ once: true }}>তুমি রাগ করলেও ভালো লাগে। তুমি চুপ থাকলেও ভালো লাগে। 💕</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }} viewport={{ once: true }}>তুমি শুধু তুমি হলেই আমার জন্য যথেষ্ট। 🌹</motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 2.5 }} className="italic font-normal" viewport={{ once: true }}>— তোমার শরব 💕</motion.p>
      </div>

      {/* Wax Seal */}
      <div className="flex justify-center mt-20 relative h-32">
        {!sealed ? (
          <motion.button 
            onClick={handleSeal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="px-8 py-3 rounded-full border-2 border-rose-gold text-rose-gold font-medium uppercase tracking-widest text-xs hover:bg-rose-gold hover:text-white transition-all shadow-lg"
          >
            Seal with Love 🔏
          </motion.button>
        ) : (
          <motion.div 
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-rose-700 rounded-full flex items-center justify-center shadow-xl border-4 border-rose-600 border-double outline outline-2 outline-rose-700 relative group"
          >
            <span className="text-white font-heading text-4xl select-none group-hover:scale-110 transition-transform">S</span>
            <div className="absolute inset-0 rounded-full bg-black/10 mix-blend-multiply" />
            
            {/* The Rose Trigger */}
            <motion.button
              onClick={() => setGardenOpen(true)}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
              className="absolute -bottom-8 -right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-400 shadow-md border border-rose-100 hover:scale-110 transition-transform"
            >
              <Flower className="w-6 h-6 fill-rose-100" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {sealed && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-20"
        >
          <button 
            onClick={onNext}
            className="font-handwritten text-3xl text-rose-gold/60 hover:text-rose-gold transition-colors"
          >
            There's one more thing... 💫
          </button>
        </motion.div>
      )}

      {/* Secret Garden Overlay */}
      <AnimatePresence>
        {gardenOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-rose-950/40 backdrop-blur-3xl flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            <button 
              onClick={() => setGardenOpen(false)}
              className="absolute top-12 right-12 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
            <div className="text-center max-w-xl">
              <h4 className="text-white/40 uppercase tracking-[0.4em] text-sm mb-12">The Secret Memory Garden</h4>
              
              <AnimatePresence mode='wait'>
                <motion.div
                  key={gardenAff}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  transition={{ duration: 1 }}
                  className="mb-12 h-40 flex items-center justify-center"
                >
                  <p className="text-5xl md:text-6xl font-heading text-white drop-shadow-2xl">{gardenAff}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap justify-center gap-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.button
                    key={i}
                    onClick={nextGardenAff}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }}
                    className="p-4 bg-white/10 rounded-full text-white/60 hover:text-rose-300 hover:bg-white/20 transition-all"
                  >
                    <Flower className="w-10 h-10" />
                  </motion.button>
                ))}
              </div>
              <p className="mt-12 text-white/30 italic text-sm">Tap a rose to bloom a memory... 🌸</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
