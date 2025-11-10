import dbConnect from '../../../lib/dbConnect';
import Teacher from '../../../models/Teacher';

export async function PUT(req, context) {
  await dbConnect();

  const { id } = await context.params; // ✅ await the params
  const body = await req.json();

  const updated = await Teacher.findByIdAndUpdate(id, body, { new: true });
  if (!updated)
    return new Response(JSON.stringify({ message: 'Teacher not found' }), { status: 404 });

  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, context) {
  await dbConnect();

  const { id } = await context.params; // ✅ await again
  const deleted = await Teacher.findByIdAndDelete(id);

  if (!deleted)
    return new Response(JSON.stringify({ message: 'Teacher not found' }), { status: 404 });

  return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}
