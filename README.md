# RefStack - Referral Tracking SaaS

RefStack is a modern, full-featured referral tracking and management SaaS application built with Next.js, TypeScript, and Supabase.

## Features

- 🔐 Authentication with Supabase Auth
- 👥 Team Management
- 🔗 Referral Link Generation & Tracking
- 📊 Analytics Dashboard
- 💳 Subscription Management with Stripe
- 🌐 Domain Management
- 🔔 Real-time Notifications
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive Design
- 🌙 Dark Mode Support

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** Stripe
- **UI Components:** Radix UI
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Icons:** Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/refstack.git
   cd refstack
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── ui/          # UI components
│   └── ...          # Feature components
├── lib/             # Utility functions
├── hooks/           # Custom React hooks
├── types/           # TypeScript types
└── styles/          # Global styles
```

## Testing

The project uses Jest and React Testing Library for testing. Run tests with:

```bash
npm test
```

## Deployment

The application can be deployed to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## My Next.js App

This is a Next.js application.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. 