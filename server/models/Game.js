const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    title: String,
    platform: String,
    status: String,
    rating: Number,
    notes: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model("Game", gameSchema)