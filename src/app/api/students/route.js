// app/api/students/route.js
import dbConnect from '../../lib/dbConnect';
import Student from '../../models/Student';

// 📍 GET method — সব ছাত্রদের তথ্য
export async function GET() {
  await dbConnect();
  const students = await Student.find({}).lean();
  return new Response(JSON.stringify(students), { status: 200 });
}

// 📍 POST method — নতুন ছাত্র যুক্ত করা
export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    const created = await Student.create(body);
    return new Response(JSON.stringify(created), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
