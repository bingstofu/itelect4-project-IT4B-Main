import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center dark:bg-gray-900">
      <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">Page Not Found</p>
      <Link
        to="/"
        className="mt-4 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Return to Home
      </Link>
    </div>
  );
}