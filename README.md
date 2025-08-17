# Athletic Hubster 🏆

A modern, full-stack sports competition management platform built with cutting-edge web technologies. Manage teams, competitions, matches, and user profiles with a beautiful, responsive interface.

## ✨ Features

### 🔐 Authentication & Security
- **Supabase Auth Integration** - Secure user authentication
- **Session Management** - Persistent login states
- **Protected Routes** - Role-based access control
- **Row Level Security (RLS)** - Database-level security

### 🏅 Competition Management
- **Create Competitions** - Add new events with dates and descriptions
- **Status Tracking** - Upcoming, ongoing, and completed states
- **Date Management** - Start and end date handling
- **Real-time Updates** - TanStack Query for live data

### 👥 User Profiles
- **Avatar Upload** - Supabase Storage integration
- **Profile Editing** - Username and full name management
- **Form Validation** - React Hook Form with Zod schemas
- **Responsive Design** - Mobile-first approach

### 📊 Dashboard
- **Statistics Overview** - Member counts, training sessions, competitions
- **Navigation Sidebar** - Easy access to all features
- **Search Functionality** - Global search bar
- **Notification System** - Toast notifications and alerts

### 🎨 Modern UI/UX
- **Shadcn UI Components** - Professional design system
- **Tailwind CSS** - Utility-first styling
- **Custom Color Scheme** - Sport-themed palette
- **Smooth Animations** - Fade-in and slide effects
- **Responsive Layout** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - Latest React with concurrent features
- **TypeScript 5.5** - Full type safety
- **Vite 5.4** - Lightning-fast build tool
- **React Router 6** - Client-side routing
- **TanStack Query** - Data fetching and caching

### UI Components
- **Shadcn UI** - Beautiful, accessible components
- **Radix UI** - Headless component primitives
- **Lucide React** - Modern icon library
- **Tailwind CSS 3.4** - Utility-first CSS framework

### Backend & Database
- **Supabase** - PostgreSQL database with real-time features
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Database-level access control
- **Storage Buckets** - File upload and management

### Development Tools
- **ESLint 9** - Code quality and consistency
- **PostCSS** - CSS processing
- **SWC** - Fast React compilation
- **TypeScript ESLint** - Type-aware linting

## 🗄️ Database Schema

### Core Tables
```sql
athletic.competitions     -- Competition details and dates
athletic.teams           -- Team information and logos
athletic.matches         -- Match scheduling and scores
athletic.profiles        -- User profile data
athletic.user_roles      -- Role-based permissions
athletic.competition_teams -- Many-to-many relationships
```

### Key Features
- **UUID Primary Keys** - Secure, unique identifiers
- **Timestamps** - Created/updated tracking
- **Foreign Keys** - Referential integrity
- **Storage Integration** - Avatar file management

## 🚀 Getting Started

### Prerequisites
- **Node.js 16+** - JavaScript runtime
- **npm/yarn** - Package manager
- **Supabase Account** - Backend service

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/athletic-hubster.git
   cd athletic-hubster
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   # Create .env file
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open browser**
   Navigate to `http://localhost:8080`

## 📱 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 🎯 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── competitions/    # Competition management
│   ├── dashboard/       # Dashboard components
│   ├── profile/         # User profile components
│   └── ui/             # Shadcn UI components
├── contexts/            # React contexts
├── hooks/               # Custom React hooks
├── integrations/        # External service integrations
├── lib/                 # Utility functions
├── pages/               # Application pages
└── main.tsx            # Application entry point
```

## 🔧 Configuration

### Tailwind CSS
- **Custom Color Palette** - Sport-themed colors
- **Animation System** - Fade-in and slide effects
- **Responsive Breakpoints** - Mobile-first design
- **Component Variants** - Consistent styling

### Vite Configuration
- **Path Aliases** - `@/` for src directory
- **React SWC** - Fast compilation
- **Development Server** - Port 8080
- **Lovable Integration** - Development tooling

## 🌟 Key Components

### CompetitionCard
- **Status Indicators** - Visual status representation
- **Date Formatting** - Localized date display
- **Hover Effects** - Interactive user experience
- **Responsive Grid** - Adaptive layout

### ProfileForm
- **Form Validation** - Required field handling
- **Real-time Updates** - Immediate feedback
- **Error Handling** - User-friendly error messages
- **Navigation** - Seamless user flow

### Dashboard Stats
- **Metric Cards** - Key performance indicators
- **Trend Information** - Growth indicators
- **Icon Integration** - Visual data representation
- **Responsive Grid** - Adaptive layout

## 🔒 Security Features

- **Authentication** - Supabase Auth integration
- **Authorization** - Role-based access control
- **Data Protection** - Row Level Security
- **Input Validation** - Form and API validation
- **Secure Storage** - File upload security

## 📱 Responsive Design

- **Mobile First** - Optimized for small screens
- **Breakpoint System** - Tailwind responsive utilities
- **Touch Friendly** - Mobile-optimized interactions
- **Adaptive Layout** - Flexible component sizing

## 🚧 Development Status

### ✅ Completed
- User authentication system
- Competition CRUD operations
- User profile management
- Avatar upload functionality
- Dashboard statistics
- Responsive navigation
- Database schema design

### 🔄 In Progress
- Team management interface
- Match scheduling system
- Advanced user roles
- Notification system
- Search functionality

### 📋 Planned
- Admin dashboard
- User registration
- Advanced match features
- External API integration
- Testing suite
- Documentation system

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** - `git checkout -b feature/amazing-feature`
3. **Commit changes** - `git commit -m 'Add amazing feature'`
4. **Push to branch** - `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vite** - Lightning-fast build tool
- **Shadcn UI** - Beautiful component library
- **Supabase** - Backend-as-a-Service
- **Tailwind CSS** - Utility-first CSS framework
- **React Team** - Amazing frontend library

## 🔗 Links

- **Live Demo** - [Coming Soon]
- **Documentation** - [Coming Soon]
- **API Reference** - [Coming Soon]
- **Issue Tracker** - [GitHub Issues]

## 🚀 Project Origin

### Lovable Development Platform
This project was originally created using [Lovable](https://lovable.dev) - an AI-powered development platform.

**Project URL**: https://lovable.dev/projects/812a7c77-9672-47fe-ab78-76cc06c82cdb

### How to Edit This Code

There are several ways to work with this application:

#### 🖥️ **Use Lovable (Recommended)**
- Visit the [Lovable Project](https://lovable.dev/projects/812a7c77-9672-47fe-ab78-76cc06c82cdb)
- Start prompting to make changes
- Changes are automatically committed to this repository

#### 💻 **Use Your Preferred IDE**
If you prefer working locally with your own IDE:

**Requirements:**
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

**Steps:**
```bash
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm i

# Step 4: Start development server
npm run dev
```

**Note:** Changes pushed from your IDE will also be reflected in Lovable.

---

**Built with ❤️ using modern web technologies**