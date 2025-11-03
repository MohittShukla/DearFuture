import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = await signup(name, email, password);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-paper/60 backdrop-blur-sm border border-hope/20 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4 font-light">
                Begin Your Journey
              </h2>
              <p className="font-sans text-base text-ink-secondary">
                Create an account to send messages through time
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm font-sans"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-sans text-sm text-ink mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 bg-paper border border-hope/30 rounded-lg font-sans text-ink placeholder-ink-secondary/50 focus:outline-none focus:border-hope focus:ring-2 focus:ring-hope/20 transition-all duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-sans text-sm text-ink mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-paper border border-hope/30 rounded-lg font-sans text-ink placeholder-ink-secondary/50 focus:outline-none focus:border-hope focus:ring-2 focus:ring-hope/20 transition-all duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block font-sans text-sm text-ink mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  autoComplete="new-password"
                  minLength={6}
                  className="w-full px-4 py-3 bg-paper border border-hope/30 rounded-lg font-sans text-ink placeholder-ink-secondary/50 focus:outline-none focus:border-hope focus:ring-2 focus:ring-hope/20 transition-all duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block font-sans text-sm text-ink mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  autoComplete="new-password"
                  minLength={6}
                  className="w-full px-4 py-3 bg-paper border border-hope/30 rounded-lg font-sans text-ink placeholder-ink-secondary/50 focus:outline-none focus:border-hope focus:ring-2 focus:ring-hope/20 transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-full bg-paper border-2 border-hope text-ink font-sans text-base font-semibold transition-all duration-500 hover:animate-glow-pulse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="font-sans text-sm text-ink-secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-hope hover:text-ink transition-colors duration-300 font-semibold"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
