'use client';
import { useState } from 'react';
import { auth } from '../../lib/firebaseClient';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  async function handleSignUp(e) {
    e.preventDefault();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
  }

  async function handleSignIn(e) {
    e.preventDefault();
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
  }

  async function handleSignOut() {
    await signOut(auth);
    setUser(null);
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      {user ? (
        <div>
          <p>Signed in as {user.email}</p>
          <button onClick={handleSignOut} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
        </div>
      ) : (
        <form className="space-y-2">
          <input
            className="border p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            className="border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="flex space-x-2">
            <button onClick={handleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
            <button onClick={handleSignUp} className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
          </div>
        </form>
      )}
    </div>
  );
}
