# INSY7315 BroCode Assignment – Saspac Parent Portal

This repository contains the BroCode group’s WIL / assignment work for a Saspac Parent Portal prototype.

The app is for parents to view school fee information and make payments. It includes the main parent screens such as login, registration, home/dashboard, statement, payment, profile and notifications.

There are two versions of the same prototype:

- **Web app** – built with Next.js, React and Tailwind CSS
- **Mobile app** – built with Android Studio using Jetpack Compose

Both versions follow the same overall functionality and screen flow. The web version is adapted for a wider desktop layout, while the mobile version is designed for Android.

## Important note

This project is a **frontend prototype only**.

- No real backend or API is connected
- Sample/dummy data is used for demonstration
- Payment uses a mocked Netcash flow (no real payments are processed)

## Features

- Parent login and registration
- Home dashboard with outstanding balance and arrears status
- Statement view with school fees, camps/events and fundraising
- Payment screen with card/EFT options and Netcash redirect mock
- Profile page for updating contact details
- Notifications list for fee and school-related alerts

## Web app

### Tech stack
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### How to run
1. Open the web project folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser

## Mobile app

### Tech stack
- Android Studio
- Kotlin
- Jetpack Compose

### How to run
1. Open the Android project in Android Studio
2. Sync Gradle if prompted
3. Run the app on an Android emulator or a physical device

## Project purpose

This assignment demonstrates a parent-facing school fees portal for Saspac, with matching web and mobile frontend prototypes. The focus is on UI, navigation and user flow rather than full production backend integration.
