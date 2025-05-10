import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormSection from '../components/FormSection';
import '../styles/Home.css';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Control animation sequence on page load
  useEffect(() => {
    // Allow a small delay for DOM to be ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Particle animation setup
    const createParticles = () => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        // Set random positions
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 4;
        const duration = 15 + Math.random() * 10;
        
        particle.style.setProperty('--x', `${x}%`);
        particle.style.setProperty('--y', `${y}%`);
        particle.style.setProperty('--delay', `${delay}s`);
        particle.style.setProperty('--duration', `${duration}s`);
      });
    };
    
    createParticles();
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`home-wrapper ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated background elements */}
      <div className="animated-background">
        <div className="gradient-circle primary"></div>
        <div className="gradient-circle secondary"></div>
        
        {/* Floating particles */}
        <div className="particles-container">
          {[...Array(15)].map((_, index) => (
            <div key={index} className="particle"></div>
          ))}
        </div>
      </div>
      
      {/* Decorative grid overlay */}
      <div className="grid-overlay"></div>
      
      <Header />
      
      <main className="home-main">
        <div className="hero-section">
          <h1 className="hero-title">
            <span className="title-line">Send a Message</span>
            <span className="title-line accent">to Your Future Self</span>
          </h1>
          
          <p className="hero-description">
            Capture your thoughts, goals, and reflections today. 
            We'll deliver them to you at a moment of your choosing in the future.
          </p>
        </div>
        
        <FormSection />
        
        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon time"></div>
            <h3>Time Capsule</h3>
            <p>Create a digital time capsule of your thoughts to revisit in the future.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon secure"></div>
            <h3>Secure Storage</h3>
            <p>Your messages are encrypted and stored securely until delivery.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon remind"></div>
            <h3>Self-Reflection</h3>
            <p>Reflect on your growth and see how your perspective has changed.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Home;
