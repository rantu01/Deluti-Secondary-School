import dbConnect from '../../../lib/dbConnect';
import Result from '../../../models/Result';

export async function DELETE(req, context) {
  await dbConnect();

  const { id } = await context.params; // ✅ await the params
  const deleted = await Result.findByIdAndDelete(id);

  if (!deleted)
    return new Response(JSON.stringify({ message: 'Result not found' }), { status: 404 });

  return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}

export async function PUT(req, context) {
  await dbConnect();

  const { id } = await context.params; // ✅ await the params
  const body = await req.json();

  const updated = await Result.findByIdAndUpdate(id, body, { new: true });
  if (!updated)
    return new Response(JSON.stringify({ message: 'Result not found' }), { status: 404 });

  return new Response(JSON.stringify(updated), { status: 200 });
}
