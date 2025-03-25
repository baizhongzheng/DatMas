import os
import re
import spacy
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Load spaCy NER model
nlp = spacy.load("en_core_web_sm")

# Regular expression patterns for various sensitive data
patterns = {
    "email": r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
    "phone": r'\b(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b',
    "ssn": r'\b\d{3}-\d{2}-\d{4}\b',
    "credit_card": r'\b(?:\d{4}[- ]?){3}\d{4}\b',
    "url": r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+',
}

def anonymize_text(text, options):
    """
    Anonymize text based on selected options
    """
    # Copy the original text
    anonymized_text = text
    replacements = []
    
    # Use spaCy for Named Entity Recognition
    if any(options.get(key, False) for key in ["names", "organizations", "locations", "dates"]):
        doc = nlp(text)
        
        # Create a list of entities to replace
        entities = []
        for ent in doc.ents:
            if ent.label_ == "PERSON" and options.get("names", False):
                entities.append((ent.start_char, ent.end_char, "[PERSON]"))
            elif ent.label_ == "ORG" and options.get("organizations", False):
                entities.append((ent.start_char, ent.end_char, "[ORGANIZATION]"))
            elif ent.label_ == "GPE" and options.get("locations", False):
                entities.append((ent.start_char, ent.end_char, "[LOCATION]"))
            elif ent.label_ == "DATE" and options.get("dates", False):
                entities.append((ent.start_char, ent.end_char, "[DATE]"))
            elif ent.label_ == "TIME" and options.get("dates", False):
                entities.append((ent.start_char, ent.end_char, "[TIME]"))
        
        # Sort entities in reverse order by start position to avoid index issues when replacing
        entities.sort(key=lambda x: x[0], reverse=True)
        
        # Replace entities in the text
        for start, end, replacement in entities:
            original = text[start:end]
            anonymized_text = anonymized_text[:start] + replacement + anonymized_text[end:]
            replacements.append({"original": original, "replacement": replacement})
    
    # Use regex for other patterns
    if options.get("emails", False):
        for match in re.finditer(patterns["email"], text):
            original = match.group(0)
            anonymized_text = anonymized_text.replace(original, "[EMAIL]")
            replacements.append({"original": original, "replacement": "[EMAIL]"})
    
    if options.get("phones", False):
        for match in re.finditer(patterns["phone"], text):
            original = match.group(0)
            anonymized_text = anonymized_text.replace(original, "[PHONE]")
            replacements.append({"original": original, "replacement": "[PHONE]"})
    
    if options.get("ssn", False):
        for match in re.finditer(patterns["ssn"], text):
            original = match.group(0)
            anonymized_text = anonymized_text.replace(original, "[SSN]")
            replacements.append({"original": original, "replacement": "[SSN]"})
    
    if options.get("credit_cards", False):
        for match in re.finditer(patterns["credit_card"], text):
            original = match.group(0)
            anonymized_text = anonymized_text.replace(original, "[CREDIT_CARD]")
            replacements.append({"original": original, "replacement": "[CREDIT_CARD]"})
    
    if options.get("urls", False):
        for match in re.finditer(patterns["url"], text):
            original = match.group(0)
            anonymized_text = anonymized_text.replace(original, "[URL]")
            replacements.append({"original": original, "replacement": "[URL]"})
    
    # Custom regex if provided
    if options.get("customRegex"):
        try:
            custom_pattern = re.compile(options["customRegex"])
            for match in re.finditer(custom_pattern, text):
                original = match.group(0)
                custom_replacement = options.get("customReplacement", "[CUSTOM]")
                anonymized_text = anonymized_text.replace(original, custom_replacement)
                replacements.append({"original": original, "replacement": custom_replacement})
        except re.error:
            # Invalid regex pattern
            pass
    
    return anonymized_text, replacements

@app.route('/api/anonymize', methods=['POST'])
def api_anonymize():
    """
    API endpoint for anonymizing text
    """
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.get_json()
    
    if "text" not in data:
        return jsonify({"error": "No text provided"}), 400
    
    text = data["text"]
    options = data.get("options", {})
    
    anonymized_text, replacements = anonymize_text(text, options)
    
    return jsonify({
        "anonymized_text": anonymized_text,
        "replacements": replacements
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 