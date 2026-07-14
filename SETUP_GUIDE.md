# Project Setup Guide

## Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database
The project uses SQLite with Prisma. Run:
```bash
npx prisma generate
npx prisma migrate deploy
```

If you want to seed the database with sample 
```bash
npx prisma db seed
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at: http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)

## Week 6 Focus

You're currently on Week 6: Full-Stack Integration
- API Routes with Prisma
- Server Actions
- Data fetching patterns
- Error handling

## Troubleshooting

If you encounter issues:
1. Delete `node_modules` and `package-lock.json`, then run `npm install` again
2. Delete `dev.db` and run `npx prisma migrate reset` to reset the database
3. Make sure you're using a compatible Node.js version (v18+)