import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useUiStore } from "../store/uiStore";

export function Layout() {
  const { token, logout } = useAuthStore();
  const isDarkMode = useUiStore((s) => s.isDarkMode);
  const toggleDarkMode = useUiStore((s) => s.toggleDarkMode);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100">
        <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">ITELECT4</span>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium hover:text-indigo-600 ${
                  isActive ? "text-indigo-600 underline font-bold" : "text-gray-600 dark:text-gray-300"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/courses/ITELECT4"
              className={({ isActive }) =>
                `text-sm font-medium hover:text-indigo-600 ${
                  isActive ? "text-indigo-600 underline font-bold" : "text-gray-600 dark:text-gray-300"
                }`
              }
            >
              Course Detail
            </NavLink>
            <NavLink
              to="/submissions"
              className={({ isActive }) =>
                `text-sm font-medium hover:text-indigo-600 ${
                  isActive ? "text-indigo-600 underline font-bold" : "text-gray-600 dark:text-gray-300"
                }`
              }
            >
              Submissions
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="rounded bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {token ? (
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Login
              </NavLink>
            )}
          </div>
        </nav>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}