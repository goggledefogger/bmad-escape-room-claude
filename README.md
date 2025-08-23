# BMad Escape Room - Night Train Experience

> An accessible, WCAG 2.1 AA compliant digital escape room experience featuring "The Night Train Compartment" - a 5-minute puzzle adventure designed for everyone.

[![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)](https://tailwindcss.com/)

## 🎯 Project Vision

BMad Escape Room delivers premium, accessible digital escape room experiences that prioritize inclusivity without compromising on puzzle quality. Our flagship experience, "The Night Train Compartment," demonstrates how thoughtful design can create engaging entertainment for users of all abilities.

### 🌟 Key Features

- **🔍 Accessibility-First Design** - Full WCAG 2.1 AA compliance with screen reader support, keyboard navigation, and high contrast options
- **🧩 Progressive Puzzle System** - Three interconnected puzzles with multiple solution paths
- **💡 4-Tier Hint System** - Gentle nudges to detailed step-by-step guidance prevents frustration
- **⚡ Quick Experience** - Designed for 5-10 minute sessions perfect for breaks or team building
- **📱 PWA Ready** - Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Beautiful Dark Theme** - Night train aesthetic with brass accents and high contrast

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **PostgreSQL** 13.0 or higher
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bmad-io/bmad-escape-room.git
   cd bmad-escape-room
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/bmad_escape_room"

   # NextAuth (for future authentication)
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_NAME="BMad Escape Room"
   ```

4. **Set up the database**
   ```bash
   # Create database schema
   npm run db:push

   # Seed with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🎮 Experience the Game

### Main Experience
- **Homepage**: Overview of features and accessibility commitment
- **Night Train Compartment**: The main escape room experience at `/room/night-train-compartment`

### Accessibility Features

- **Keyboard Navigation**: Tab through all interactive elements
- **Screen Reader Support**: Full ARIA labels and announcements
- **High Contrast Mode**: Toggle in accessibility controls
- **Font Options**: Including dyslexia-friendly alternatives
- **Motion Controls**: Reduced motion options available
- **Skip Links**: Quick navigation with Alt+1, Alt+2, etc.

## 🛠️ Development

### Project Structure

```
bmad-escape-room/
├── docs/                    # Comprehensive project documentation
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── room/           # Escape room experiences
│   │   └── api/            # API routes (tRPC)
│   ├── components/         # React components
│   │   ├── accessibility/  # Accessibility framework
│   │   └── ui/            # Base UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── server/            # Backend API (tRPC)
│   ├── types/             # TypeScript definitions
│   └── styles/            # Global styles
├── prisma/                # Database schema and migrations
└── public/                # Static assets
```

### Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom accessibility utilities
- **UI Components**: [Radix UI](https://www.radix-ui.com/) for accessible primitives
- **API**: [tRPC](https://trpc.io/) for type-safe APIs
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) ORM
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for accessibility state
- **Testing**: [Jest](https://jestjs.io/) + [Playwright](https://playwright.dev/) + [jest-axe](https://github.com/nickcolley/jest-axe)

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:push          # Sync schema to database
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed database with sample data
npm run db:reset         # Reset and re-seed database
npm run db:migrate       # Run database migrations

# Testing
npm test                 # Run unit tests
npm run test:e2e         # Run end-to-end tests
npm run test:accessibility # Run accessibility tests
npm run accessibility:audit # Run axe accessibility audit
```

### Development Guidelines

1. **Accessibility First**: Every feature must maintain WCAG 2.1 AA compliance
2. **Type Safety**: Leverage TypeScript and tRPC for full type safety
3. **Progressive Enhancement**: Ensure core functionality works without JavaScript
4. **Testing**: Write tests for accessibility, functionality, and user interactions
5. **Documentation**: Update docs when adding new features or changing architecture

## 🧪 Testing

### Running Tests

```bash
# All tests
npm test

# Specific test types
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:accessibility

# Accessibility audit
npm run accessibility:audit
```

### Accessibility Testing

The project includes comprehensive accessibility testing:

- **Automated Testing**: jest-axe integration for accessibility rule checking
- **Keyboard Navigation**: Test all interactions work with keyboard only
- **Screen Reader Testing**: Verify with NVDA, JAWS, or browser screen readers
- **Color Contrast**: Automated contrast ratio validation
- **Focus Management**: Ensure logical focus order and visible focus indicators

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **RoomSession**: User session tracking and progress
- **AnalyticsEvent**: User interaction and behavior analytics
- **AccessibilityAudit**: Accessibility compliance monitoring
- **Puzzle/Hint**: Puzzle definitions and progressive hint system

View the complete schema in `prisma/schema.prisma`.

## 🚀 Deployment

### Environment Variables for Production

Ensure these environment variables are set:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="production-secret"
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_NAME="BMad Escape Room"
```

### Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📖 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Architecture](docs/architecture.md)**: Complete technical architecture
- **[Brownfield Architecture](docs/brownfield-architecture.md)**: Current implementation state
- **[PRD](docs/prd.md)**: Product requirements and specifications
- **[UX Specification](docs/front-end-spec.md)**: UI/UX design guidelines
- **[Project Brief](docs/brief.md)**: Project overview and goals

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines and ensure:

1. **Accessibility compliance** - All changes maintain WCAG 2.1 AA standards
2. **Type safety** - No TypeScript errors in build
3. **Testing** - Include tests for new functionality
4. **Documentation** - Update relevant docs for significant changes

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Run accessibility audit (`npm run accessibility:audit`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 🛡️ Accessibility Commitment

This project is committed to providing an inclusive experience for all users. We:

- Follow WCAG 2.1 AA guidelines
- Test with real assistive technologies
- Provide multiple ways to interact with content
- Ensure high color contrast ratios
- Support keyboard-only navigation
- Offer screen reader optimizations
- Include dyslexia-friendly font options

If you encounter accessibility barriers, please [open an issue](https://github.com/bmad-io/bmad-escape-room/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Next.js team** for excellent accessibility defaults
- **Tailwind CSS** for comprehensive accessibility utilities
- **Accessibility community** for guidance and best practices
- **T3 Stack** for the excellent TypeScript foundation

---

**Built with ❤️ and accessibility in mind by the BMad team**

For questions, feedback, or support, please [open an issue](https://github.com/bmad-io/bmad-escape-room/issues) or contact us at [accessibility@bmad.io](mailto:accessibility@bmad.io).
