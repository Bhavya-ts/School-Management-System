import mongoose from "mongoose";

const bodyMeasurement = new mongoose.Schema({
  month: String,
  year: Number,
  height: Number,
  weight: Number,
});

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
  std_details: [],
  std: {
    type: Number,
    required: true,
  },
  body_measurement: [bodyMeasurement],
});
export const studentModel = mongoose.model("student", StudentSchema);
