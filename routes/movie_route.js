import express from 'express';
import { movieController } from '../controllers/movie_controller.js'; // Import the movie controller

export const movieRoutes = express.Router();

// Route to get top-rated movies
movieRoutes.get('/toprated', movieController.getTopRatedMovies);

// Route to get trending movies today
movieRoutes.get('/trendingtoday', movieController.getTrendingTodayMovies);

// Route to get trending movies this week
movieRoutes.get('/trendingthisweek', movieController.getTrendingThisWeekMovies);

movieRoutes.get('/genre', movieController.getGenres)

movieRoutes.get('/search', movieController.searchMovies);


