import React from 'react';
import '../styles/Home.css';

function TestimonialsSection() {
  const testimonials = [
    {
      text: "Reading a message from my past self was like time travel. It's amazing to see how much I've grown and what goals I've achieved.",
      name: "Sarah M.",
      title: "Student",
      initial: "S"
    },
    {
      text: "I sent myself a message during a difficult time, and receiving it a year later was incredibly powerful. It reminded me of my strength and resilience.",
      name: "David L.",
      title: "Designer",
      initial: "D"
    },
    {
      text: "This app helped me preserve my thoughts during a major life transition. Now I have a permanent record of that significant moment.",
      name: "Emma R.",
      title: "Teacher",
      initial: "E"
    }
  ];

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">What People Are Saying</h2>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {testimonial.initial}
              </div>
              <div className="testimonial-info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
