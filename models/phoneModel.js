import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
    phoneName: {
        type: String,
        required: true, 
    },
    brand: {
        type: String,   
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

const Phone = mongoose.model("Phone", phoneSchema);

export default Phone;