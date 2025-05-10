import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/FormSection.css'; // Importing the custom CSS

function FormSection() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      message: e.target.message.value,
      email: e.target.email.value,
      deliverDate: e.target.deliverDate.value,
    };

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Date Validation (ensure it's in the future)
    const selectedDate = new Date(formData.deliverDate);
    const today = new Date();
    if (selectedDate < today) {
      setError('Please select a future date.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Handle success (e.g., show success message or navigate)
        alert('Message sent successfully!');
        navigate('/success'); // Assuming you have a success page
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
      {/* Left side: Message Box */}
      <div className="message-box">
        <label>Words to your future self...</label>
        <p>
          The present is but a fleeting moment, slipping like sand through
          your fingers. Write the words you wish your future self would
          remember when today is but a distant whisper.
        </p>
        <textarea
          name="message"
          className="message-textarea"
          placeholder="As I write these words, I wonder who I'll be when I read them again..."
          required
        />
      </div>

      {/* Right side: Date, Email, and Send Message */}
      <div className="reunion-details">
        <label>The reunion details...</label>
        <p>
          Choose when these words will find you again, like an old letter
          lost in time, waiting to be rediscovered.
        </p>

        <div className="form-field">
          <label>When should these words find you again?</label>
          <input
            type="date"
            name="deliverDate"
            className="form-input"
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
            required
          />
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Submit Button */}
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
