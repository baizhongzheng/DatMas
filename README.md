# DatMas - Data Masking Made Simple

DatMas is a web-based text anonymization tool designed to help users protect sensitive information in their text data. It uses natural language processing and pattern matching to identify and mask personal identifiers, locations, organizations, and other sensitive data.

## Features

- **Named Entity Recognition (NER):** Automatically detects and anonymizes names, organizations, locations, and dates.
- **Pattern Matching:** Identifies and masks email addresses, phone numbers, SSNs, credit card numbers, and URLs.
- **Custom Regex Support:** Define your own patterns for identifying sensitive information.
- **User-Friendly Interface:** Simple and intuitive web interface for easy anonymization.
- **No Data Storage:** All text processing happens client-side or in memory, with no storage of original text.
- **Download & Copy:** Easily download or copy the anonymized text for further use.

## Project Structure

- `frontend/`: React-based web interface
- `backend/`: Python Flask API for text processing

## Getting Started

### Prerequisites

- Node.js and npm for the frontend
- Python 3.8+ for the backend
- A virtual environment for Python packages

### Setting Up the Backend

1. Navigate to the backend directory:
```
cd backend
```

2. Create and activate a virtual environment:
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install the required packages:
```
pip install -r requirements.txt
```

4. Download the spaCy language model:
```
python -m spacy download en_core_web_sm
```

5. Run the Flask app:
```
python app.py
```

The backend server will be available at http://localhost:5000.

### Setting Up the Frontend

1. Navigate to the frontend directory:
```
cd frontend
```

2. Install the required packages:
```
npm install
```

3. Start the development server:
```
npm start
```

The frontend development server will be available at http://localhost:3000.

## API Endpoints

### Health Check

```
GET /api/health
```

### Anonymize Text

```
POST /api/anonymize
```

Request body:
```json
{
  "text": "The text to anonymize",
  "options": {
    "names": true,
    "organizations": true,
    "locations": true,
    "dates": true,
    "emails": true,
    "phones": true,
    "ssn": true,
    "credit_cards": true,
    "urls": true,
    "customRegex": "(optional custom regex pattern)",
    "customReplacement": "(optional custom replacement token)"
  }
}
```

## Deployment

The application can be deployed to:
- Frontend: Netlify or Vercel
- Backend: Heroku, DigitalOcean, or any platform supporting Python applications

## Security Considerations

- No persistent storage of original text data
- All processing is done in memory
- API endpoints are protected with CORS
- Rate limiting to prevent abuse

## License

This project is licensed under the MIT License - see the LICENSE file for details. 