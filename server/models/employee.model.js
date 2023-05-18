import mongoose from "mongoose";
const {Schema} = mongoose;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    }
}, {
    timestamps: true
});

export default mongoose.model("Employee", employeeSchema);