"use client";

import { useState, useEffect, useRef } from "react";
import { Music, Music2 } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play music on mount (muted first due to browser policy)
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0; // Start from 0
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                fadeIn(); // Fade in after play starts
                setIsPlaying(true);
              })
              .catch(() => {
                // Browser blocked autoplay, user must click button
                setIsPlaying(false);
              });
          }
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };

    playAudio();

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // Fade in effect
  const fadeIn = () => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const targetVolume = 0.2;
    const step = 0.02;
    audioRef.current.volume = 0;

    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume < targetVolume) {
        audioRef.current.volume = Math.min(
          audioRef.current.volume + step,
          targetVolume
        );
      } else {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  };

  // Fade out effect
  const fadeOut = () => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const step = 0.02;
    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0) {
        audioRef.current.volume = Math.max(audioRef.current.volume - step, 0);
      } else {
        if (audioRef.current) audioRef.current.pause();
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        fadeOut();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        fadeIn();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/Michael Bublé - I'll Be Home For Christmas [Official HD].mp3"
        loop
        preload="auto"
      />

      {/* Music Toggle Button - Fixed Position */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 z-50 rounded-full bg-emerald-600 text-white p-3 shadow-lg hover:bg-emerald-500 hover:scale-110 transition-all duration-300 border-4 border-white"
        title={isPlaying ? "Mute Music" : "Play Music"}
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          <Music2 size={24} className="animate-pulse" />
        ) : (
          <Music size={24} />
        )}
      </button>
    </>
  );
}
