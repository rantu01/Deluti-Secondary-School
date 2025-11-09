// app/api/students/[id]/route.js
import dbConnect from '../../../lib/dbConnect';
import Student from '../../../models/Student';

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  console.log("Deleting student ID:", id);

  const deleted = await Student.findByIdAndDelete(id);
  if (!deleted) return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;

  const body = await req.json();
  console.log("Updating student ID:", id, "with data:", body);

  const updated = await Student.findByIdAndUpdate(id, body, { new: true });
  if (!updated) return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });

  return new Response(JSON.stringify(updated), { status: 200 });
}

// Optional: GET single student if needed
export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  const student = await Student.findById(id);
  if (!student) return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });

  return new Response(JSON.stringify(student), { status: 200 });
}
