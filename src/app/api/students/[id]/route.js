import dbConnect from '../../../lib/dbConnect';
import Student from '../../../models/Student';

export async function PUT(req, { params }) {
  await dbConnect();
  const body = await req.json();
  const updated = await Student.findByIdAndUpdate(params.id, body, { new: true });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await Student.findByIdAndDelete(params.id);
  return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
}
