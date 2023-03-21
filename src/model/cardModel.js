import mongoose from 'mongoose'

const url = "https://i.stack.imgur.com/34AD2.jpg";

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pas de nom de carte"]
    },
    collectionCard: {
        type: String,
        required: [true, "Pas de collection"]
    },
    price: {
        type: Number,
        required: [true, "Pas de prix de carte"]
    },
    image: {
        type: String,
        default: url
    },
    ifAvalaible: { type: Number, default: 1 },
    collections: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
    users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

const cardModel = mongoose.model('card', cardSchema)

export default cardModel 