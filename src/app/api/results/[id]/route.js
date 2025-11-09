import dbConnect from '../../../lib/dbConnect';
import Result from '../../../models/Result';

export async function DELETE(req, { params }) {
  await dbConnect();
  await Result.findByIdAndDelete(params.id);
  return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}

// Optional: Update result
export async function PUT(req, { params }) {
  await dbConnect();
  const body = await req.json();
  const updated = await Result.findByIdAndUpdate(params.id, body, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}
