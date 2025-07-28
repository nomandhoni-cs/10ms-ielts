import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="mb-4 inline-flex rounded-full bg-red-100 p-4">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 md:text-6xl">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>

        <p className="mt-4 text-lg text-gray-500">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-lg font-medium text-white shadow-md transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Go Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
