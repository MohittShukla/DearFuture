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

// Feature card component
function FeatureCard({ number, title, description, visual, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="bg-gradient-to-br from-paper to-mist border border-hope/20 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-hope/40 h-full flex flex-col">
        {/* Visual/Image */}
        <div className="mb-8 flex items-center justify-center h-48 relative overflow-hidden rounded-xl bg-gradient-to-br from-mist/50 to-paper">
          {visual}
        </div>

        {/* Number Badge */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-hope/10 flex items-center justify-center border border-hope/20">
          <span className="font-serif text-2xl text-hope font-light">{number}</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4 font-normal group-hover:text-hope transition-colors duration-300">
            {title}
          </h3>
          <p className="font-sans text-base md:text-lg text-ink-secondary leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureSection() {
  const features = [
    {
      number: '1',
      title: 'Write Your Truth',
      description: 'Pour your heart onto the page. Share what matters to you today, your dreams, hopes, and the wisdom you want to remember.',
      visual: (
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full h-full flex items-center justify-center p-6"
        >
          <div className="space-y-3 w-full">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '75%' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-2.5 bg-hope/30 rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-2.5 bg-hope/30 rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '90%' }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="h-2.5 bg-hope/30 rounded-full"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '85%' }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="h-2.5 bg-hope/30 rounded-full"
            />
            <div className="pt-4">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="text-6xl"
              >
                ✍️
              </motion.div>
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      number: '2',
      title: 'Seal it in Time',
      description: 'Choose the perfect moment in the future—a year, five years, or even a decade. Your letter will wait, locked away until that special day arrives.',
      visual: (
        <motion.div
          initial={{ rotate: -5, scale: 0.9 }}
          whileInView={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="w-full h-full flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-serif text-7xl md:text-8xl text-hope mb-3"
            >
              2030
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="font-sans text-xl text-ink-secondary"
            >
              October 15
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="text-4xl mt-4"
            >
              🔒
            </motion.div>
          </div>
        </motion.div>
      ),
    },
    {
      number: '3',
      title: 'Rediscover Yourself',
      description: "When the time comes, receive your letter. Open it and reflect on your journey, seeing how far you've come and who you've become.",
      visual: (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full h-full flex items-center justify-center relative"
        >
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-hope to-transparent bg-[length:200%_100%] rounded-full"
          />
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-9xl"
          >
            ✉️
          </motion.div>
        </motion.div>
      ),
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-transparent via-mist/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-3xl md:text-5xl text-ink mb-16 text-center font-light"
        >
          The Ritual
        </motion.h2>

        {/* Three static cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.number}
              {...feature}
              delay={index * 0.2}
            />
          ))}
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
