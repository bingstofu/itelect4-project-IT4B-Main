import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, Course, ApiSubmission } from "../types/index";
import UserCard from "../components/UserCard";
import CourseCard from "../components/CourseCard";
import SubmissionBadge from "../components/SubmissionBadge";
import useToggle from "../hooks/useToggle";
import usePrevious from "../hooks/usePrevious";
import { useUiStore } from "../store/uiStore";
import { fetchCourses, fetchSubmissions, createSubmission } from "../api/client";

const student: User = {
  id: 1,
  name: "Maria Santos",
  email: "maria@example.com",
  role: "student",
  isActive: true,
};

export function Dashboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [showDetails, toggleDetails] = useToggle(false);

  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const previousSearch = usePrevious(searchTerm);

  const queryClient = useQueryClient();

  const { data: courses = [], isPending: isLoadingCourses, isError: isCoursesError } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const { data: submissions = [], isPending: isLoadingSubmissions } = useQuery<ApiSubmission[]>({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  const addSubmissionMutation = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      setRepoUrl("");
    },
  });

  const handleAddSubmission = () => {
    if (!repoUrl) return;
    addSubmissionMutation.mutate({
      studentId: 1,
      courseCode: "ITELECT4",
      repoUrl,
      submittedAt: new Date().toISOString(),
    });
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoadingCourses || isLoadingSubmissions) {
    return <div className="animate-pulse p-6 font-medium text-gray-500">Loading dashboard...</div>;
  }

  if (isCoursesError) {
    return (
      <div className="m-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        Could not load courses. Please check if `json-server` is running on port 3001.
      </div>
    );
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          ITELECT4 Dashboard
        </h2>
      </header>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search courses..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm rounded border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Previous search: "{previousSearch}"
          </p>
        )}
      </div>

      {selectedUser && (
        <p className="mb-4 rounded bg-blue-50 p-2 text-sm font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          Selected Profile: {selectedUser.name} ({selectedUser.email})
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UserCard user={student} onSelect={setSelectedUser} />
        {filteredCourses.map((c) => (
          <CourseCard key={c.code} course={c} />
        ))}
      </div>

      <div className="mt-8 rounded-lg border p-4 dark:border-gray-700">
        <h3 className="mb-2 font-bold text-gray-900 dark:text-white">Add Submission</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="github.com/user/repo"
            className="w-full max-w-md rounded border p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleAddSubmission}
            disabled={addSubmissionMutation.isPending || !repoUrl}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {addSubmissionMutation.isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      <div className="my-6">
        <button
          onClick={toggleDetails}
          className="rounded bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900"
        >
          {showDetails ? "Hide Submissions" : "Show Submissions"}
        </button>
      </div>

      {showDetails && (
        <div className="flex flex-col gap-3">
          {submissions.map((sub) => (
            <SubmissionBadge key={sub.id} submission={sub} />
          ))}
        </div>
      )}
    </div>
  );
}