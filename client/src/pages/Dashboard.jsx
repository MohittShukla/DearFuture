import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Dashboard.css';

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
    <div className="dashboard-page">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>My Messages</h1>
            <p>Welcome back, {user?.name}!</p>
          </div>
          <button
            className="create-message-btn"
            onClick={() => navigate('/')}
          >
            + Create New Message
          </button>
        </div>

        <div className="filter-tabs">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Messages ({messages.length})
          </button>
          <button
            className={filter === 'upcoming' ? 'active' : ''}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming ({messages.filter(m => !m.delivered && new Date(m.deliveryDate) >= new Date()).length})
          </button>
          <button
            className={filter === 'delivered' ? 'active' : ''}
            onClick={() => setFilter('delivered')}
          >
            Delivered ({messages.filter(m => m.delivered).length})
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your messages...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchMessages} className="retry-btn">
              Try Again
            </button>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📬</div>
            <h3>No messages here</h3>
            <p>
              {filter === 'upcoming'
                ? "You don't have any upcoming messages scheduled."
                : filter === 'delivered'
                ? "You haven't received any messages yet."
                : "You haven't created any messages yet."}
            </p>
            <button
              className="create-first-btn"
              onClick={() => navigate('/')}
            >
              Create Your First Message
            </button>
          </div>
        ) : (
          <div className="messages-grid">
            {filteredMessages.map((message) => {
              const isUpcoming = !message.delivered && new Date(message.deliveryDate) >= new Date();

              return (
                <div
                  key={message._id}
                  className={`message-card ${message.delivered ? 'delivered' : 'upcoming'}`}
                >
                  <div className="message-status">
                    {message.delivered ? (
                      <span className="status-badge delivered">Delivered</span>
                    ) : (
                      <span className="status-badge upcoming">
                        {getDaysUntil(message.deliveryDate)}
                      </span>
                    )}
                  </div>

                  <div className="message-date">
                    <div className="date-icon">📅</div>
                    <div>
                      <div className="date-label">
                        {message.delivered ? 'Delivered on' : 'Scheduled for'}
                      </div>
                      <div className="date-value">
                        {formatDate(message.delivered ? message.deliveredAt : message.deliveryDate)}
                      </div>
                    </div>
                  </div>

                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>

                  <div className="message-footer">
                    <span className="created-date">
                      Created {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
