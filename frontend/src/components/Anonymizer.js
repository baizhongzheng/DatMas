import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Anonymizer.css';

function Anonymizer() {
  const [text, setText] = useState('');
  const [anonymizedText, setAnonymizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({
    names: true,
    organizations: true,
    locations: true,
    dates: true,
    emails: true,
    phones: true,
    ssn: true,
    credit_cards: true,
    urls: true,
    customRegex: '',
    customReplacement: '[CUSTOM]'
  });

  const handleOptionChange = (e) => {
    const { name, checked, value, type } = e.target;
    setOptions(prevOptions => ({
      ...prevOptions,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter some text to anonymize.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/anonymize`, {
        text,
        options
      });
      
      setAnonymizedText(response.data.anonymized_text);
    } catch (err) {
      console.error('Error anonymizing text:', err);
      setError(err.response?.data?.error || 'An error occurred while anonymizing the text.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setAnonymizedText('');
    setError(null);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(anonymizedText)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text:', err);
        alert('Failed to copy text to clipboard.');
      });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([anonymizedText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'anonymized-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="anonymizer">
      <div className="section-hero">
        <h2>Text Anonymization Tool</h2>
        <p>Protect sensitive information in your text by anonymizing personal identifiers, locations, and more.</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="anonymizer-container">
        <div className="input-section">
          <h3>Enter Text</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text containing sensitive information here..."
            rows={10}
          />
          
          <div className="options-section">
            <h3>Anonymization Options</h3>
            <div className="options-grid">
              <div className="option">
                <input
                  type="checkbox"
                  id="names"
                  name="names"
                  checked={options.names}
                  onChange={handleOptionChange}
                />
                <label htmlFor="names">Names</label>
              </div>
              
              <div className="option">
                <input
                  type="checkbox"
                  id="organizations"
                  name="organizations"
                  checked={options.organizations}
                  onChange={handleOptionChange}
                />
                <label htmlFor="organizations">Organizations</label>
              </div>
              
              <div className="option">
                <input
                  type="checkbox"
                  id="locations"
                  name="locations"
                  checked={options.locations}
                  onChange={handleOptionChange}
                />
                <label htmlFor="locations">Locations</label>
              </div>
              
              <div className="option">
                <input
                  type="checkbox"
                  id="dates"
                  name="dates"
                  checked={options.dates}
                  onChange={handleOptionChange}
                />
                <label htmlFor="dates">Dates & Times</label>
              </div>
              
              <div className="option">
                <input
                  type="checkbox"
                  id="emails"
                  name="emails"
                  checked={options.emails}
                  onChange={handleOptionChange}
                />
                <label htmlFor="emails">Email Addresses</label>
              </div>
              
              <div className="option">
                <input
                  type="checkbox"
                  id="phones"
                  name="phones"
                  checked={options.phones}
                  onChange={handleOptionChange}
                />
                <label htmlFor="phones">Phone Numbers</label>
              </div>
              
              <div className="option">
                <input
                  type="checkbox"
                  id="ssn"
                  name="ssn"
                  checked={options.ssn}
                  onChange={handleOptionChange}
                />
                <label htmlFor="ssn">Social Security Numbers</label>
              </div>
              
              <div className="option">
                <input
                  type="checkbox"
                  id="credit_cards"
                  name="credit_cards"
                  checked={options.credit_cards}
                  onChange={handleOptionChange}
                />
                <label htmlFor="credit_cards">Credit Card Numbers</label>
              </div>
              
              <div className="option">
                <input
                  type="checkbox"
                  id="urls"
                  name="urls"
                  checked={options.urls}
                  onChange={handleOptionChange}
                />
                <label htmlFor="urls">URLs</label>
              </div>
            </div>
            
            <div className="custom-regex">
              <h4>Custom Pattern (Advanced)</h4>
              <div className="custom-regex-input">
                <input
                  type="text"
                  name="customRegex"
                  value={options.customRegex}
                  onChange={handleOptionChange}
                  placeholder="Enter custom regex pattern..."
                />
                <input
                  type="text"
                  name="customReplacement"
                  value={options.customReplacement}
                  onChange={handleOptionChange}
                  placeholder="Replacement token..."
                />
              </div>
            </div>
          </div>
          
          <div className="button-group">
            <button 
              onClick={handleSubmit} 
              disabled={isLoading || !text.trim()} 
              className="btn-primary"
            >
              {isLoading ? 'Anonymizing...' : 'Anonymize Text'}
            </button>
            <button 
              onClick={handleClear} 
              className="btn-secondary"
            >
              Clear All
            </button>
          </div>
        </div>
        
        {anonymizedText && (
          <div className="output-section">
            <h3>Anonymized Result</h3>
            <div className="result-box">
              <pre>{anonymizedText}</pre>
            </div>
            <div className="button-group">
              <button 
                onClick={handleCopyToClipboard} 
                className="btn-secondary"
              >
                Copy to Clipboard
              </button>
              <button 
                onClick={handleDownload} 
                className="btn-secondary"
              >
                Download as Text File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Anonymizer; 