// API Configuration
// Automatically uses Azure backend URL in production, localhost in development

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://self-portfolio-backend-e8crhzfza4cbg2bq.southeastasia-01.azurewebsites.net'
  : 'http://localhost:5000';

export default API_BASE_URL;

