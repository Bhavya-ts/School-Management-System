import mongoose from "mongoose";

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true,
    },

    classTeacherStd: {
        type: Number
    },

    classTeacherDiv: {
        type: String
    },

    subject: [],
});

export const teacherModel = mongoose.model("teacher", teacherSchema);