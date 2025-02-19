import mongoose, {model, Schema} from "mongoose";

const singleMealSchema = new mongoose.Schema({
    mealDescription: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    schedulePickUp: {
        type: Date,
        required: true,
    },
    donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    pincode:{
        type: String,
    },
    acceptedById: {
        type: String
    },
    acceptedBy: {
        type: String 
    },
    status: { 
        type: String, 
        enum: ["Pending", "Accepted", "Out for Delivery", "Delivered", "Expired"], 
        default: "Pending" 
    }
}, { timestamps: true});

export const SingleMeal = new mongoose.model("SingleMeal", singleMealSchema)