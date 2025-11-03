import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// ========================================
// Header Component
// ========================================
function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl md:text-3xl text-ink font-normal tracking-wide">
          Dear Future
        </Link>
        <nav className="flex items-center gap-8 font-sans text-ink-secondary">
          <Link to="/login" className="text-sm md:text-base hover:text-ink transition-colors duration-300">
            Sign In
          </Link>
          <a href="#faq" className="text-sm md:text-base hover:text-ink transition-colors duration-300">
            FAQ
          </a>
        </nav>
      </div>
    </motion.header>
  );
}

// ========================================
// Hero Section ("The Threshold")
// ========================================
function HeroSection() {
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
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-paper via-mist to-paper bg-[length:200%_200%] animate-gradient-shift" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

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
      viewport={{ once: true, margin: "-100px" }}
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

        <motion.div
          className="space-y-6 text-ink-secondary font-sans text-base md:text-lg leading-relaxed"
        >
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
  const features = [
    {
      number: '1',
      title: 'Write Your Truth',
      description: 'Pour your heart onto the page. Share what matters to you today.',
      visual: (
        <div className="w-full h-48 bg-gradient-to-br from-paper to-mist border border-hope/20 rounded-lg p-6 shadow-sm">
          <div className="space-y-3">
            <div className="h-2 bg-hope/20 rounded w-3/4" />
            <div className="h-2 bg-hope/20 rounded w-full" />
            <div className="h-2 bg-hope/20 rounded w-5/6" />
            <div className="h-2 bg-hope/20 rounded w-4/5" />
          </div>
        </div>
      ),
    },
    {
      number: '2',
      title: 'Seal it in Time',
      description: 'Choose the perfect moment in the future. A year. Five years. A decade.',
      visual: (
        <div className="w-full h-48 bg-gradient-to-br from-paper to-mist border border-hope/20 rounded-lg flex items-center justify-center shadow-sm">
          <div className="text-center">
            <div className="font-serif text-5xl text-hope mb-2">2030</div>
            <div className="font-sans text-sm text-ink-secondary">October 15</div>
          </div>
        </div>
      ),
    },
    {
      number: '3',
      title: 'Rediscover Yourself',
      description: 'When the time comes, open your letter and reflect on your journey.',
      visual: (
        <div className="w-full h-48 bg-gradient-to-br from-paper to-mist border border-hope/20 rounded-lg flex items-center justify-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-hope to-transparent" />
          <div className="text-6xl">✉️</div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-transparent via-mist/30 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-3xl md:text-5xl text-ink mb-20 text-center font-light"
        >
          The Ritual
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="mb-6 font-serif text-8xl text-hope/20 font-light">
                {feature.number}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                className="mb-8"
              >
                {feature.visual}
              </motion.div>

              <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4 font-normal">
                {feature.title}
              </h3>
              <p className="font-sans text-base text-ink-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
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
  return (
    <motion.section
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5 }}
      className="py-32 md:py-40 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-6xl text-ink mb-12 font-light leading-tight">
          What will you tell your future?
        </h2>
        <Link
          to="/signup"
          className="inline-block px-12 py-4 rounded-full bg-paper border-2 border-hope text-ink font-sans text-base md:text-lg font-semibold transition-all duration-500 hover:animate-glow-pulse"
        >
          Begin Your Letter
        </Link>
      </div>
    </motion.section>
  );
}

// ========================================
// Footer Component
// ========================================
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-ink/5">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-sans text-sm text-ink-secondary mb-4">
          Dear Future is a quiet place for reflection.
        </p>
        <div className="flex items-center justify-center gap-6 font-sans text-xs text-ink-secondary">
          <a href="#faq" className="hover:text-ink transition-colors duration-300">
            FAQ
          </a>
          <span>|</span>
          <a href="#privacy" className="hover:text-ink transition-colors duration-300">
            Privacy
          </a>
          <span>|</span>
          <a href="#philosophy" className="hover:text-ink transition-colors duration-300">
            Our Philosophy
          </a>
        </div>
      </div>
    </footer>
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
    <div className="min-h-screen bg-paper font-sans antialiased">
      <Header />
      <HeroSection />
      <IntroSection />
      <FeatureSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}

export default Landing;
