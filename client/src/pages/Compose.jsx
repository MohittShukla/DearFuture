import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Compose() {
  const { isAuthenticated, loading, user, token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [deliverDate, setDeliverDate] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setEmail(user.email);
    }
  }, [isAuthenticated, user]);

  const handleIntervalClick = (monthsToAdd) => {
    const today = new Date();
    today.setMonth(today.getMonth() + monthsToAdd);
    setDeliverDate(today.toISOString().split('T')[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      message,
      email,
      deliverDate,
    };

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const selectedDate = new Date(formData.deliverDate);
    const today = new Date();
    if (selectedDate < today) {
      setError('Please select a future date.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      if (isAuthenticated && token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        navigate('/success');
      } else {
        setError('Failed to send your message. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-hope/30 border-t-hope rounded-full animate-spin"></div>
      </div>
    );
  }

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

      <main className="flex-1 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink mb-6 font-light">
              A Letter to Your Future
            </h1>
            <p className="font-sans text-lg md:text-xl text-ink-secondary max-w-2xl mx-auto">
              What will you tell the person you'll become?
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Message Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-paper/60 backdrop-blur-sm border border-hope/20 rounded-2xl p-8 md:p-12 shadow-lg"
            >
              <label className="block font-serif text-2xl md:text-3xl text-ink mb-4 font-light">
                Your words...
              </label>
              <p className="font-sans text-sm text-ink-secondary mb-6 italic">
                The present is but a fleeting moment, slipping like sand through your fingers...
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="As I write these words..."
                required
                rows={12}
                className="w-full px-6 py-4 bg-paper/80 border border-hope/30 rounded-xl font-serif text-lg text-ink placeholder-ink-secondary/50 focus:outline-none focus:border-hope focus:ring-2 focus:ring-hope/20 transition-all duration-300 resize-none"
              />
            </motion.div>

            {/* Delivery Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="bg-paper/60 backdrop-blur-sm border border-hope/20 rounded-2xl p-8 md:p-12 shadow-lg space-y-8"
            >
              <div>
                <label className="block font-serif text-2xl md:text-3xl text-ink mb-4 font-light">
                  When shall these words find you?
                </label>
                <p className="font-sans text-sm text-ink-secondary mb-6 italic">
                  Choose when these words will find you again...
                </p>

                {/* Quick Date Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: '1 Month', months: 1 },
                    { label: '6 Months', months: 6 },
                    { label: '1 Year', months: 12 },
                    { label: '5 Years', months: 60 },
                  ].map((option) => (
                    <button
                      key={option.months}
                      type="button"
                      onClick={() => handleIntervalClick(option.months)}
                      className="px-4 py-3 border border-hope/30 rounded-lg text-ink-secondary hover:border-hope hover:text-ink hover:bg-hope/5 transition-all duration-300 font-sans text-sm"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <input
                  type="date"
                  value={deliverDate}
                  onChange={(e) => setDeliverDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-paper border border-hope/30 rounded-lg font-sans text-ink focus:outline-none focus:border-hope focus:ring-2 focus:ring-hope/20 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-ink mb-2">
                  Where will you be found?
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  readOnly={isAuthenticated}
                  required
                  className={`w-full px-4 py-3 bg-paper border border-hope/30 rounded-lg font-sans text-ink placeholder-ink-secondary/50 focus:outline-none focus:border-hope focus:ring-2 focus:ring-hope/20 transition-all duration-300 ${
                    isAuthenticated ? 'cursor-not-allowed opacity-60' : ''
                  }`}
                />
                {isAuthenticated && (
                  <p className="text-xs text-ink-secondary mt-2">
                    Using your account email
                  </p>
                )}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm font-sans"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-4 rounded-full bg-paper border-2 border-hope text-ink font-sans text-lg font-semibold transition-all duration-500 hover:animate-glow-pulse disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sealing your letter...' : 'Send to the Future'}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default Compose;
