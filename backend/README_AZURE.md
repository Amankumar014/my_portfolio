# Azure App Service Deployment Guide

This guide explains how to deploy this Flask backend to Azure App Service.

## Prerequisites

- Azure account (student account works)
- Azure CLI installed (optional, for CLI deployment)
- Your backend code ready

## Files Created for Azure Deployment

1. **startup.sh** - Startup script for Azure App Service
   - Installs dependencies
   - Runs Gunicorn server

2. **.deployment** - Deployment configuration
   - Enables build during deployment

3. **requirements.txt** - Updated with Gunicorn

4. **app.py** - Updated to handle Azure port configuration

5. **config.py** - Updated to use `/home` directory for SQLite

## Azure Configuration

### 1. Create App Service

- Go to Azure Portal
- Create a new Web App
- Choose Linux OS
- Python 3.11 runtime
- Free tier (F1)

### 2. Configure Application Settings

In Azure Portal → Your App Service → Configuration → Application settings:

Add these environment variables:
- `SCM_DO_BUILD_DURING_DEPLOYMENT` = `true`
- `ENABLE_ORYX_BUILD` = `true`
- `FLASK_ENV` = `production`
- `SECRET_KEY` = (generate a strong secret key)
- `ANAM_API_KEY` = (your Anam API key, if using)
- `ANAM_VOICE_ID` = (your voice ID, if using)
- `ANAM_AVATAR_ID` = (your avatar ID, if using)
- `ANAM_LLM_ID` = (your LLM ID, if using)

### 3. Configure Startup Command

In Azure Portal → Your App Service → Configuration → General settings:

Startup Command:
```
gunicorn --bind 0.0.0.0:8000 --workers 2 --timeout 120 --access-logfile - --error-logfile - app:app
```

### 4. Deploy Code

#### Option A: Azure CLI
```bash
cd backend
az webapp up --name yourname-portfolio-backend --resource-group your-resource-group --runtime "PYTHON:3.11" --sku FREE
```

#### Option B: VS Code Extension
- Install "Azure App Service" extension
- Right-click backend folder → Deploy to Web App

#### Option C: GitHub Actions
- Push code to GitHub
- In Azure Portal → Deployment Center → Connect GitHub

## Important Notes

### SQLite Database Location
- On Azure: Database files are stored in `/home` directory (writable)
- Local: Database files are in the project directory
- The code automatically detects the environment

### File Uploads
- On Azure: Uploads go to `/home/files`
- Local: Uploads go to `../files`

### Port Configuration
- Azure provides PORT environment variable
- Gunicorn uses port 8000 (configured in startup command)
- Local development uses port 5000

## Testing

After deployment, test your API:

1. Health check:
   ```
   https://yourname-portfolio-backend.azurewebsites.net/api/health
   ```

2. Portfolio data:
   ```
   https://yourname-portfolio-backend.azurewebsites.net/api/portfolio
   ```

## Troubleshooting

### App not starting
- Check Log stream in Azure Portal
- Verify startup command is correct
- Check that Gunicorn is in requirements.txt

### 500 errors
- Check Log stream for Python errors
- Verify environment variables are set
- Check all dependencies are in requirements.txt

### Database issues
- Ensure `/home` directory exists (created automatically)
- Check file permissions
- Review logs for SQLite errors

## Cost

- App Service Free tier: $0 (does not use student credits)
- Limitations: App sleeps after 20 minutes of inactivity
- Cold start: First request after sleep may take 30-60 seconds

