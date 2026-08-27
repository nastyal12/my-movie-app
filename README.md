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
