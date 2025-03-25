# DatMas Backend

This is the backend for the DatMas text anonymization tool. It provides API endpoints for anonymizing text data.

## Setup

1. Create a virtual environment:
```
python -m venv venv
```

2. Activate the virtual environment:
```
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Download the spaCy model:
```
python -m spacy download en_core_web_sm
```

5. Create a `.env` file with the following content:
```
PORT=5000
FLASK_ENV=development
DEBUG=True
```

## Running the server

```
python app.py
```

The server will be available at http://localhost:5000.

## API Endpoints

### Health Check

```
GET /api/health
```

Returns a simple health check response to verify the server is running.

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

Response:
```json
{
  "anonymized_text": "The anonymized text",
  "replacements": [
    {
      "original": "John Doe",
      "replacement": "[PERSON]"
    }
  ]
}
``` 