import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SoundSystemProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function SoundSystem({ isPlaying, setIsPlaying }: SoundSystemProps) {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // INFO: Upload the MP3 file "AMR8, PRAAGYA - GULAAB (Lyrical Visualiser) PROD. BY SRIJJAN Mashooriya Originals.mp3" into public/music/
    const musicPath = '/music/AMR8, PRAAGYA - GULAAB (Lyrical Visualiser) PROD. BY SRIJJAN Mashooriya Originals.mp3';

    soundRef.current = new Howl({
      src: [musicPath],
      html5: true,
      loop: false, // Manual loop handling to support starting from 18s
      volume: 0.35,
      autoplay: false,
      onloaderror: (id, error) => {
        console.warn("Audio file not found at " + musicPath + ". Please upload the MP3 file into public/music/ to enable background music.", error);
      },
      onplay: function() {
        // Start from 18 seconds on initial play
        if (this.seek() < 1) {
          this.seek(18);
        }
      },
      onend: function() {
        // When end reached, seek back to 18 seconds and resume
        this.seek(18);
        this.play();
      }
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      soundRef.current?.play();
    } else {
      soundRef.current?.pause();
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-6 right-6 z-[100] flex items-center gap-4">
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="text-xs text-rose-gold/60 font-medium tracking-widest hidden md:block"
          >
            PLAYING LOVE AMBIENCE
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={toggleMusic}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-soft-rose group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}

// Utility to play interactive sounds
export const playSound = (type: 'chime' | 'sparkle' | 'thud') => {
  const sounds = {
    chime: 'https://assets.mixkit.co/sfx/preview/mixkit-sparkle-magical-entry-2850.mp3',
    sparkle: 'https://assets.mixkit.co/sfx/preview/mixkit-magic-sparkle-190.mp3',
    thud: 'https://assets.mixkit.co/sfx/preview/mixkit-soft-impact-2989.mp3',
  };

  const sound = new Howl({
    src: [sounds[type]],
    volume: 0.5,
  });
  sound.play();
};

// Utility for haptic feedback
export const vibrate = (pattern: number | number[] = 100) => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};
