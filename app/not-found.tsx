"use client";

import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      
      {/* Animation */}
      <div className="w-72 h-72 mb-6">
        <DotLottieReact
          src="/404.lottie"   // keep file in /public folder
          loop
          autoplay
        />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        404 - Page Not Found
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-6 max-w-md">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}