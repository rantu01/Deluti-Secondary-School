"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebaseClient";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Swal from "sweetalert2";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);

      // যদি ইউজার লগইন করে থাকে, তাহলে Sweet Alert দেখাও এবং হোমপেজে রিডাইরেক্ট করো
      if (user) {
        Swal.fire({
          title: "লগইন সফল!",
          text: `স্বাগতম ${user.email}`,
          icon: "success",
          confirmButtonText: "ঠিক আছে",
          confirmButtonColor: "#3085d6",
          timer: 3000,
          timerProgressBar: true,
          didClose: () => {
            router.push("/");
          },
        });
      }
    });
    return () => unsubscribe();
  }, [router]);

  async function handleEmailAuth(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        await showSuccessAlert("সফলভাবে লগইন করা হয়েছে!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        await showSuccessAlert("অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে!");
      }
    } catch (error) {
      showErrorAlert(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      await showSuccessAlert("Google এর মাধ্যমে সফলভাবে লগইন করা হয়েছে!");
    } catch (error) {
      showErrorAlert(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      await Swal.fire({
        title: "লগআউট সফল!",
        text: "আপনি সফলভাবে লগআউট করেছেন",
        icon: "info",
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      showErrorAlert(error.message);
    }
  }

  // Success Alert Function
  const showSuccessAlert = (message) => {
    return Swal.fire({
      title: "সফল!",
      text: message,
      icon: "success",
      confirmButtonText: "ঠিক আছে",
      confirmButtonColor: "#10B981",
      timer: 2500,
      timerProgressBar: true,
    });
  };

  // Error Alert Function
  const showErrorAlert = (message) => {
    return Swal.fire({
      title: "ত্রুটি!",
      text: message,
      icon: "error",
      confirmButtonText: "বুঝেছি",
      confirmButtonColor: "#EF4444",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            প্রক্রিয়া চলছে...
          </h3>
          <p className="text-gray-500">অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-100">
        <div className="bg-white p-8 rounded-2xl shadow-2xl  w-full mx-4 border border-green-200">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">লগইন সফল!</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-600 mb-2">আপনি লগইন করেছেন হিসেবে:</p>
              <p className="text-blue-600 font-semibold text-lg">
                {user.email}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push("/")}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition shadow-md flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
                হোমপেজে যান
              </button>

              <button
                onClick={handleSignOut}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition shadow-md flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                লগআউট করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full mx-4 border border-blue-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ডেলুটি মাধ্যমিক বিদ্যালয়
          </h1>
          <p className="text-gray-600 font-medium">
            {isLogin
              ? "আপনার অ্যাকাউন্টে প্রবেশ করুন"
              : "নতুন অ্যাকাউন্ট তৈরি করুন"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 shadow-sm">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Google Sign In */}
        {/* <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center mb-6 shadow-sm hover:shadow-md"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-6 h-6 mr-3"
          />
          Google দিয়ে লগইন করুন
        </button> */}

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm font-medium">অথবা</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3">
              ইমেইল এড্রেস
            </label>
            <input
              type="email"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল লিখুন"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                প্রক্রিয়া হচ্ছে...
              </div>
            ) : isLogin ? (
              "লগইন করুন"
            ) : (
              "রেজিস্টার করুন"
            )}
          </button>
        </form>

        {/* Toggle between Login/Register */}
        {/* <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            {isLogin ? "অ্যাকাউন্ট নেই?" : "ইতিমধ্যে অ্যাকাউন্ট আছে?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 underline"
            >
              {isLogin
                ? "এখানে ক্লিক করে রেজিস্টার করুন"
                : "এখানে ক্লিক করে লগইন করুন"}
            </button>
          </p>
        </div> */}

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-blue-700">
              এটি শুধুমাত্র অ্যাডমিন ও শিক্ষকদের জন্য সংরক্ষিত
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
