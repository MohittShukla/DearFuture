import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper font-sans antialiased flex flex-col">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-paper via-mist to-paper bg-[length:200%_200%] animate-gradient-shift" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
            className="mb-12"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-serif text-5xl md:text-6xl text-ink mb-6 font-light"
          >
            Your Letter is Sealed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-sans text-lg md:text-xl text-ink-secondary mb-12 max-w-xl mx-auto leading-relaxed"
          >
            Your words have been preserved in time. When the moment arrives,
            they will find you—a message from who you are now to who you'll become.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/compose')}
              className="px-8 py-4 rounded-full bg-paper border-2 border-hope text-ink font-sans text-base font-semibold transition-all duration-500 hover:animate-glow-pulse"
            >
              Write Another Letter
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 rounded-full bg-transparent border-2 border-ink/20 text-ink font-sans text-base font-semibold hover:border-hope hover:bg-hope/5 transition-all duration-300"
            >
              View Your Archive
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-16 font-serif text-sm text-ink-secondary italic"
          >
            "The future is not a destination. It is a conversation with ourselves."
          </motion.p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default Success;
