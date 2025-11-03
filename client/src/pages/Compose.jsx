import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormSection from '../components/FormSection';
import '../styles/Compose.css';
import '../styles/theme.css';

function Compose() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="compose-page">
      <div className="compose-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      <Header />
      <main className="compose-main">
        <div className="container">
          <div className="compose-header fade-in">
            <h1>Create a Message</h1>
            <p>Send a message to your future self</p>
          </div>
          <FormSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Compose;
