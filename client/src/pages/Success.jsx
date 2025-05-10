import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Success.css";

function Success() {
  // Optional: Add animation effect when component mounts
  useEffect(() => {
    // This ensures animations trigger properly on page load
    document.body.classList.add('success-page-loaded');
    
    return () => {
      document.body.classList.remove('success-page-loaded');
    };
  }, []);

  return (
    <div className="success-wrapper">
      {/* Decorative floating elements */}
      <div className="floating-elements">
        <div className="floating-dot"></div>
        <div className="floating-dot"></div>
        <div className="floating-dot"></div>
        <div className="floating-dot"></div>
      </div>
      
      <Header />
      
      <main className="success-main">
        {/* Animated success checkmark */}
        <div className="success-icon">
          <div className="checkmark-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2>Message Scheduled</h2>
        <p>Your words have been saved for the future. Your message will be delivered at the scheduled time, ready to surprise your future self with thoughts from the past.</p>
        
        {/* Status message with confirmation details */}
        <div className="message-status">
          Successfully scheduled!
        </div>
        
        {/* Return home button */}
        <button 
          className="return-button"
          onClick={() => window.location.href = '/'}
        >
          Create Another Message
        </button>
      </main>
      
      <div className="success-footer">
        Thank you for using our service
      </div>
      
      <Footer />
    </div>
  );
}

export default Success;
