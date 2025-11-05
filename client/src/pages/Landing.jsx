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
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-paper via-mist/10 to-paper">
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24 md:mb-32 lg:mb-40"
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-ink font-light mb-6">
            How it works
          </h2>
          <p className="font-sans text-lg md:text-xl text-ink-secondary max-w-2xl mx-auto leading-relaxed">
            A simple ritual to connect your present with your future
          </p>
        </motion.div>

        {/* Step 1 - Write */}
        <div className="mb-40 md:mb-56 lg:mb-64">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <div className="mb-8">
                <div className="font-serif text-[120px] md:text-[160px] lg:text-[200px] text-hope/[0.15] font-light leading-none tracking-tight -ml-2">
                  01
                </div>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink font-light mb-6 leading-[1.1]">
                Write from<br />the heart
              </h3>
              <p className="font-sans text-lg md:text-xl text-ink-secondary leading-relaxed max-w-md">
                Pour your thoughts, dreams, and reflections onto the page. Capture this moment in time with honesty and intention.
              </p>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="lg:col-span-7 order-1 lg:order-2"
            >
              <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto lg:ml-auto lg:mr-0">
                <div className="absolute inset-0 bg-gradient-to-br from-paper to-mist rounded-2xl overflow-hidden border border-hope/10 shadow-2xl shadow-hope/5">
                  {/* Paper texture */}
                  <div className="absolute inset-0 opacity-[0.015]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                  }} />

                  {/* Content */}
                  <div className="relative h-full p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    {/* Writing lines */}
                    <div className="space-y-6">
                      {[
                        { width: '75%', delay: 0.3 },
                        { width: '100%', delay: 0.4 },
                        { width: '85%', delay: 0.5 },
                        { width: '95%', delay: 0.6 },
                        { width: '70%', delay: 0.7 },
                        { width: '90%', delay: 0.8 },
                      ].map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0, opacity: 0 }}
                          whileInView={{ width: line.width, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: line.delay,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        >
                          <div className="h-[3px] bg-gradient-to-r from-hope/30 via-hope/20 to-transparent rounded-full" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Cursor indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.4 }}
                      className="mt-6 ml-auto mr-0"
                      style={{ width: '90%' }}
                    >
                      <motion.div
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-[2px] h-5 bg-hope/60 ml-auto"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Step 2 - Schedule */}
        <div className="mb-40 md:mb-56 lg:mb-64">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 order-1"
            >
              <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto lg:mr-auto lg:ml-0">
                <div className="absolute inset-0 bg-gradient-to-br from-mist to-paper rounded-2xl overflow-hidden border border-hope/10 shadow-2xl shadow-hope/5">
                  <div className="relative h-full flex items-center justify-center p-8 md:p-12">
                    {/* Circular timer visualization */}
                    <div className="relative w-full max-w-sm aspect-square">
                      {/* Outer circle */}
                      <motion.svg
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        viewBox="0 0 200 200"
                        className="w-full h-full"
                      >
                        <circle
                          cx="100"
                          cy="100"
                          r="90"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-hope/20"
                        />
                        <motion.circle
                          cx="100"
                          cy="100"
                          r="90"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="565.48"
                          strokeDashoffset="565.48"
                          className="text-hope/40"
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
                          style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                        />
                      </motion.svg>

                      {/* Center content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="text-center"
                        >
                          <div className="font-serif text-6xl md:text-7xl lg:text-8xl text-hope mb-2 font-light">
                            2030
                          </div>
                          <div className="font-sans text-sm md:text-base text-ink-secondary uppercase tracking-widest">
                            October
                          </div>
                        </motion.div>
                      </div>

                      {/* Tick marks */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + i * 0.05 }}
                          className="absolute w-0.5 h-3 bg-hope/30 top-0 left-1/2 -translate-x-1/2"
                          style={{
                            transformOrigin: 'bottom center',
                            transform: `rotate(${i * 30}deg) translateY(-90px)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="lg:col-span-5 order-2"
            >
              <div className="mb-8">
                <div className="font-serif text-[120px] md:text-[160px] lg:text-[200px] text-hope/[0.15] font-light leading-none tracking-tight -ml-2">
                  02
                </div>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink font-light mb-6 leading-[1.1]">
                Choose when<br />to receive it
              </h3>
              <p className="font-sans text-lg md:text-xl text-ink-secondary leading-relaxed max-w-md">
                Pick a moment in the future. Your letter will be locked away, waiting to find you when the time is right.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Step 3 - Receive */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <div className="mb-8">
                <div className="font-serif text-[120px] md:text-[160px] lg:text-[200px] text-hope/[0.15] font-light leading-none tracking-tight -ml-2">
                  03
                </div>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink font-light mb-6 leading-[1.1]">
                Rediscover<br />who you were
              </h3>
              <p className="font-sans text-lg md:text-xl text-ink-secondary leading-relaxed max-w-md">
                When the day arrives, open your letter and reconnect with your past self. Reflect on the journey between then and now.
              </p>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="lg:col-span-7 order-1 lg:order-2"
            >
              <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto lg:ml-auto lg:mr-0">
                <div className="absolute inset-0 bg-gradient-to-br from-paper to-mist rounded-2xl overflow-hidden border border-hope/10 shadow-2xl shadow-hope/5">
                  <div className="relative h-full flex items-center justify-center p-8 md:p-12">
                    {/* Abstract envelope shape */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      className="relative w-full max-w-sm"
                    >
                      {/* Envelope body */}
                      <div className="relative aspect-[3/2]">
                        {/* Bottom rectangle */}
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 bg-gradient-to-br from-hope/10 to-hope/5 border border-hope/20 rounded-lg"
                          style={{ transformOrigin: 'bottom' }}
                        />

                        {/* Top flap */}
                        <motion.div
                          initial={{ rotateX: 0 }}
                          whileInView={{ rotateX: -45 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-hope/20 to-hope/10 border border-hope/20 rounded-t-lg"
                          style={{ transformOrigin: 'bottom', transform: 'perspective(600px)' }}
                        />

                        {/* Letter peeking out */}
                        <motion.div
                          initial={{ y: 0, opacity: 0 }}
                          whileInView={{ y: -40, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[85%] h-[70%] bg-paper border border-hope/20 rounded-sm shadow-lg"
                        >
                          <div className="p-4 space-y-2">
                            {[60, 80, 70, 50].map((width, i) => (
                              <motion.div
                                key={i}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${width}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 1.8 + i * 0.1 }}
                                className="h-[2px] bg-hope/20 rounded-full"
                              />
                            ))}
                          </div>
                        </motion.div>
                      </div>
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
