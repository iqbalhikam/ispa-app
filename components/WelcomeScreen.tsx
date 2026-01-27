'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide animation after 4.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Trigger onComplete after exit animation
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 text-white overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}>
          {/* Background decoration */}
          <motion.div
            className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500 opacity-20 blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500 opacity-20 blur-[100px]"
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <motion.div variants={itemVariants} className="text-center relative z-10 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">SISTEM PAKAR</span>
            </h1>
            <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full" />
            <p className="mt-4 text-xl text-blue-100 font-light tracking-widest">DIAGNOSA ISPA</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-center text-sm uppercase tracking-wider text-blue-200 mb-6 font-semibold">Disusun Oleh Kelompok:</h3>
            <ul className="space-y-4 text-center">
              {/* USER: Ganti nama anggota di bawah ini */}
              <motion.li variants={itemVariants} className="text-lg font-medium">
                Nama Anggota 1
              </motion.li>
              <motion.li variants={itemVariants} className="text-lg font-medium">
                Nama Anggota 2
              </motion.li>
              <motion.li variants={itemVariants} className="text-lg font-medium">
                Nama Anggota 3
              </motion.li>
              <motion.li variants={itemVariants} className="text-lg font-medium">
                Nama Anggota 4
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="absolute bottom-10 text-xs text-blue-300 opacity-60">
            Memuat Aplikasi...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
