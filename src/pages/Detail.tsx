import { useParams, useNavigate } from "react-router";

export function Detail() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Course Details
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Viewing details for course code: <strong className="text-indigo-600">{code}</strong>
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}