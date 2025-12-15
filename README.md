# Portfolio Website - Code_Sapiens_

A modern, responsive portfolio website built with React (frontend) and Python Flask (backend). Features dynamic animations, dark mode, and a real-time contact form.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Smooth Animations**: Powered by Framer Motion for elegant transitions
- **Dynamic Content**: All sections are interactive and animated
- **Contact Form**: Fully functional contact form with backend API
- **Portfolio Showcase**: Beautiful project gallery with Swiper carousel
- **Skills Section**: Interactive skill bars with animations
- **Testimonials**: Client testimonials carousel
- **SEO Optimized**: Clean semantic HTML and meta tags

## 📁 Project Structure

```
portfolio/
├── frontend/               # React frontend application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
│
├── backend/               # Python Flask backend
│   ├── app.py            # Main Flask application
│   ├── requirements.txt  # Python dependencies
│   └── README.md
│
└── assets/               # Images, PDFs, and other assets
    ├── img/
    ├── pdf/
    └── css/
```

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Framer Motion (animations)
- React Icons
- Swiper (carousels)
- Axios (API calls)

### Backend
- Python 3.8+
- Flask
- Flask-CORS

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8 or higher
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `frontend/src/index.css`:
```css
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #10b981;
  /* ... */
}
```

### Updating Content
- **Personal Info**: Edit component files in `frontend/src/components/`
- **Images**: Replace images in `assets/img/` directory
- **CV/Resume**: Replace PDF in `assets/pdf/` directory

### API Configuration
The frontend is configured to proxy requests to the backend. If deploying separately, update the API URLs in the frontend components.

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the production version:
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to your hosting service

### Backend (Heroku/Railway)
1. Add a `Procfile` for production:
```
web: gunicorn app:app
```

2. Install gunicorn:
```bash
pip install gunicorn
pip freeze > requirements.txt
```

3. Deploy to your hosting service

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1200px
- Large Desktop: > 1200px

## 🎯 API Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/portfolio` - Get portfolio projects
- `GET /api/skills` - Get skills data
- `GET /api/messages` - Get all messages (admin)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Aman Kumar Sah**
- Portfolio: [Code_Sapiens_]
- Role: Neural Networks Developer
- Specialization: AI/ML, Deep Learning, Data Science

## 🙏 Acknowledgments

- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Animations: [Framer Motion](https://www.framer.com/motion/)
- Fonts: [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
- Carousel: [Swiper](https://swiperjs.com/)

---

⭐ Star this repo if you find it helpful!

