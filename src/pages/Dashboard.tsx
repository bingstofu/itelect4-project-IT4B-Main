import { useState, useEffect, useRef } from "react";
import type { User, Course, Submission } from "../types/index";
import UserCard from "../components/UserCard";
import CourseCard from "../components/CourseCard";
import SubmissionBadge from "../components/SubmissionBadge";
import useToggle from "../hooks/useToggle";
import usePrevious from "../hooks/usePrevious";

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const courseMock: Course = {
  code: "ITELECT4",
  title: "IT Elective 4",
  units: 3,
  semester: "1st Semester 2026-2027",
};

const submissionMock: Submission = {
  id: 1,
  studentId: 1,
  courseCode: "ITELECT4",
  repoUrl: "https://github.com/bingstofu/itelect4-project-IT4B-Main",
  submittedAt: new Date(),
  score: 95,
};

export function Dashboard() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkModeState] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // Sync dark class on the HTML document element
  const handleToggleDarkMode = () => {
    toggleDarkModeState();
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses([courseMock]);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const focusSearchInput = (): void => {
    searchInputRef.current?.focus();
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="animate-pulse p-6 font-medium text-gray-500 dark:text-gray-400">Loading courses...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400">
        Could not load courses. Please try again.
      </div>
    );
  }

  return (
    <div className="transition-colors duration-200">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          ITELECT4 Dashboard
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleDarkMode}
            className="rounded bg-gray-800 px-3 py-1.5 text-sm font-medium text-white transition dark:bg-gray-200 dark:text-gray-900"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={() => setIsError(true)}
            className="rounded bg-red-100 px-2 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900"
          >
            Simulate Error
          </button>
        </div>
      </header>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            placeholder="Search courses..."
            onChange={handleSearchChange}
            className="w-full max-w-sm rounded border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={focusSearchInput}
            className="rounded bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Focus Search
          </button>
        </div>

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

      <div className="my-6">
        <button
          onClick={toggleDetails}
          className="rounded bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {showDetails && (
        <SubmissionBadge submission={submissionMock}>
          <p className="mt-2 text-xs font-bold text-green-600 dark:text-green-400">
            ✓ Upload Completed Successfully (On Time)
          </p>
        </SubmissionBadge>
      )}
    </div>
  );
}