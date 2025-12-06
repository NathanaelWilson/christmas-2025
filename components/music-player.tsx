"use client";

import { useState, useEffect, useRef } from "react";
import { Music, Music2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play music on mount (muted first due to browser policy)
  useEffect(() => {
    // Restore muted preference from localStorage
    const storedMuted =
      typeof window !== "undefined" && localStorage.getItem("music-muted");
    const initialMuted = storedMuted === "true";
    setIsMuted(initialMuted);

    const playAudio = async () => {
      try {
        if (!audioRef.current) return;

        audioRef.current.muted = initialMuted;
        audioRef.current.volume = initialMuted ? 0 : 0;

        // Try to play; if browser blocks autoplay, user must click
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (!initialMuted) fadeIn();
              setIsPlaying(!initialMuted);
            })
            .catch(() => {
              // Browser blocked autoplay
              setIsPlaying(false);
            });
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
        if (audioRef.current) {
          audioRef.current.pause();
          // ensure muted state on finish so mobile keeps it silent
          audioRef.current.muted = true;
        }
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      // Unmute & play
      audioRef.current.muted = false;
      setIsMuted(false);
      localStorage.setItem("music-muted", "false");
      audioRef.current.play().catch(() => {});
      fadeIn();
      setIsPlaying(true);
    } else {
      // Mute & fade out
      fadeOut();
      setIsMuted(true);
      localStorage.setItem("music-muted", "true");
      setIsPlaying(false);
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
        {isMuted ? (
          <VolumeX size={24} />
        ) : isPlaying ? (
          <Music2 size={24} className="animate-pulse" />
        ) : (
          <Music size={24} />
        )}
      </button>
    </>
  );
}
