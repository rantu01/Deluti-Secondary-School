import dbConnect from "../../../lib/dbConnect";
import Notice from "../../../models/Notice";

export async function GET(req, context) {
  await dbConnect();
  const { id } = await context.params; // ✅ await params
  try {
    const notice = await Notice.findById(id).lean();
    if (!notice)
      return new Response(
        JSON.stringify({ error: "Notice not found" }),
        { status: 404 }
      );
    return new Response(JSON.stringify(notice), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  await dbConnect();
  const { id } = await context.params; // ✅ await params
  try {
    const body = await req.json();
    const updated = await Notice.findByIdAndUpdate(id, body, { new: true });
    if (!updated)
      return new Response(
        JSON.stringify({ error: "Notice not found" }),
        { status: 404 }
      );
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    );
  }
}

export async function DELETE(req, context) {
  await dbConnect();
  const { id } = await context.params; // ✅ await params
  try {
    const deleted = await Notice.findByIdAndDelete(id);
    if (!deleted)
      return new Response(
        JSON.stringify({ success: false, error: "Notice not found" }),
        { status: 404 }
      );
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 400 }
    );
  }
}
