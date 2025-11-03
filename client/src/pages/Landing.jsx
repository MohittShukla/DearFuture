import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Landing.css';
import '../styles/theme.css';

function Landing() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate('/compose');
    }

    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`landing-page ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated Background */}
      <div className="landing-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="stars"></div>
      </div>

      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              <span className="title-word">Dear</span>{' '}
              <span className="title-word gradient-text">Future</span>
            </h1>
            <p className="hero-subtitle">
              Send messages to your future self
            </p>
            <p className="hero-description">
              Capture your thoughts, dreams, and reflections today.
              We'll deliver them to you at the perfect moment in the future.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">
                Get Started
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <div className="card-shimmer"></div>
              <div className="card-content">
                <div className="card-icon">✉️</div>
                <div className="card-text">
                  <div className="card-line"></div>
                  <div className="card-line short"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section scroll-animate">
        <div className="container">
          <h2 className="section-title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="features-grid">
            <div className="feature-card glass">
              <div className="feature-number">01</div>
              <div className="feature-icon">📝</div>
              <h3>Write Your Message</h3>
              <p>Share your thoughts, goals, advice, or reflections with your future self.</p>
            </div>
            <div className="feature-card glass">
              <div className="feature-number">02</div>
              <div className="feature-icon">📅</div>
              <h3>Choose When</h3>
              <p>Select any future date - a month, a year, or even five years from now.</p>
            </div>
            <div className="feature-card glass">
              <div className="feature-number">03</div>
              <div className="feature-icon">📬</div>
              <h3>Receive & Reflect</h3>
              <p>Get your message delivered on the perfect day and reflect on your journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section scroll-animate">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your messages are encrypted and stored securely</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <h3>Reliable Delivery</h3>
              <p>Advanced scheduling ensures your message arrives on time</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <h3>Track Your Growth</h3>
              <p>View all your past and upcoming messages in one place</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💫</div>
              <h3>Beautiful Experience</h3>
              <p>Thoughtfully designed to make time travel delightful</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section scroll-animate">
        <div className="container">
          <div className="cta-card glass">
            <h2>Ready to Send a Message to Your Future Self?</h2>
            <p>Join thousands of people reflecting on their journey through time</p>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create Your Free Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
