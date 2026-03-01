# FitProject

A minimal iOS React Native app that opens the iPhone camera and shows a live full-screen preview using **react-native-vision-camera**.

---

## Features

- Full-screen live camera preview (back camera)
- Permission handling: asks on first launch
- Denied state: shows "Open Settings" button
- Simulator fallback: friendly message when no camera hardware is found

---

## Tech Stack

| Package | Version |
|---|---|
| react-native | 0.76.7 |
| react | 18.3.1 |
| react-native-vision-camera | 4.6.4 |
| TypeScript | 5.0.4 |

---

## Prerequisites (macOS only for iOS)

- **macOS** with Xcode 15+ installed
- **Node.js** 18+
- **CocoaPods**: `sudo gem install cocoapods`
- **Ruby** 3+ (recommended via `rbenv`)

---

## Setup & Run

### 1. Install JavaScript dependencies

```bash
npm install
```

### 2. Install iOS CocoaPods

```bash
cd ios && pod install && cd ..
```

> If you hit any pod errors, try `pod repo update` first.

### 3. Start the Metro bundler

```bash
npm start
```

### 4. Run on iOS Simulator or Device

```bash
# Simulator (default)
npm run ios

# Specific simulator
npx react-native run-ios --simulator "iPhone 16 Pro"

# Physical device (set your device name or UDID)
npx react-native run-ios --device "Your iPhone Name"
```

---

## iOS Configuration

### Info.plist

`ios/FitProject/Info.plist` already contains the required camera permission string:

```xml
<key>NSCameraUsageDescription</key>
<string>FitProject uses your camera to show a live preview. No photos or videos are recorded.</string>
```

### Podfile

`ios/Podfile` uses the standard `use_react_native!` helper — react-native-vision-camera is auto-linked via React Native's auto-linking system. No manual pod entries are required.

---

## Project Structure

```
FitProject/
├── App.tsx              # Camera screen (single source file)
├── index.js             # App entry point
├── app.json             # App name config
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── babel.config.js      # Babel config
├── metro.config.js      # Metro bundler config
└── ios/
    ├── Podfile          # CocoaPods config (auto-links VisionCamera)
    └── FitProject/
        └── Info.plist   # iOS app config + NSCameraUsageDescription
```

---

## Troubleshooting

### Permissions

| Issue | Fix |
|---|---|
| Permission dialog never appears | Make sure `NSCameraUsageDescription` is in `Info.plist` |
| Permission denied, can't re-ask | Tap **Open Settings** button → toggle Camera permission |
| Works on simulator but not device | Device needs Camera permission; check iOS Settings > Privacy > Camera |

### Simulator

The iOS Simulator does not have a real camera. The app shows:
> "This device or simulator does not have a camera. Run on a physical iPhone to see the live preview."

This is expected behavior.

### Pod Install Errors

```bash
# Update repo and reinstall
cd ios
pod repo update
pod install --repo-update
```

### Metro / Build Errors

```bash
# Clear Metro cache
npm start -- --reset-cache

# Clean Xcode build
cd ios && xcodebuild clean && cd ..
npx react-native run-ios
```

### "VisionCamera is not installed" at runtime

Make sure you ran `pod install` after `npm install`, and that you **opened the `.xcworkspace`** file (not `.xcodeproj`) in Xcode.

---

## Running the full flow

```bash
# One-shot setup + run
npm install && cd ios && pod install && cd .. && npm run ios
```