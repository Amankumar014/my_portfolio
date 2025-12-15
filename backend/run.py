"""
Simple run script for the backend
Alternative to main.py for quick testing
"""

from app import app

if __name__ == '__main__':
    print("🚀 Starting Portfolio Backend...")
    print("📡 Server: http://localhost:5000")
    print("⚠️  Press CTRL+C to stop\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)

