import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

const affirmations = [
  { en: "You light up every room without even trying.", bn: "তুমি যেমন আছো, ঠিক তেমনই সুন্দর। ✨" },
  { en: "Your smile is genuinely the most beautiful thing.", bn: "তোমাকে ভালোবাসা আমার সবচেয়ে ভালো সিদ্ধান্ত। 💫" },
  { en: "You are so much stronger than you give yourself credit for.", bn: "তুমি আমার স্বপ্নের চেয়েও বেশি। 💗" },
  { en: "The world became better the day you were born.", bn: "তুমি আমার সব কিছু 💕" },
  { en: "You deserve all the love in every universe that exists.", bn: "তোমার হাসিতে আমি হারিয়ে যাই ✨" },
  { en: "Just being you is enough. More than enough. Always.", bn: "তুমি এত সুন্দর কেন? 🌸" },
  { en: "Whenever I think of warmth, I think of you.", bn: "তুমি আমার বুকের ভেতর থাকো 💞" },
  { en: "You are rare. Truly, beautifully rare.", bn: "তুমি না থাকলে দিন কাটে না 🌙" }
];

export default function UniversePage({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full max-w-6xl py-20 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-7xl text-soft-rose mb-4">You Are My Universe</h2>
        <p className="text-champagne/60 tracking-widest uppercase text-sm">Floating through thoughts of you</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4">
        {affirmations.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-soft-rose/30 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <Sparkles className="w-24 h-24 text-soft-rose" />
            </div>
            
            <p className="text-xl md:text-2xl font-light mb-6 leading-relaxed">
              {a.en}
            </p>
            <p className="font-bengali text-rose-gold/80 text-lg">
              {a.bn}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-20 px-10 py-5 rounded-full bg-soft-rose/20 backdrop-blur-xl border border-soft-rose/30 flex items-center gap-4 text-white hover:bg-soft-rose/30 transition-all group"
      >
        <span className="font-medium tracking-widest uppercase text-sm">Explore More</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
      </motion.button>
    </div>
  );
}
