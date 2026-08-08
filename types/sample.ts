// sample.js -- provided for GT1 Part 1
// Task: convert to TS (rename sample.ts). Annotate all vars, params, return types

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor"; // only these values
  isActive: boolean;
  score?: number; 
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  repoUrl: string;
  submittedAt: Date;
  score?: number;
}

export type StringOrNumber = string | number;

// Function that accepts a union type
export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

function getUser(id: number): User {
  return {
    id: id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "student",
    isActive: true,
    score: 95.5,
  };
}

function calculateGrade(score: number, maxScore: number): string {
  const percentage: number = (score / maxScore) * 100;
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  return "F";
}

function formatCourse(name: string, units: number, semester: string): string {
  return `${name} (${units} units) - ${semester}`;
}

const user: User = getUser(1);
console.log(user);
console.log(calculateGrade(85, 100));
console.log(formatCourse("IT Elective 4", 3, "1st Semester"));