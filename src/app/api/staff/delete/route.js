import admin from "../../../lib/firebaseAdmin";


export async function POST(req) {
  try {
    const { uid } = await req.json();
    if (!uid) return new Response(JSON.stringify({ error: 'UID required' }), { status: 400 });

    await admin.auth().deleteUser(uid);
    return new Response(JSON.stringify({ message: 'Staff deleted successfully' }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
