// models/Teacher.js
import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String },
  department: { type: String },
  email: { type: String },
  photo: { type: String },
});

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
