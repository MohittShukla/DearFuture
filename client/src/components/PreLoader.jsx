import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// Individual Cloud Component with organic shape
function Cloud({ delay, duration, y, scale, blur, opacity, zIndex }) {
  return (
    <motion.div
      className="absolute"
      initial={{ x: '-20%', y }}
      animate={{ x: '120%' }}
      transition={{
        duration,
        delay,
        ease: 'linear',
        repeat: Infinity,
      }}
      style={{ zIndex }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Organic cloud shape using multiple overlapping ellipses */}
        <div className="relative" style={{ filter: `blur(${blur}px)`, opacity, transform: `scale(${scale})` }}>
          <div className="absolute w-24 h-16 bg-white rounded-full" />
          <div className="absolute left-8 -top-2 w-28 h-20 bg-white rounded-full" />
          <div className="absolute left-16 top-1 w-32 h-18 bg-white rounded-full" />
          <div className="absolute left-12 top-6 w-20 h-14 bg-white rounded-full" />
          <div className="absolute left-20 top-8 w-24 h-16 bg-white rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function PreLoader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState('flying'); // flying, arriving, complete

  useEffect(() => {
    // Phase 1: Flying through clouds (0-2.5s)
    const arriveTimer = setTimeout(() => {
      setPhase('arriving');
    }, 2500);

    // Phase 2: Complete and fade out (3.2s)
    const completeTimer = setTimeout(() => {
      setPhase('complete');
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 600);
      }
    }, 3200);

    return () => {
      clearTimeout(arriveTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #a6cffc 0%, #d2e6f9 50%, #e8f4f8 100%)',
          }}
        >
          {/* Multiple cloud layers for depth */}
          {/* Back layer clouds - small and blurry */}
          <Cloud delay={0} duration={20} y="15%" scale={0.6} blur={8} opacity={0.3} zIndex={1} />
          <Cloud delay={2} duration={22} y="25%" scale={0.65} blur={8} opacity={0.35} zIndex={1} />
          <Cloud delay={4} duration={21} y="20%" scale={0.6} blur={8} opacity={0.32} zIndex={1} />

          {/* Middle layer clouds */}
          <Cloud delay={1} duration={16} y="30%" scale={0.85} blur={6} opacity={0.5} zIndex={2} />
          <Cloud delay={3} duration={17} y="40%" scale={0.9} blur={6} opacity={0.55} zIndex={2} />
          <Cloud delay={5} duration={15} y="35%" scale={0.88} blur={6} opacity={0.52} zIndex={2} />

          {/* Front layer clouds - larger */}
          <Cloud delay={0.5} duration={12} y="50%" scale={1.2} blur={4} opacity={0.7} zIndex={4} />
          <Cloud delay={2.5} duration={13} y="55%" scale={1.15} blur={4} opacity={0.68} zIndex={4} />
          <Cloud delay={4.5} duration={11} y="48%" scale={1.25} blur={4} opacity={0.72} zIndex={4} />

          {/* Paper Airplane - 3D Perspective Flight */}
          <motion.div
            className="absolute"
            initial={{
              x: '5%',
              y: '70%',
              scale: 0.4,
              rotateY: 25,
              rotateZ: -35,
            }}
            animate={
              phase === 'flying'
                ? {
                    x: ['5%', '25%', '45%'],
                    y: ['70%', '50%', '45%'],
                    scale: [0.4, 0.75, 1],
                    rotateY: [25, 10, 0],
                    rotateZ: [-35, -15, -8],
                    rotateX: [15, 5, 0],
                  }
                : phase === 'arriving'
                ? {
                    x: '48%',
                    y: '46%',
                    scale: 1,
                    rotateY: 0,
                    rotateZ: 0,
                    rotateX: 0,
                  }
                : {}
            }
            transition={
              phase === 'flying'
                ? {
                    duration: 2.5,
                    ease: [0.22, 1, 0.36, 1],
                    times: [0, 0.5, 1],
                  }
                : {
                    duration: 0.7,
                    ease: [0.34, 1.56, 0.64, 1],
                  }
            }
            style={{
              transformStyle: 'preserve-3d',
              perspective: 1000,
              zIndex: 3,
            }}
          >
            {/* 3D Paper Airplane SVG */}
            <motion.svg
              width="100"
              height="100"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
              }}
            >
              {/* Wing shadow for depth */}
              <path
                d="M20 60 L95 35 L95 50 L40 60 L95 70 L95 85 L20 60 Z"
                fill="rgba(0, 0, 0, 0.08)"
                transform="translate(2, 2)"
              />

              {/* Main body - left wing */}
              <path
                d="M20 60 L95 35 L95 50 L40 60 Z"
                fill="#ffffff"
                stroke="#BEA06E"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Main body - right wing */}
              <path
                d="M20 60 L95 70 L95 85 L40 60 Z"
                fill="#f8f8f8"
                stroke="#BEA06E"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Center fold/body */}
              <path
                d="M20 60 L95 42.5 L95 77.5 Z"
                fill="rgba(190, 160, 110, 0.15)"
                stroke="#BEA06E"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Fold lines for detail */}
              <line
                x1="20" y1="60"
                x2="95" y2="42.5"
                stroke="#BEA06E"
                strokeWidth="0.8"
                opacity="0.6"
              />
              <line
                x1="20" y1="60"
                x2="95" y2="77.5"
                stroke="#BEA06E"
                strokeWidth="0.8"
                opacity="0.6"
              />

              {/* Nose detail */}
              <circle
                cx="95"
                cy="60"
                r="2"
                fill="#BEA06E"
              />
            </motion.svg>

            {/* Motion trail */}
            <motion.div
              className="absolute top-1/2 -left-16 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'flying' ? 0.4 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(to right, transparent, rgba(190, 160, 110, 0.4), transparent)',
                filter: 'blur(1px)',
              }}
            />
          </motion.div>

          {/* Heading Text - appears after plane arrives */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: '-50%', y: '-50%', scale: 0.9 }}
            animate={
              phase === 'arriving' || phase === 'complete'
                ? { opacity: 1, x: '5%', y: '-50%', scale: 1 }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <h1 className="font-serif text-4xl md:text-6xl text-white/95 font-light tracking-wide whitespace-nowrap"
              style={{
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              A letter to who you'll become.
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PreLoader;
