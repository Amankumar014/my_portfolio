"""
Configuration settings for the Flask application
"""

import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent
ROOT_DIR = BASE_DIR.parent

class Config:
    """Base configuration"""
    
    # Flask settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = False
    TESTING = False
    
    # Application settings
    APP_NAME = 'Portfolio Backend'
    APP_VERSION = '1.0.0'
    
    # CORS settings
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')
    
    # Upload settings
    UPLOAD_FOLDER = ROOT_DIR / 'assets'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # API settings
    API_PREFIX = '/api'
    API_VERSION = 'v1'
    
    # Database settings (for future use)
    # Use /home directory on Azure App Service, local path for development
    if os.path.exists('/home'):
        # Azure App Service - use /home directory (writable)
        DATABASE_URL = f'sqlite:////home/portfolio.db'
    else:
        # Local development
        DATABASE_URL = os.getenv('DATABASE_URL', f'sqlite:///{BASE_DIR}/portfolio.db')
    
    # Email settings (for contact form)
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', '')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', '')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', 'noreply@portfolio.com')

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    DEVELOPMENT = True
    
class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    PRODUCTION = True
    # In production, these should be set via environment variables
    SECRET_KEY = os.getenv('SECRET_KEY')
    
class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = True
    
# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

def get_config(env=None):
    """Get configuration based on environment"""
    if env is None:
        env = os.getenv('FLASK_ENV', 'development')
    return config.get(env, config['default'])

