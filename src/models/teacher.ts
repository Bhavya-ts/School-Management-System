import mongoose from "mongoose";
import { Subject } from "./subject";

const Schema = mongoose.Schema;
const assignSubejct = new Schema({
    std:{
        type:Number,
        require:true,
    },
    div:{
        type : String,
        require:true
    },
    subjectId :{
        type: String,
        require : true
    }
});
const teacherSchema = new Schema({
    techerId:{
        type:String,
        require:true
    },
    // name: {
    //     type: String,
    //     required: true,
    // },

    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    
    // password: {
    //     type: String,
    //     required: true,
    // },

    classTeacherStd: {
        type: Number
    },

    classTeacherDiv: {
        type: String
    },

    assignedSubject: [assignSubejct],
});

export const teacherModel = mongoose.model("teacher", teacherSchema);