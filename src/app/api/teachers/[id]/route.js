import dbConnect from '../../../lib/dbConnect';
import Teacher from '../../../models/Teacher';

export async function PUT(req, { params }) {
  await dbConnect();
  const body = await req.json();
  const updated = await Teacher.findByIdAndUpdate(params.id, body, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await Teacher.findByIdAndDelete(params.id);
  return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}
