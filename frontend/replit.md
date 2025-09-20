# Overview

AuroShield AI is a comprehensive safety platform that combines a React frontend with a Node.js/Express backend to provide incident reporting, emergency alerts, volunteer coordination, and safety mapping features. The platform uses Firebase for authentication, supports both web and mobile interfaces, and includes features like panic buttons, anonymous reporting, real-time safety heatmaps, and community volunteer response systems.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with **React 18** using a modern component-based architecture:

- **Component Library**: Shadcn/UI components with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system variables
- **State Management**: Redux Toolkit for global state management
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

The application follows a mobile-first responsive design approach with dedicated layouts for different screen sizes.

## Backend Architecture

The backend uses a **Node.js/Express** server architecture:

- **API Structure**: RESTful endpoints with `/api` prefix
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless database
- **Development Server**: Hot reloading with Vite integration in development
- **Session Management**: Connect-pg-simple for PostgreSQL-based sessions

## Authentication System

**Firebase Authentication** provides the primary authentication mechanism:

- Email/password authentication
- Google Sign-In integration
- Protected routes with automatic redirect handling
- JWT token management through Firebase Auth
- User profile management with display name and photo support

## Database Schema

The PostgreSQL database includes core entities:

- **Users**: User profiles with volunteer status and Firebase integration
- **Reports**: Incident reports with location, priority, media attachments
- **Emergency Contacts**: User-defined emergency contact lists
- **Panic Alerts**: Emergency alert system with location tracking

All tables use UUID primary keys with automatic generation and include proper foreign key relationships.

## State Management

**Redux Toolkit** manages application state with dedicated slices:

- **Auth Slice**: Firebase user authentication state
- **Reports Slice**: Incident reports and volunteer dashboard data
- Async thunks handle API calls and error states
- Type-safe state with TypeScript integration

## Mobile-First Design

The application prioritizes mobile user experience:

- Responsive layouts with mobile breakpoints
- Touch-friendly interface elements
- Progressive Web App capabilities
- Geolocation integration for location-based features

# External Dependencies

## Firebase Services
- **Firebase Auth**: User authentication and session management
- **Google OAuth**: Social login integration
- Environment variables required: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`

## Database Infrastructure
- **Neon PostgreSQL**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and migrations
- Environment variable required: `DATABASE_URL`

## UI Component Libraries
- **Radix UI**: Accessible headless UI primitives
- **Shadcn/UI**: Pre-built component system
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Build tool with hot module replacement
- **TypeScript**: Static type checking across the stack
- **ESBuild**: Fast JavaScript bundler for production builds

## Mapping and Location Services
- Geolocation API for user location tracking
- Map integration placeholders (ready for Google Maps or Mapbox integration)
- Reverse geocoding capabilities for address resolution

## Media Handling
- File API integration for photo uploads
- Web Audio API preparation for voice note recording
- Local storage for temporary media files

The architecture is designed to be scalable and maintainable, with clear separation between frontend and backend concerns, type safety throughout the stack, and modern development practices.