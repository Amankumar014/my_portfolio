# Frontend-Backend Connection Guide

## ✅ Changes Made

### 1. API Configuration
- Created `frontend/src/config/api.js`
- Automatically uses Azure backend URL in production
- Uses localhost in development

### 2. Updated Components
- **Contact.js**: Updated to use `${API_BASE_URL}/api/contact`
- **Chatbot.js**: Updated to use `${API_BASE_URL}/api/chatbot/ask`
- **AnamVoiceAssistant.js**: Updated to use `${API_BASE_URL}/api/session-token`

### 3. Backend CORS
- Backend CORS is configured to allow all origins (`*`)
- This allows your frontend to connect from any domain

## 🔗 URLs

### Backend (Azure App Service)
```
https://self-portfolio-backend-e8crhzfza4cbg2bq.southeastasia-01.azurewebsites.net
```

### Frontend (Azure Static Web Apps)
```
https://your-frontend-url.azurestaticapps.net
```
*(Replace with your actual Static Web App URL)*

## 🚀 Deployment Steps

### 1. Rebuild Frontend
```bash
cd frontend
npm run build
```

### 2. Deploy Frontend to Azure Static Web Apps
```bash
swa deploy ./build --deployment-token YOUR_TOKEN --app-name YOUR_APP_NAME
```

### 3. Test Connection
- Open your frontend URL
- Test the contact form
- Test the chatbot (if enabled)
- Test the voice assistant (if configured)

## ✅ What Works

- ✅ Contact form → Backend API
- ✅ Chatbot → Backend API (if enabled)
- ✅ Voice Assistant → Backend API (if configured)
- ✅ CORS configured for cross-origin requests

## ⚠️ Notes

- Chatbot is currently disabled (commented out in requirements.txt) due to Free tier disk space limits
- Frontend will automatically use the correct backend URL based on environment
- All API calls now use the centralized `API_BASE_URL` configuration

## 🔧 Troubleshooting

### If API calls fail:
1. Check browser console for CORS errors
2. Verify backend URL in `frontend/src/config/api.js`
3. Check backend CORS settings in `backend/app.py`
4. Verify backend is running in Azure Portal

### If 404 errors:
- Make sure you're using the correct backend URL
- Check that routes are defined in `backend/app.py`
- Verify the endpoint path matches exactly

