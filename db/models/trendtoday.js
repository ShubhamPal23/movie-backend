import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const trendingtodayschema = new Schema({
  title: { type: String, required: true },
  release_date: { type: String, required: true },
  overview: { type: String, required: true },
  popularity: { type: Number, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
  genre_ids: { type: [Number], required: true }, // Array of integers representing genre IDs
  poster_path: { type: String, required: true }, // Path to the movie poster image
  adult: { type: Boolean, required: true } // Boolean indicating if it's an adult movie
});

const Trendingtoday = model('trendingmovietodays', trendingtodayschema);

export default Trendingtoday;
