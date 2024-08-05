import mongoose from "mongoose";


const bodyMeasurement = new mongoose.Schema({
  month: String,
  year: Number,
  height: Number,
  weight: Number,
});

// const attendanceDetials = new mongoose.Schema({

//     date: {
//         type: Date,
//         required: true,
//         default: Date.now()
//     },
//     present: {
//         type: Boolean,
//         default: false
//     }
// });

// const stdDetails = new mongoose.Schema({
    
//     std_detail: {
//         type: Number,
//         required: true
//     },

//     division :{
//         type: String,
//         required: true
//     },

//     class_teacher: {
//         type: String,
//         required: true
//     },

//     attendance: [attendanceDetials]
//   });
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
  },
  age: {
    type: Number,
  },
  // std_details: [stdDetails],
  std: {
    type: Number,
    required: true,
  },
  body_measurement: [bodyMeasurement],
});
export const studentModel = mongoose.model("student", StudentSchema);
