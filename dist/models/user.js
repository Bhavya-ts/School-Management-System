import mongoose from "mongoose";
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: "teacher",
    },
    password: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});
export var userModel = mongoose.model("faculty", UserSchema);
