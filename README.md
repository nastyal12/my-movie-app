# 🎬 Movie Search App

A responsive movie discovery application built with Next.js and TypeScript.
The application allows users to search for movies, browse results by genre,
view ratings and release information, and save their favorite movies.

## 🇬🇧 English

### 🔗 Live Demo

The application is deployed on Vercel.

###  Overview

Movie Search App is a frontend application developed with Next.js App Router
and TypeScript using the TMDB API.

The project focuses on building a clean and responsive user experience while
handling asynchronous API requests, loading and error states, URL-based search
parameters, pagination, and client-side state management.

###  Features

- Search movies by title
- Display movie genres
- Display movie ratings
- Display release dates
- Add movies to favorites
- Pagination
- URL-based search and tab state
- Loading states
- Error handling
- Responsive user interface
- Component-based UI with Ant Design
- Data fetching through the TMDB API

###  Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Ant Design**
- **Tailwind CSS**
- **TMDB API**
- **date-fns**
- **Lodash**

### Project Structure

The project follows a feature-oriented structure to keep movie-related
components, types, constants, and logic organized.

```text
src/
├── app/
│   ├── api/
│   ├── error.tsx
│   ├── loading.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── context/
│   └── genres-context.tsx
│
├── features/
│   └── movies/
│       ├── components/
│       ├── constants/
│       └── types/
│
└── lib/


### Getting Started:
1. Clone the repository
git clone https://github.com/nastyal12/my-movie-app.git
cd my-movie-app
2. Install dependencies
npm install
3. Configure environment variables
Create a .env.local file in the root directory:
NEXT_PUBLIC_TMDB_API_KEY=your_api_key
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
4. Start the development server
npm run dev
Open the application in your browser at:
http://localhost:3000
