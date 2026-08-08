import { useState, useEffect, useRef } from "react";
import type { User, Course, Submission } from "./types/index";
import UserCard from "./components/UserCard";
import CourseCard from "./components/CourseCard";
import SubmissionBadge from "./components/SubmissionBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

// Mock Data Definitions
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

function App() {
  // 1. Typed State with useState<T>
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 2. Typed DOM Reference with useRef
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 3. Custom Hooks Usage
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // 4. Loading Mock Data with useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses([courseMock]);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 5. Typed DOM Event Handler
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
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

  // Styled Loading State
  if (isLoading) {
    return (
      <div className="animate-pulse p-6 text-gray-500 font-medium">
        Loading courses...
      </div>
    );
  }

  // Styled Error State
  if (isError) {
    return (
      <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700 border border-red-200">
        Could not load courses. Please try again.
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 transition-colors duration-200 dark:bg-gray-900">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ITELECT4 Dashboard - GT2 Part 3
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white dark:bg-gray-200 dark:text-gray-900 font-medium transition"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={() => setIsError(true)}
              className="rounded bg-red-100 px-2 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-200"
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
              className="w-full max-w-sm rounded border border-gray-300 p-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              onClick={focusSearchInput}
              className="rounded bg-gray-200 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
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

        {/* Responsive Grid Layout */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UserCard user={student} onSelect={setSelectedUser} />

          {filteredCourses.map((c) => (
            <CourseCard key={c.code} course={c} />
          ))}
        </div>

        <div className="my-6">
          <button
            onClick={toggleDetails}
            className="rounded bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>

        {showDetails && (
          <SubmissionBadge submission={submissionMock}>
            <p className="mt-2 text-xs font-bold text-green-400">
              ✓ Upload Completed Successfully (On Time)
            </p>
          </SubmissionBadge>
        )}
      </div>
    </div>
  );
}

export default App;