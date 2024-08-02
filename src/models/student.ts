import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendance_detials = new Schema({

    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    present: {
        type: Boolean,
        default: false
    }
});

const stdDetails = new Schema({
    
    std_detail: {
        type: Number,
        required: true
    },

    division :{
        type: String,
        required: true
    },

    class_teacher: {
        type: String,
        required: true
    },

    attendance: {attendance_detials}

});
