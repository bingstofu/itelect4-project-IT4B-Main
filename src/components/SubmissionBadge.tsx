import React from "react";
import type { ApiSubmission } from "../types/index";

interface SubmissionBadgeProps {
  submission: ApiSubmission;
  children?: React.ReactNode;
}

const SubmissionBadge: React.FC<SubmissionBadgeProps> = ({ submission, children }) => {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 text-white shadow-sm dark:border-gray-600">
      <p className="text-sm">
        <strong className="text-gray-300">Repository:</strong> {submission.repoUrl}
      </p>
      <p className="text-sm">
        <strong className="text-gray-300">Evaluation Score:</strong>{" "}
        {submission.score ?? "Not graded yet"}
      </p>
      {children}
    </div>
  );
};

export default SubmissionBadge;