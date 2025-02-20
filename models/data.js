const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mission: {
        type: String,
        required: true,
        default:
            "At Jarurat Care Foundation, we stand by those affected by cancer, offering unwavering support every step of the way. We bring hope, care, and strength to patients, caregivers, and healthcare professionals across India.",
    },
    focusAreas: {
        type: [String],  // Change to array of strings
        required: true,
        default: ["Cancer Support", "Emotional Support", "Nutritional Advice", "Practical Help"]
    },
    
    donors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Donor",  // Ensure "Donor" model exists or adjust to your collection name
        }
    ],
    contactInfo: {
        phone: { type: Number, required: false },
        email: { type: String, required: false },
    }
});

// Export the model, not just the schema
const Ngo = mongoose.model("Ngo", ngoSchema);

module.exports = Ngo;  // Export the model, not the schema itself
