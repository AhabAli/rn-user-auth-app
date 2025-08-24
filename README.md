# 🔐 React Native User Authentication App

A robust, production-ready React Native mobile application with comprehensive user authentication, built using modern best practices and cutting-edge technologies.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000000?style=for-the-badge&logo=expo&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3B82F6?style=for-the-badge&logo=zod&logoColor=white)

## ✨ Features

### 🔑 **Authentication System**
- **User Registration** - Create new accounts with email, name, and password
- **User Login** - Secure authentication with existing credentials
- **Multi-User Support** - Store and manage multiple user accounts
- **Token-Based Auth** - Simple session tokens for authentication state
- **Persistent Sessions** - Stay logged in across app restarts

### 🛡️ **Security & Validation**
- **Zod Schema Validation** - Type-safe form validation with detailed error messages
- **Password Security** - Secure password storage and validation
- **Input Sanitization** - Clean and validate all user inputs
- **Error Handling** - Comprehensive error management and user feedback

### 🎨 **User Interface**
- **Modern Design** - Clean, intuitive interface with Material Design principles
- **Responsive Layout** - Optimized for all device sizes and orientations
- **Password Visibility Toggle** - Eye icon to show/hide passwords
- **Loading States** - Smooth loading indicators and disabled states
- **Error Display** - Clear error messages with visual indicators

### 🚀 **Navigation & Routing**
- **Expo Router** - File-based routing with native performance
- **Protected Routes** - Automatic route protection based on authentication status
- **Route Groups** - Organized routing with `(auth)` group for authentication screens
- **Deep Linking** - Support for deep linking and navigation

### 💾 **Data Persistence**
- **AsyncStorage** - Local data persistence for offline functionality
- **User Data Management** - Store user profiles, credentials, and session tokens
- **Multi-User Storage** - Efficient storage of multiple user accounts

## 🛠️ Tech Stack

### **Core Framework**
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript development
- **Expo** - Development platform and build tools

### **Authentication & State Management**
- **React Context API** - Global state management for authentication
- **AsyncStorage** - Local data persistence
- **Custom Hooks** - Reusable authentication logic

### **Form Management & Validation**
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Zod integration with React Hook Form

### **Navigation & Routing**
- **Expo Router** - File-system based routing
- **Stack Navigation** - Native navigation with protected routes

### **UI Components & Icons**
- **React Native Components** - Native UI components
- **SafeAreaView** - Cross-platform safe area handling
- **Lucide React Native** - Beautiful, consistent iconography

### **Development Tools**
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **TypeScript Compiler** - Static type checking

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Emulator

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rn-user-auth-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   # or
   expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

### **Project Structure**
```
rn-user-auth-app/
├── app/                          # Expo Router app directory
│   ├── (auth)/                  # Authentication route group
│   │   ├── _layout.tsx         # Auth group layout
│   │   ├── index.tsx           # Auth redirect
│   │   ├── login.tsx           # Login screen
│   │   └── signup.tsx          # Signup screen
│   ├── _layout.tsx             # Root app layout
│   ├── index.tsx               # Initial loading screen
│   └── dashboard.tsx           # Protected dashboard
├── contexts/                    # React Context providers
│   └── AuthContext.tsx         # Authentication context
├── types/                       # TypeScript type definitions
│   └── auth.ts                 # Auth-related types and schemas
├── components/                  # Reusable UI components
├── assets/                      # Images, fonts, and static files
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🔧 Configuration

### **Environment Setup**
The app is configured to work out of the box with Expo's default settings. No additional environment variables are required.

### **Customization**
- **Colors**: Modify color schemes in individual component styles
- **Validation**: Adjust Zod schemas in `types/auth.ts`
- **Storage Keys**: Update storage constants in `contexts/AuthContext.tsx`

## 📱 Usage

### **First Time Setup**
1. Launch the app
2. Tap "Sign Up" to create a new account
3. Enter your name, email, and password
4. Tap "Create Account" to register

### **Signing In**
1. Enter your registered email and password
2. Tap "Sign In" to authenticate
3. Use the eye icon to toggle password visibility

### **Dashboard**
- View your profile information
- See account creation date
- Access logout functionality

### **Signing Out**
1. Navigate to the dashboard
2. Tap the "Logout" button
3. Confirm logout action

## 🔒 Security Features

- **Password Validation**: Minimum 6 characters required
- **Email Validation**: Proper email format verification
- **Input Sanitization**: All inputs are cleaned and validated
- **Secure Storage**: Sensitive data stored locally with AsyncStorage
- **Token Generation**: Simple unique tokens for session tracking

## 🧪 Testing

### **Manual Testing**
- Test user registration with valid/invalid data
- Verify login with correct/incorrect credentials
- Test password visibility toggle
- Verify protected route access
- Test logout functionality

### **Validation Testing**
- Try submitting forms with empty fields
- Test email format validation
- Verify password length requirements
- Test error message display

## 🚀 Deployment

### **Building for Production**
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for both platforms
expo build
```

### **App Store Deployment**
1. Configure app.json with your app details
2. Build production versions
3. Submit to App Store Connect (iOS) or Google Play Console (Android)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team** - For the amazing development platform
- **React Native Community** - For continuous improvements
- **Zod Team** - For excellent TypeScript validation
- **React Hook Form Team** - For performant form handling

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Review the [Documentation](https://docs.expo.dev/)
3. Join the [Expo Discord](https://chat.expo.dev/)

---

<div align="center">
  <p>Made with ❤️ using React Native & Expo</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
