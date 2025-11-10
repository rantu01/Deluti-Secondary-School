import admin from "../../../lib/firebaseAdmin";


export async function GET() {
  try {
    const listUsersResult = await admin.auth().listUsers(1000); // max 1000 users at once
    const users = listUsersResult.users.map(user => ({
      id: user.uid,
      email: user.email,
      name: user.displayName || '', // we can store name when creating
    }));

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
