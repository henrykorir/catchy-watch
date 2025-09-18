# Catchy Watch 🎬

Catchy Watch is a modern movie discovery web application built with **Vue 3** and **Vite**. It allows users to browse movies, view details, watch trailers, manage a watchlist, and explore recommendations seamlessly.

Live Demo: [https://catchy-watch.netlify.app](https://catchy-watch.netlify.app)

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Screenshots](#screenshots)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Environment Variables](#environment-variables)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- Browse trending and popular movies  
- Search movies by title  
- View movie details, including cast, keywords, and trailers  
- See similar movies and recommendations  
- Add or remove movies from a personal watchlist (powered by Supabase)  
- Pagination support for large datasets  
- Responsive design for desktop and mobile  
- Smooth navigation using Vue Router  
- Error handling for API failures  

---

## Tech Stack

- **Frontend:** Vue 3, Vite  
- **State Management:** Composition API + Reactive `ref` / `computed`  
- **Routing:** Vue Router 4  
- **API:** [TMDB API](https://www.themoviedb.org/)  
- **Database / Auth:** Supabase (watchlist management & user authentication)  
- **Styling:** Tailwind CSS  
- **Testing:** Cypress (component and e2e tests)  
- **Utilities:** Day.js for date formatting, Axios / Fetch API for requests  

---

## Screenshots

![Home Page](screenshots/home.png)  
![Movie Details](screenshots/movie-details.png)  
![Watchlist](screenshots/watchlist.png)  

---

## Installation

Clone the repository:

```bash
git clone https://github.com/henrykorir/catchy-watch.git
cd catchy-watch
