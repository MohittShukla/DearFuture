import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, upcoming, delivered
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.PROD
    ? '/api'
    : 'http://localhost:3000/api';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchMessages();
  }, [isAuthenticated, navigate]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/messages/my-messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.data);
      } else {
        setError('Failed to load messages');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredMessages = () => {
    const now = new Date();
    if (filter === 'upcoming') {
      return messages.filter(msg => !msg.delivered && new Date(msg.deliveryDate) >= now);
    } else if (filter === 'delivered') {
      return messages.filter(msg => msg.delivered);
    }
    return messages;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const now = new Date();
    const deliveryDate = new Date(dateString);
    const diffTime = deliveryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `in ${diffDays} days`;
  };

  const filteredMessages = getFilteredMessages();

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
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h1 className="font-serif text-4xl md:text-6xl text-ink mb-2 font-light">
                  Your Archive
                </h1>
                <p className="font-sans text-lg text-ink-secondary">
                  Welcome back, {user?.name}
                </p>
              </div>
              <button
                onClick={() => navigate('/compose')}
                className="px-8 py-3 rounded-full bg-paper border-2 border-hope text-ink font-sans text-base font-semibold transition-all duration-500 hover:animate-glow-pulse"
              >
                Compose New Letter
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 border-b border-ink/10 overflow-x-auto">
              {[
                { key: 'all', label: `All (${messages.length})` },
                { key: 'upcoming', label: `Upcoming (${messages.filter(m => !m.delivered && new Date(m.deliveryDate) >= new Date()).length})` },
                { key: 'delivered', label: `Delivered (${messages.filter(m => m.delivered).length})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-6 py-3 font-sans text-sm transition-all duration-300 whitespace-nowrap ${
                    filter === tab.key
                      ? 'text-ink border-b-2 border-hope font-semibold'
                      : 'text-ink-secondary hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 border-4 border-hope/30 border-t-hope rounded-full animate-spin mb-4"></div>
              <p className="font-sans text-ink-secondary">Loading your letters...</p>
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <p className="font-sans text-red-600 mb-6">{error}</p>
              <button
                onClick={fetchMessages}
                className="px-6 py-3 rounded-full bg-paper border-2 border-hope text-ink font-sans font-semibold hover:bg-hope/5 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          ) : filteredMessages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-24"
            >
              <div className="text-6xl mb-6">📬</div>
              <h3 className="font-serif text-3xl text-ink mb-4 font-light">
                No letters here yet
              </h3>
              <p className="font-sans text-ink-secondary mb-8 max-w-md mx-auto">
                {filter === 'upcoming'
                  ? "You don't have any upcoming messages scheduled."
                  : filter === 'delivered'
                  ? "You haven't received any messages yet."
                  : "Begin your journey by writing your first letter to the future."}
              </p>
              <button
                onClick={() => navigate('/compose')}
                className="px-8 py-3 rounded-full bg-paper border-2 border-hope text-ink font-sans font-semibold transition-all duration-500 hover:animate-glow-pulse"
              >
                Write Your First Letter
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-paper/60 backdrop-blur-sm border border-hope/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="text-xs font-sans text-ink-secondary mb-2">
                        {message.delivered ? 'Delivered' : 'Scheduled'}
                      </div>
                      <div className="font-serif text-xl text-ink">
                        {formatDate(message.delivered ? message.deliveredAt : message.deliveryDate)}
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-xs font-sans font-semibold ${
                      message.delivered
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-hope/10 text-hope border border-hope/30'
                    }`}>
                      {message.delivered ? 'Opened' : getDaysUntil(message.deliveryDate)}
                    </span>
                  </div>

                  <div className="mb-6">
                    <p className="font-serif text-base text-ink leading-relaxed line-clamp-6">
                      {message.message}
                    </p>
                  </div>

                  <div className="text-xs font-sans text-ink-secondary border-t border-ink/5 pt-4">
                    Written on {new Date(message.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
