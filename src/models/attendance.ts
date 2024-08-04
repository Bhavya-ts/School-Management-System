import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    class :{
        type : Number,
        require : true,
    },
    div:{
        type :String,
        require : true,
    },
    year : {
        type:Number,
        require : true,
    },
    attendanceRecords :[{
        studentId:{
            type : String,
            require :true
        },
        datewiseList:[{
            date:{
                type : String,
                require:true,
            },
            present:{
                type: Number,
                require : true,
            }
        }]
    }]
});

export const attendanceModel = mongoose.model("attendance", attendanceSchema);