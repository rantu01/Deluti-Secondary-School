// app/api/teachers/route.js
import dbConnect from '../../lib/dbConnect';
import Teacher from '../../models/Teacher';

export async function GET() {
  await dbConnect();
  const teachers = await Teacher.find({}).lean();
  return new Response(JSON.stringify(teachers), { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    const created = await Teacher.create(body);
    return new Response(JSON.stringify(created), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
