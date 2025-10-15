# 🚀 Future - Personal Life Management App

<div align="center">

![Expo SDK](https://img.shields.io/badge/Expo%20SDK-49-4630EB?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.72-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Platform](https://img.shields.io/badge/Platform-Android%2015-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

**A premium, industry-standard React Native app that transforms how you manage your personal life** 📱✨

*Built with modern architecture, cyberpunk aesthetics, and enterprise-level security*

</div>

## 🌟 What Makes Future Special?

Future isn't just another productivity app - it's your **personal command center** designed with the precision of enterprise software and the beauty of premium design. Every pixel has been crafted to deliver an experience that's both powerful and delightful.

### ✨ Key Highlights
- 🎨 **Stunning Cyberpunk UI** - Animated backgrounds with dual theme support
- 🔐 **Bank-Level Security** - PIN + Biometric authentication
- 📊 **Smart Analytics** - AI-powered insights across all life areas
- 🎯 **Goal Achievement** - Gamified progress tracking with XP system
- 💰 **M-Pesa Integration** - Seamless financial management for Kenya
- 🧘 **Wellness Focus** - Mood tracking, mindfulness, and mental health
- 📱 **Native Performance** - Optimized for Android 15 with 60fps animations

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio or Android device

### Installation

```bash
# Clone the repository
git clone https://github.com/Wheezy72/future.git
cd future

# Install dependencies
npm install

# Start the development server
npm run start

# Or run directly on Android
npm run android
```

### 🎯 First Launch
1. **Set up security** - Create your PIN and enable biometrics
2. **Choose your theme** - Light or dark cyberpunk aesthetic
3. **Start tracking** - Add your first goal, expense, or journal entry
4. **Explore features** - Discover all the powerful tools at your fingertips

---

## 🏗️ Architecture & Tech Stack

<div align="center">

| Category | Technology | Purpose |
|----------|------------|----------|
| 🎯 **Core** | Expo SDK 49 | Cross-platform development |
| 🧭 **Navigation** | Expo Router v3 | File-based routing system |
| 🎨 **Animations** | React Native Reanimated | 60fps smooth animations |
| 💾 **Storage** | AsyncStorage + SecureStore | Data persistence & security |
| 🔐 **Security** | LocalAuthentication | Biometric authentication |
| 📁 **Files** | FileSystem | Backup/restore functionality |
| 🎵 **Feedback** | Haptics | Tactile user interactions |

</div>

### 📂 Project Structure

```
future/
├── 📱 app/                    # Expo Router screens & navigation
│   ├── (tabs)/               # Tab-based navigation
│   │   ├── home.jsx          # Dashboard & achievements
│   │   ├── finance.jsx       # Money management
│   │   ├── wellness.jsx      # Health & mindfulness
│   │   ├── goals-journal.jsx # Goals & diary
│   │   └── settings.jsx      # Configuration
│   ├── _layout.jsx           # Root layout with themes
│   ├── index.jsx             # Welcome/entry screen
│   └── pin-entry.jsx         # Security authentication
├── 🧩 src/                   # Feature modules
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── services/             # Business logic & APIs
│   ├── screens/              # Screen-specific components
│   ├── constants/            # Theme & configuration
│   └── utils/                # Helper functions
└── 🎨 assets/                # Static resources
    ├── fonts/                # Custom cyberpunk fonts
    └── images/               # Icons & graphics
```

---

## 🎨 Features Overview

### 🏠 **Home Dashboard**
- **Real-time Analytics** - Live updates on all your metrics
- **Achievement System** - Unlock badges and level up with XP
- **Quick Stats** - At-a-glance view of your progress
- **Smart Recommendations** - AI-powered suggestions for improvement

### 💰 **Finance Management**
- **M-Pesa Integration** - Parse SMS transactions automatically
- **Smart Categorization** - AI-powered expense categorization
- **Budget Tracking** - Set limits and get real-time alerts
- **Savings Goals** - Visualize and achieve financial targets
- **Analytics Dashboard** - Beautiful charts and insights

### 🧘 **Wellness & Mindfulness**
- **Mood Tracking** - Log emotions with intuitive interfaces
- **Mindfulness Timer** - Guided meditation and breathing exercises
- **Habit Streaks** - Build positive routines with gamification
- **Mental Health Insights** - Track patterns and progress

### 🎯 **Goals & Journal**
- **Smart Goal Setting** - SMART framework with progress tracking
- **Rich Text Journal** - Express yourself with formatting options
- **Calendar Integration** - Timeline view of your journey
- **Progress Analytics** - Visualize your growth over time
- **Achievement Rewards** - Celebrate milestones with XP and badges

### ⚙️ **Settings & Security**
- **Theme Customization** - Light/dark modes with smooth transitions
- **Advanced Security** - PIN + biometric multi-factor authentication
- **Backup & Restore** - Secure cloud synchronization
- **Notification Control** - Smart reminders and alerts
- **Privacy Controls** - Granular data management

---

## 🔐 Security Features

Your privacy and security are our top priorities:

- 🔒 **Encrypted Storage** - All sensitive data encrypted at rest
- 📱 **Biometric Authentication** - Fingerprint/face unlock support
- 🔑 **PIN Protection** - Secure numeric passcode system
- 🚫 **No Cloud Dependencies** - Your data stays on your device
- 🔄 **Secure Backups** - Optional encrypted backup functionality

---

## 🎨 Design Philosophy

### Cyberpunk Aesthetics
- **Neon Color Palette** - Electric blues, magentas, and oranges
- **Premium Typography** - Custom Orbitron, Rajdhani, and ShareTechMono fonts
- **Glass Morphism** - Frosted glass effects and transparency
- **Smooth Animations** - 60fps transitions and micro-interactions

### Accessibility First
- **High Contrast** - WCAG AA compliant color schemes
- **Haptic Feedback** - Tactile responses for better UX
- **Scalable Fonts** - Respects system accessibility settings
- **Intuitive Navigation** - Clear visual hierarchy and flow

---

## 📱 Platform Optimization

### Android 15 Features
- **Material You** - Dynamic color theming support
- **Edge-to-Edge** - Immersive full-screen experience
- **Performance** - Optimized for 120Hz displays
- **Battery Efficiency** - Smart background processing

---

## 🛠️ Development

### Available Scripts

```bash
npm run start          # Start Expo development server
npm run android        # Run on Android device/emulator
npm run ios           # Run on iOS device/simulator (future)
npm run web           # Run in web browser
npm run lint          # Run ESLint code analysis
```

### Development Guidelines
- **Code Style** - ESLint configuration with React Native best practices
- **Component Structure** - Modular, reusable components
- **Performance** - Optimized rendering with React.memo and callbacks
- **Testing** - Comprehensive test coverage (coming soon)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 **Fork the repository**
2. 🌟 **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. 📤 **Push to the branch** (`git push origin feature/amazing-feature`)
5. 🔄 **Open a Pull Request**

### Development Setup
```bash
# Clone your fork
git clone https://github.com/your-username/future.git
cd future

# Add upstream remote
git remote add upstream https://github.com/Wheezy72/future.git

# Install dependencies
npm install

# Start development
npm run start
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Expo Team** - For the amazing development platform
- **React Native Community** - For the incredible ecosystem
- **Design Inspiration** - Cyberpunk 2077, Tron, and modern fintech apps
- **Font Providers** - Google Fonts for the beautiful typography

---

<div align="center">

**Built with ❤️ in Nairobi, Kenya** 🇰🇪

*Transforming personal productivity, one pixel at a time*

---

[![Made with Expo](https://img.shields.io/badge/Made%20with-Expo-4630EB?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev)
[![Built with React Native](https://img.shields.io/badge/Built%20with-React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev)
[![Powered by Love](https://img.shields.io/badge/Powered%20by-Love-red?style=for-the-badge&logo=heart&logoColor=white)](https://github.com/Wheezy72)

</div>