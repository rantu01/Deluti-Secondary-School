// models/Result.js
import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  studentName: String,
  roll: String,
  class: String,
  subject: String,
  marks: Number,
  year: Number,
});

export default mongoose.models.Result || mongoose.model('Result', ResultSchema);
