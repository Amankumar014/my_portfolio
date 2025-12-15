#!/usr/bin/env python3
"""
Portfolio Backend - Main Entry Point
Initializes and runs the Flask application
"""

import os
import sys
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from app import app

def initialize():
    """Initialize the application"""
    print("=" * 50)
    print("  Portfolio Backend Server")
    print("=" * 50)
    print(f"Python Version: {sys.version.split()[0]}")
    print(f"Working Directory: {os.getcwd()}")
    print(f"Backend Directory: {backend_dir}")
    print("=" * 50)
    
    # Create necessary directories
    upload_folder = backend_dir.parent / 'files'
    if not upload_folder.exists():
        upload_folder.mkdir(parents=True, exist_ok=True)
        print(f"✓ Created files directory: {upload_folder}")
    
    # Check if running in development or production
    env = os.getenv('FLASK_ENV', 'development')
    debug_mode = env == 'development'
    
    print(f"Environment: {env}")
    print(f"Debug Mode: {debug_mode}")
    print("=" * 50)
    
    return debug_mode

def run_server():
    """Run the Flask development server"""
    debug_mode = initialize()
    
    print("\n🚀 Starting Flask Server...")
    print("📡 Backend API: http://localhost:5000")
    print("🔍 Health Check: http://localhost:5000/api/health")
    print("\nAPI Endpoints:")
    print("  - GET  /api/health")
    print("  - POST /api/contact")
    print("  - GET  /api/messages")
    print("  - GET  /api/portfolio")
    print("  - GET  /api/skills")
    print("\n⚠️  Press CTRL+C to stop the server\n")
    print("=" * 50)
    
    try:
        # Run the Flask app
        app.run(
            host='0.0.0.0',
            port=5000,
            debug=debug_mode,
            use_reloader=debug_mode
        )
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped by user")
        print("=" * 50)
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == '__main__':
    run_server()

