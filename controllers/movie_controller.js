import TopRatedMovies from "../db/models/topmovie.js";
import Trendingtoday from "../db/models/trendtoday.js";
import Trendingweek from "../db/models/trendweek.js";
import moviegenre from "../db/models/genre.js";
export const movieController = {

async getTopRatedMovies(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 20; // Default to 20 movies per page
      const skip = (page - 1) * limit; // Skip calculation
      const selectedGenres = req.query.genres ? req.query.genres.split(",") : [];

      // Filter by genres if present
      const filter = selectedGenres.length > 0 ? { genre_ids: { $all: selectedGenres } } : {};

      const totalMovies = await TopRatedMovies.countDocuments(filter); // Get total number of movies
      const topRatedMovies = await TopRatedMovies.find(filter)
        .skip(skip) // Skip the required number of movies
        .limit(limit) // Limit the number of movies returned
        .exec();

      res.status(200).json({
        movies: topRatedMovies,
        currentPage: page,
        totalPages: Math.ceil(totalMovies / limit),
        totalMovies,
      });
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
      res.status(500).json({ message: "Error fetching top-rated movies" });
    }
  },

  // Fetch trending movies today
  async getTrendingTodayMovies(req, res) {
    try {
      const trendingTodayMovies = await Trendingtoday.find({}).exec();
      res.status(200).json(trendingTodayMovies);
    } catch (error) {
      console.error("Error fetching trending today movies:", error);
      res.status(500).json({ message: "Error fetching trending today movies" });
    }
  },

  // Fetch trending movies this week
  async getTrendingThisWeekMovies(req, res) {
    try {
      const trendingThisWeekMovies = await Trendingweek.find({}).exec();
      res.status(200).json(trendingThisWeekMovies);
    } catch (error) {
      console.error("Error fetching trending this week movies:", error);
      res.status(500).json({ message: "Error fetching trending this week movies" });
    }
  },
  async getGenres(req,res){
    try{
        const genres=await moviegenre.find({}).exec();
        res.status(200).json(genres);
    } catch(error)
    {
        console.error("Error fetching genres:", error);
        res.status(500).json({ message: "Error fetching genres" });
    }
  },
  async searchMovies(req, res) {
    try {
      const query = req.query.query || '';  // The search query
      const selectedGenres = req.query.genres ? req.query.genres.split(",") : [];

      // Build the filter object
      let filter = { title: { $regex: query, $options: 'i' } };  // Case-insensitive search for titles

      // If genres are selected, apply them to the filter
      if (selectedGenres.length > 0) {
        filter.genre_ids = { $all: selectedGenres };  // Ensure movies have all the selected genres
      }

      // Search in the top-rated movies collection
      const searchResults = await TopRatedMovies.find(filter).exec();

      res.status(200).json({
        movies: searchResults.map((movie) => ({
          id: movie._id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          genre_ids: movie.genre_ids,
        })),
      });
    } catch (error) {
      console.error("Error searching movies:", error);
      res.status(500).json({ message: "Error searching movies" });
    }
  }
};
