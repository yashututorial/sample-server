import phone from "../models/phoneModel.js";

export const phoneResult = async (req, res) => {
    try{
        const { phoneName, brand, price } = req.body;
        if(!phoneName || !brand || !price){
            return res.status(400).json({message: "All fields are required"});
        }
        const response = await phone.create({phoneName, brand, price});

        res.status(201).json({message: "Phone added successfully", phone: response});
    }catch(error){
        res.status(500).json({message: "internal server error", error: error.message});
    }
};