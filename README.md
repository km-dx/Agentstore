# AI Agent Store

A platform for discovering, filtering, and comparing AI tools and agents.

## Features

- Browse and search AI agents by category, tag, or keyword
- Filter agents by various criteria (pricing, features, etc.)
- Compare multiple agents side by side
- User accounts with saved agents and preferences
- Agency profiles for AI tool providers
- Detailed agent pages with reviews and ratings

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Vector Search**: pgvector for semantic search

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database and authentication)
- OpenAI API key (for semantic search)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-agent-store.git
   cd ai-agent-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your own values.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

1. Create a new Supabase project
2. Run the SQL migrations in `src/db/schema.sql`
3. Update your `.env.local` file with the Supabase URL and keys

## Project Structure

```
ai-agent-store/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # React components
│   ├── db/            # Database schema and migrations
│   ├── lib/           # Utility functions and shared code
│   ├── models/        # TypeScript interfaces
│   ├── styles/        # Global styles
│   └── types/         # TypeScript type definitions
├── .env.example       # Example environment variables
├── .gitignore         # Git ignore file
├── package.json       # Project dependencies
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
