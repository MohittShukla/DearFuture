import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/FormSection.css'; // Importing the custom CSS

function FormSection() {
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [deliverDate, setDeliverDate] = useState(''); // NEW STATE
  const [email, setEmail] = useState('');

  // Pre-fill email if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setEmail(user.email);
    }
  }, [isAuthenticated, user]);

  const handleIntervalClick = (monthsToAdd) => {
    const today = new Date();
    today.setMonth(today.getMonth() + monthsToAdd);
    setDeliverDate(today.toISOString().split('T')[0]); // format as YYYY-MM-DD
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      message: e.target.message.value,
      email: email || e.target.email.value,
      deliverDate: deliverDate || e.target.deliverDate.value, // use state if set
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

      // Add authorization header if user is authenticated
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
        alert('Message sent successfully!');
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

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="message-box">
        <label>Words to your future self...</label>
        <p>
          The present is but a fleeting moment, slipping like sand through
          your fingers...
        </p>
        <textarea
          name="message"
          className="message-textarea"
          placeholder="As I write these words..."
          required
        />
      </div>

      <div className="reunion-details">
        <label>The reunion details...</label>
        <p>
          Choose when these words will find you again...
        </p>

        <div className="form-field">
          <label>When should these words find you again?</label>

          {/* ✅ Quick Interval Buttons */}
          <div className="quick-buttons">
            <button type="button" onClick={() => handleIntervalClick(1)}>+1 Month</button>
            <button type="button" onClick={() => handleIntervalClick(6)}>+6 Months</button>
            <button type="button" onClick={() => handleIntervalClick(12)}>+1 Year</button>
            <button type="button" onClick={() => handleIntervalClick(60)}>+5 Years</button>
          </div>

          {/* Controlled date input */}
          <input
            type="date"
            name="deliverDate"
            className="form-input"
            value={deliverDate}
            onChange={(e) => setDeliverDate(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Where will you be found?</label>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={isAuthenticated}
            style={isAuthenticated ? { backgroundColor: '#f7fafc', cursor: 'not-allowed' } : {}}
            required
          />
          {isAuthenticated && (
            <small style={{ color: '#718096', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
              Using your account email
            </small>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Sending...' : 'Send to the Future'}
        </button>
      </div>
    </form>
  );
}

export default FormSection;
