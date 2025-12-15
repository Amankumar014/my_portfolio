# Portfolio Backend

Python Flask backend for the portfolio website.

## Features

- RESTful API endpoints
- Contact form handling
- Portfolio data management
- Skills and services data
- CORS enabled for frontend communication
- Static file serving

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file based on `.env.example`

5. Run the application:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/messages` - Get all messages (admin)

### Portfolio Data
- `GET /api/portfolio` - Get portfolio projects
- `GET /api/skills` - Get skills data

## Development

For development, the server runs with hot-reload enabled.

## Production

For production deployment:
1. Set `FLASK_ENV=production` in `.env`
2. Use a production WSGI server like Gunicorn
3. Configure a reverse proxy (nginx)
4. Set up a proper database (PostgreSQL/MySQL)
5. Configure email service for contact form

