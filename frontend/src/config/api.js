// API Configuration
// Automatically uses Azure backend URL in production, localhost in development

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://aman-website-backend-dsaqhtd7fsgcdae7.indiasouthcentral-01.azurewebsites.net'
  : 'http://localhost:5000';

export default API_BASE_URL;

