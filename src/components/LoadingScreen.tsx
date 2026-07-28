"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleText } from './ScrambleText';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Minimum delay so the loading animation is always seen briefly 
    // even on very fast connections, but waits for load on slow ones.
    const minDelay = 2000; 
    const startTime = Date.now();
    let isMounted = true;

    // Simulate progress bar going up to 99%
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min((elapsed / minDelay) * 100, 99);
      if (isMounted) {
        setProgress(calculatedProgress);
      }
    }, 50);

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDelay - elapsed);
      
      // Wait for minDelay if the page loaded too fast
      setTimeout(() => {
        if (isMounted) {
          setProgress(100);
          // Small pause at 100% before fading out
          setTimeout(() => setIsLoading(false), 400); 
        }
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }

    return () => {
      isMounted = false;
      clearInterval(progressInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f1f5f9] font-doto"
        >
          <div className="text-2xl md:text-5xl font-bold text-slate-900 tracking-[0.2em] md:tracking-[0.3em]">
            <ScrambleText text="LOADING..." duration={1200} loop={true} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
