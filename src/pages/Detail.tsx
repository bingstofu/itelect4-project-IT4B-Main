import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { Course } from "../types/index";
import { fetchCourseByCode } from "../api/client";

export function Detail() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const { data: course, isPending, isError, error } = useQuery<Course>({
    queryKey: ["courses", code],
    queryFn: () => fetchCourseByCode(code!),
    enabled: !!code,
  });

  if (isPending) {
    return <div className="p-6 text-gray-500">Loading course...</div>;
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg bg-red-50 p-6 text-red-700">
        <p>{error.message}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {course.title} ({course.code})
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        <strong>Units:</strong> {course.units}
      </p>
      <p className="mt-1 text-gray-600 dark:text-gray-300">
        <strong>Semester:</strong> {course.semester}
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