from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import asyncio
from datetime import datetime
from pathlib import Path

# Import chatbot functions
try:
    from chatbot import (
        ask_chatbot_langgraph,
        initialize_chatbot_at_startup,
        check_status_langgraph,
        rebuild_index_langgraph
    )
    CHATBOT_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Chatbot not available: {e}")
    CHATBOT_AVAILABLE = False

# Email service
try:
    from email_service import send_contact_email
    EMAIL_AVAILABLE = True
except Exception as e:
    print(f"Warning: Email service not available: {e}")
    EMAIL_AVAILABLE = False

# Initialize Flask app
app = Flask(__name__, static_folder='../frontend/build', static_url_path='')

# Enable CORS
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configuration
app.config['JSON_SORT_KEYS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Configure upload folder for files
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '../files')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# In-memory storage for contact messages (use database in production)
contact_messages = []

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'project', 'message']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Create message object
        message = {
            'id': len(contact_messages) + 1,
            'name': data['name'],
            'email': data['email'],
            'project': data['project'],
            'message': data['message'],
            'timestamp': datetime.now().isoformat()
        }
        
        # Store message
        contact_messages.append(message)
        
        email_sent = False
        email_error = None
        if EMAIL_AVAILABLE:
            try:
                send_contact_email(message)
                email_sent = True
            except Exception as e:
                email_error = str(e)
                print(f"Email send failed: {e}")
        
        return jsonify({
            'success': True,
            'message': 'Message received successfully!',
            'data': message,
            'email_sent': email_sent,
            'email_error': email_error if email_error else None
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': f'Internal server error: {str(e)}'
        }), 500

@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Get all contact messages (admin endpoint)"""
    return jsonify({
        'success': True,
        'count': len(contact_messages),
        'messages': contact_messages
    }), 200

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    """Get portfolio projects"""
    projects = [
        {
            'id': 1,
            'title': 'Object Detection System',
            'description': 'Advanced computer vision system using YOLO and TensorFlow for real-time object detection and tracking.',
            'technologies': ['Python', 'TensorFlow', 'YOLO', 'OpenCV'],
            'image': '/files/img/portfolio1.jpg',
            'github': 'https://github.com',
            'demo': 'https://demo.com'
        },
        {
            'id': 2,
            'title': 'Machine Learning Pipeline',
            'description': 'End-to-end ML pipeline for predictive analytics with automated feature engineering and model selection.',
            'technologies': ['Python', 'Scikit-learn', 'Pandas', 'MLOps'],
            'image': '/files/img/portfolio2.jpg',
            'github': 'https://github.com',
            'demo': 'https://demo.com'
        },
        {
            'id': 3,
            'title': 'Deep Learning Framework',
            'description': 'Custom neural network framework built from scratch demonstrating understanding of backpropagation.',
            'technologies': ['Python', 'NumPy', 'Neural Networks'],
            'image': '/files/img/portfolio3.jpg',
            'github': 'https://github.com',
            'demo': 'https://demo.com'
        }
    ]
    
    return jsonify({
        'success': True,
        'count': len(projects),
        'projects': projects
    }), 200

@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Get skills data"""
    skills = {
        'frontend': [
            {'name': 'HTML', 'percentage': 90},
            {'name': 'CSS', 'percentage': 85},
            {'name': 'JavaScript', 'percentage': 80},
            {'name': 'React', 'percentage': 75}
        ],
        'backend': [
            {'name': 'Python', 'percentage': 92},
            {'name': 'Flask', 'percentage': 70},
            {'name': 'Django', 'percentage': 85},
            {'name': 'MySQL', 'percentage': 80}
        ],
        'ai': [
            {'name': 'Neural Networks', 'percentage': 92},
            {'name': 'Data Science', 'percentage': 88},
            {'name': 'Deep Learning', 'percentage': 85},
            {'name': 'NLP', 'percentage': 75}
        ]
    }
    
    return jsonify({
        'success': True,
        'skills': skills
    }), 200

# ==============================================================================
# CHATBOT ENDPOINTS
# ==============================================================================

@app.route('/api/chatbot/status', methods=['GET'])
def chatbot_status():
    """Check chatbot status"""
    if not CHATBOT_AVAILABLE:
        return jsonify({
            'status': 'unavailable',
            'message': 'Chatbot module not available'
        }), 503
    
    try:
        status = check_status_langgraph()
        return jsonify({
            'success': True,
            **status
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/chatbot/ask', methods=['POST'])
def chatbot_ask():
    """Ask the chatbot a question"""
    if not CHATBOT_AVAILABLE:
        return jsonify({
            'success': False,
            'error': 'Chatbot module not available'
        }), 503
    
    try:
        data = request.get_json()
        
        if not data or 'question' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing required field: question'
            }), 400
        
        question = data['question'].strip()
        if not question:
            return jsonify({
                'success': False,
                'error': 'Question cannot be empty'
            }), 400
        
        thread_id = data.get('thread_id', 'default')
        
        # Run async function - handle event loop properly
        try:
            loop = asyncio.get_event_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
        
        result = loop.run_until_complete(ask_chatbot_langgraph(question, thread_id))
        
        return jsonify({
            'success': True,
            **result
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/chatbot/rebuild', methods=['POST'])
def chatbot_rebuild():
    """Rebuild the chatbot index"""
    if not CHATBOT_AVAILABLE:
        return jsonify({
            'success': False,
            'error': 'Chatbot module not available'
        }), 503
    
    try:
        result = rebuild_index_langgraph()
        return jsonify({
            'success': True,
            **result
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Serve static files
@app.route('/files/<path:path>')
def serve_files(path):
    """Serve static files"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], path)

# Serve React app (catch-all route for React Router)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    """Serve React application"""
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    # Create upload folder if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Initialize chatbot at startup (optional - can be lazy loaded)
    if CHATBOT_AVAILABLE:
        try:
            print("Initializing chatbot...")
            initialize_chatbot_at_startup()
        except Exception as e:
            print(f"Warning: Failed to initialize chatbot at startup: {e}")
            print("Chatbot will be initialized on first request")
    
    # Run the application
    app.run(debug=True, host='0.0.0.0', port=5000)

