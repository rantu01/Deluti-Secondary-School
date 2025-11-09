// app/api/students/route.js
import dbConnect from '../../lib/dbConnect';
import Student from '../../models/Student';

export async function GET() {
  await dbConnect();
  const students = await Student.find({}).lean();
  return new Response(JSON.stringify(students), { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  const data = await req.json();
  const newStudent = await Student.create(data);
  return new Response(JSON.stringify(newStudent), { status: 201 });
}
