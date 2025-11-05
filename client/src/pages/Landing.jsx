import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ========================================
// Hero Section ("The Threshold")
// ========================================
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms for background elements
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yOrb1 = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: yBg, opacity: opacityHero }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-paper via-mist to-paper bg-[length:200%_200%] animate-gradient-shift" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Floating Orbs for depth */}
        <motion.div
          style={{ y: yOrb1 }}
          className="absolute top-[10%] left-[10%] w-64 h-64 bg-hope/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: yOrb2 }}
          className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-mist/30 rounded-full blur-3xl"
        />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h1
          variants={item}
          className="font-serif font-light text-5xl md:text-7xl lg:text-8xl text-ink mb-6 leading-tight"
        >
          A letter to who you'll become.
        </motion.h1>

        <motion.p
          variants={item}
          className="font-sans text-lg md:text-xl lg:text-2xl text-ink-secondary mb-4 max-w-2xl mx-auto"
        >
          Write it down. Seal it in time. Receive it when you need it most.
        </motion.p>

        <motion.div variants={item} className="mt-12">
          <Link
            to="/signup"
            className="inline-block px-12 py-4 rounded-full bg-paper border-2 border-hope text-ink font-sans text-base md:text-lg font-semibold transition-all duration-500 hover:animate-glow-pulse"
          >
            Begin Your Letter
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ========================================
// Intro Section ("The Reflection")
// ========================================
function IntroSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ staggerChildren: 0.2 }}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-3xl md:text-5xl text-ink mb-12 text-center font-light"
        >
          This is a quiet place.
        </motion.h2>

        <motion.div className="space-y-6 text-ink-secondary font-sans text-base md:text-lg leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            We are all writing a story. We live chapter by chapter, day by day.
            But the person at the end of the book is still you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            This is a place to send them a message—a memory, a hope, a piece of advice, a promise.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Time will pass. You will change. And one day, in the future, you will open this letter
            and remember who you were when you wrote it.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}

// ========================================
// Feature Section ("The Ritual")
// ========================================

function FeatureSection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mist/20 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 md:mb-32"
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-ink font-light mb-6">
            How it works
          </h2>
          <p className="font-sans text-lg md:text-xl text-ink-secondary max-w-2xl mx-auto">
            Three simple steps to send a message to your future self
          </p>
        </motion.div>

        {/* Step 1 - Write */}
        <div className="mb-32 md:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-7xl md:text-8xl lg:text-9xl text-hope/20 font-light leading-none">
                  01
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-hope/30 to-transparent" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink font-light mb-6 leading-tight">
                Write from the heart
              </h3>
              <p className="font-sans text-base md:text-lg lg:text-xl text-ink-secondary leading-relaxed mb-8">
                Pour your thoughts, dreams, and reflections onto the page. What do you want to remember? What wisdom do you want to carry forward? Write it all down.
              </p>
              <div className="flex gap-3">
                <div className="w-12 h-1 bg-hope/40 rounded-full" />
                <div className="w-8 h-1 bg-hope/20 rounded-full" />
                <div className="w-4 h-1 bg-hope/10 rounded-full" />
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Background glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-hope/10 rounded-full blur-3xl"
                />

                {/* Content */}
                <div className="relative bg-gradient-to-br from-paper to-mist border border-hope/20 rounded-3xl p-8 md:p-12 shadow-lg">
                  <div className="space-y-4">
                    {[85, 100, 75, 90, 80].map((width, i) => (
                      <motion.div
                        key={i}
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: `${width}%`, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 0.6 + i * 0.1,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="h-2.5 bg-gradient-to-r from-hope/30 to-hope/10 rounded-full"
                      />
                    ))}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="pt-6 text-center"
                    >
                      <span className="text-6xl">✍️</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Step 2 - Schedule */}
        <div className="mb-32 md:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-1"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Background glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-hope/10 rounded-full blur-3xl"
                />

                {/* Content */}
                <div className="relative bg-gradient-to-br from-mist to-paper border border-hope/20 rounded-3xl p-8 md:p-12 shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="mb-6"
                    >
                      <div className="font-serif text-8xl md:text-9xl text-hope mb-4">
                        2030
                      </div>
                      <div className="font-sans text-xl text-ink-secondary">
                        October 15
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-5xl"
                    >
                      🔒
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="order-2"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-7xl md:text-8xl lg:text-9xl text-hope/20 font-light leading-none">
                  02
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-hope/30 to-transparent" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink font-light mb-6 leading-tight">
                Choose when to receive it
              </h3>
              <p className="font-sans text-base md:text-lg lg:text-xl text-ink-secondary leading-relaxed mb-8">
                Pick a date in the future—a year from now, five years, or even a decade. Your letter will be safely stored and delivered exactly when you need it most.
              </p>
              <div className="flex gap-3">
                <div className="w-12 h-1 bg-hope/40 rounded-full" />
                <div className="w-8 h-1 bg-hope/20 rounded-full" />
                <div className="w-4 h-1 bg-hope/10 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Step 3 - Receive */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-serif text-7xl md:text-8xl lg:text-9xl text-hope/20 font-light leading-none">
                  03
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-hope/30 to-transparent" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink font-light mb-6 leading-tight">
                Rediscover who you were
              </h3>
              <p className="font-sans text-base md:text-lg lg:text-xl text-ink-secondary leading-relaxed mb-8">
                When the time arrives, you'll receive your letter. Open it and reconnect with your past self. See how far you've come, what's changed, and what remains true.
              </p>
              <div className="flex gap-3">
                <div className="w-12 h-1 bg-hope/40 rounded-full" />
                <div className="w-8 h-1 bg-hope/20 rounded-full" />
                <div className="w-4 h-1 bg-hope/10 rounded-full" />
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Background glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-hope/10 rounded-full blur-3xl"
                />

                {/* Content */}
                <div className="relative bg-gradient-to-br from-paper to-mist border border-hope/20 rounded-3xl p-8 md:p-12 shadow-lg flex items-center justify-center">
                  <div className="relative">
                    {/* Floating particles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-2xl"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [-20, -40, -20],
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.6,
                          ease: 'easeInOut'
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}

                    {/* Envelope */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        scale: { duration: 0.8, delay: 0.3 },
                        opacity: { duration: 0.8, delay: 0.3 },
                        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                      }}
                      className="text-9xl"
                    >
                      ✉️
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================
// Final CTA Section ("The Invitation")
// ========================================
function FinalCTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0.5]
  );

  // Parallax motion values for background orbs
  const yOrb1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.5 }}
      className="py-32 md:py-40 px-6 relative overflow-hidden"
    >
      {/* Parallax Background Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-hope/10 rounded-full blur-3xl"
        style={{ y: yOrb1, opacity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-mist/40 rounded-full blur-3xl"
        style={{ y: yOrb2, opacity }}
      />

      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        style={{ scale }}
      >
        <motion.h2
          className="font-serif text-4xl md:text-6xl text-ink mb-12 font-light leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          What will you tell your future?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
        >
          <Link
            to="/signup"
            className="inline-block px-12 py-4 rounded-full bg-paper border-2 border-hope text-ink font-sans text-base md:text-lg font-semibold transition-all duration-500 hover:animate-glow-pulse hover:scale-110 hover:shadow-xl"
          >
            Begin Your Letter
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// ========================================
// Main Landing Page Component
// ========================================
function Landing() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/compose');
    }
  }, [isAuthenticated, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-paper font-sans antialiased"
    >
      <Header />
      <HeroSection />
      <IntroSection />
      <FeatureSection />
      <FinalCTASection />
      <Footer />
    </motion.div>
  );
}

export default Landing;
