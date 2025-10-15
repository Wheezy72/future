# Future (Expo SDK 49)

Premium, industry-standard React Native app (Expo SDK 49) optimized for Android 15. Modular architecture, animated dual theme, PIN and biometric security, goals and diary, finance analytics, wellness tools.

## Stack
- Expo SDK 49
- Expo Router v3 (app directory)
- React Native Reanimated
- AsyncStorage + SecureStore
- LocalAuthentication (biometrics)
- FileSystem (backup/restore)

## Running
1. Install dependencies:
   - `npm install`
2. Start:
   - `npm run start`
3. Open on Android 15 device/emulator.

## Structure
- `app/` main navigation and screens (Expo Router tabs)
- `src/` features: components, hooks, services, utils, screens
- `assets/` fonts/images

## Security
- PIN entry and biometric unlock using SecureStore + LocalAuthentication
- Protected app entry via `app/index.jsx`

## Themes
- Dual theme (light/dark) with animated backgrounds and smooth transitions
- Accessible color contrast and haptics micro-interactions

## Features
- Home: dashboard, achievements, quick stats
- Finance: expenses, budgets, savings, M-Pesa, analytics
- Wellness: mood tracking, mindfulness timer, streaks, diary
- Goals & Journal: habit/spending goals, full journal with calendar and analytics
- Settings: theme, security, backup/restore, notifications