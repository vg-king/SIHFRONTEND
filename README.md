# Health AI - Smart Healthcare Assistant 🏥🤖

A comprehensive React-based healthcare assistant application with AI-powered chat functionality, designed specifically for rural and semi-urban communities in India.

## 🌟 Features

### 🤖 AI-Powered Chat Interface
- **Real-time AI responses** from integrated ML backend
- **Multi-language support** (Hindi, Bengali, Tamil, Telugu, English)
- **Smart message handling** with typing indicators
- **File upload support** (images, documents)
- **Voice recording capabilities**
- **Scroll optimization** with smart auto-scroll behavior

### 🎨 Modern UI/UX
- **Responsive design** optimized for mobile and desktop
- **Gradient backgrounds** with modern aesthetic
- **Smooth animations** using Framer Motion
- **Accessible interface** with proper contrast and typography
- **Touch-friendly** controls for mobile devices

### 🏥 Healthcare Features
- **Symptom checker** with AI-powered diagnosis assistance
- **Vaccination tracking** with government database integration
- **Preventive care advice** and health tips
- **Disease outbreak alerts** and notifications
- **Multilingual health information** delivery

### 🔧 Technical Features
- **API integration** with ML backend (`https://592ced580b89.ngrok-free.app/rag`)
- **CORS handling** with Vite proxy configuration
- **Error handling** with fallback responses
- **Real-time chat** with message persistence
- **Progressive Web App** capabilities

## 🚀 Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Markdown**: React Markdown for rich text rendering
- **API**: RESTful integration with ML backend
- **Deployment**: Vercel-ready configuration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vg-king/SIHFRONTEND.git
   cd SIHFRONTEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### API Integration
The application is configured to work with your ML backend:
- **Endpoint**: `https://592ced580b89.ngrok-free.app/rag`
- **Proxy**: Configured in `vite.config.js` for CORS handling
- **Fallback**: Error handling with healthcare emergency information

## 📱 Usage

### Chat Interface
1. Navigate to the Health Assistant section
2. Type your health-related questions
3. Get AI-powered responses from the ML backend
4. Upload files or use voice input for detailed queries

### Features Available
- **Symptom Analysis**: "What are the symptoms of dengue?"
- **Vaccination Info**: "When is my next vaccination due?"
- **Preventive Care**: "How to prevent seasonal flu?"
- **Emergency Guidance**: Built-in emergency contact information

## 🎯 Target Audience

- **Rural communities** with limited healthcare access
- **Semi-urban populations** seeking reliable health information
- **Healthcare workers** needing quick reference tools
- **Government health programs** for community outreach

## 🌐 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Deploy with default settings
3. The `vercel.json` configuration handles routing

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure server for SPA routing

## 📋 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatInput.jsx   # Chat input with file upload
│   ├── ChatInterface.jsx # Main chat display
│   ├── WelcomeScreen.jsx # Landing page
│   └── ui/             # Base UI components
├── pages/              # Application pages
│   ├── ChatPage.jsx    # Main chat functionality
│   ├── HomePage.jsx    # Welcome and navigation
│   └── ...            # Other feature pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

---

**Built with ❤️ for healthier communities across India** 🇮🇳
