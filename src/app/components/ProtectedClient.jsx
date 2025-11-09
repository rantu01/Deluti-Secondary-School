'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebaseClient';
import { useRouter } from 'next/navigation';

export default function ProtectedClient({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/'); // redirect if not logged in
      else setLoading(false);
    });
    return () => unsub();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  return <>{children}</>;
}
