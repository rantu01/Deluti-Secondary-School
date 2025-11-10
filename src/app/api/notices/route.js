import dbConnect from "../../lib/dbConnect";
import Notice from "../../models/Notice";

export async function GET() {
  await dbConnect();
  try {
    const notices = await Notice.find({}).sort({ date: -1 }).lean();
    return new Response(JSON.stringify(notices), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const created = await Notice.create(body);
    return new Response(JSON.stringify(created), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
