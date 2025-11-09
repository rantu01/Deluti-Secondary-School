// models/Student.js
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  photo: { type: String },
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
