import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const genreschema = new Schema({
    title: { type: String, required: true },
    id: { type: Number, required: true },
    name: { type: String, required: true }
});

const moviegenre = model('genres', genreschema);

export default moviegenre;