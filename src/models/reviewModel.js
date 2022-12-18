const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const review = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        ref: "book",
        require: true
    },
    reviewedBy: {
        type: String,
        require: true,
        default: "Guest",
        trim : true
    },
    reviewedAt: {
        type: String,
        require: true,
        trim : true
    },
    rating: { type: Number, require: true,trim : true },
    review:{type: String,
    trim : true},
    isDeleted: {
        type: String,
        default: false
    }
}, { timeStamp: true })

module.exports = mongoose.model("review", review)