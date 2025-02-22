import { Schema, model, Types } from "mongoose";

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    ingredients:{
        type: Number,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
       match: /^https?:\/\//
    },
    recommendList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }, 
}, {
    timestamps: true,
})

const Recipe = model('Recipe', recipeSchema);

export default Recipe;