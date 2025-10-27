# Project Book Finder Application

## Overview
Live Demo: https://6k4w2h-5173.csb.app
Project Book Finder is a React + TypeScript application built using the Vite build tool.  
It provides users with the ability to search, filter, and view information about books through an integrated API (Open Library API).  
The project demonstrates a modern front-end workflow with TypeScript, Tailwind CSS, and component-based architecture.

Primary objectives:
- Build a performant and scalable web interface using React and Vite.
- Integrate external book data APIs for dynamic content rendering.
- Showcase deployment readiness with clean configuration and AI-assisted debugging.

---

## Key Features
- Search books by title, author, or keyword.
- View detailed book information in modal popups.
- Filter and sort search results using dynamic UI elements.
- Responsive design powered by Tailwind CSS.
- Type-safe development using TypeScript.
- AI-assisted debugging and documentation (via ChatGPT).

---

## Prerequisites
Before running the project, ensure the following are installed:
- Git  
- Node.js (version 16 or later)  
- npm or yarn package manager  
- Modern web browser (Chrome, Edge, Firefox)

Platform compatibility: Windows, macOS, and Linux.

---

## Quickstart

1. Clone the repository
```
git clone https://github.com/Indukumar-Perla/project-bookfinder.git
cd project
```


2. Install dependencies

```
npm install
```


3. Run the development server
```
npm run dev
```

Open the provided local URL (e.g., http://localhost:5173) in your browser.

4. Build for production
```
npm run build
```

5. Preview the production build
```
npm run preview
```

# Configuration

Environment variables can be placed in a .env file in the project root.

Example:
```
VITE_API_URL=https://openlibrary.org
VITE_APP_NAME=BookFinder
```

Project Structure
```
project/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── BookCard.tsx
│   │   ├── BookModal.tsx
│   │   ├── FilterBar.tsx
│   │   ├── SearchBar.tsx
│   ├── services/
│   │   ├── openLibraryApi.ts
│   ├── types/
│   │   ├── book.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
```

# Contact

Developer: Indukumar Perla<br>
University: Chandigarh University<br>
Branch: CSE - AIML<br>
Contact: https://github.com/Indukumar-Perla/<br>
Project Type: Hiring Assignment
