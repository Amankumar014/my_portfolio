# Portfolio Frontend

Modern React frontend for the portfolio website with smooth animations and responsive design.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📦 Dependencies

- **react**: UI library
- **react-router-dom**: Routing
- **framer-motion**: Animations
- **react-icons**: Icon library
- **swiper**: Touch slider
- **axios**: HTTP client

## 🎨 Components

### Layout Components
- `Header.js` - Navigation bar with theme toggle
- `Footer.js` - Footer with social links
- `ScrollToTop.js` - Scroll to top button

### Section Components
- `Home.js` - Hero section
- `About.js` - About me section
- `Skills.js` - Skills with animated progress bars
- `Qualification.js` - Education and work timeline
- `Services.js` - Services offered with modal details
- `Portfolio.js` - Project showcase with carousel
- `Testimonials.js` - Client testimonials
- `Contact.js` - Contact form

## 🎯 Features

- Fully responsive design
- Dark/Light mode toggle
- Smooth scroll animations
- Interactive UI elements
- Form validation
- SEO optimized

## 🔧 Configuration

### API Proxy
The `package.json` includes a proxy configuration:
```json
"proxy": "http://localhost:5000"
```

This allows the frontend to make API calls to the backend during development.

### Environment Variables
Create a `.env` file for environment-specific configuration:
```
REACT_APP_API_URL=http://localhost:5000
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 480px
- Tablet: 481-768px
- Desktop: > 768px

## 🎨 Theming

The application supports light and dark themes. Theme preference is saved to localStorage.

## 🚀 Build & Deploy

```bash
# Create production build
npm run build

# The build folder is ready to be deployed
# You can serve it with any static hosting service
```

## 📄 Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Code Structure

```
src/
├── components/       # React components
├── App.js           # Main app component
├── App.css          # Global app styles
├── index.js         # Entry point
└── index.css        # Global styles
```

## 🎯 Best Practices

- Components are modular and reusable
- CSS is scoped to components
- Animations are performance-optimized
- Images are lazy-loaded
- Code is properly commented

