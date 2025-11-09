// app/api/results/route.js
import dbConnect from '../../lib/dbConnect';
import Result from '../../models/Result';

export async function GET() {
  await dbConnect();
  const results = await Result.find({}).lean();
  return new Response(JSON.stringify(results), { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    await dbConnect();
    const created = await Result.create(body);
    return new Response(JSON.stringify(created), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
