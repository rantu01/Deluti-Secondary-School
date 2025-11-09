'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebaseClient';
import { useRouter } from 'next/navigation';

export default function ProtectedClient({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push('/auth'); // redirect to login if not logged in
      }
    });
    return () => unsub();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return <>{children}</>;
}
