# Workflow Earning Platform

## Introduction

**Workflow Earning Platform** is a micro-task earning application that enables users to complete tasks and earn rewards. Built using modern web technologies, it leverages **React, Firebase, Stripe, and TailwindCSS** for a smooth user experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [Development](#development)
- [License](#license)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/workflow-earning-platform.git
   cd workflow-earning-platform
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the required environment variables (see [Environment Variables](#environment-variables) section).
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- Users can sign up, complete tasks, and earn rewards.
- Administrators can manage tasks, track user activity, and process payments.
- Integrated payment gateway (Stripe) allows users to withdraw earnings.

## Features

✅ Micro-task marketplace  
✅ Firebase authentication  
✅ Secure payments with Stripe  
✅ Interactive UI with React and TailwindCSS  
✅ Performance-optimized with Vite

## Environment Variables

Create a `.env` file and add the following:

```env
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
VITE_IMG_API_KEY=YOUR_IMAGE_API_KEY
VITE_STRIPE_PK=YOUR_STRIPE_PUBLIC_KEY
```

**Note:** Replace values with actual API keys before running the project.

## Dependencies

The project uses the following major dependencies:

- **React** (`^18.3.1`) - UI framework
- **Vite** (`^6.0.5`) - Development environment
- **Firebase** (`^11.2.0`) - Backend services
- **Stripe** (`^17.5.0`) - Payment processing
- **TailwindCSS** (`^4.0.0`) - Styling
- **React Router** (`^7.1.3`) - Routing

## Development

Run the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Run ESLint for code linting:

```sh
npm run lint
```

Preview the production build:

```sh
npm run preview
```

## License

This project is **private** and not open-source.
