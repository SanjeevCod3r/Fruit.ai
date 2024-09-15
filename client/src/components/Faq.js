import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Faq.css';  // Make sure this path is correct

function Faq() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        //const response = await axios.get('http://localhost:8000/api/faqs');
        const response = await axios.get('https://fruitai-server3.onrender.com/api/faqs/');
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.length === 0 ? (
          <p>No FAQs available</p>
        ) : (
          faqs.map(faq => (
            <div className="faq-card" key={faq.id}>
              <img
                src='/fruit.jpg'
                alt="FAQ"
              />
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Faq;
