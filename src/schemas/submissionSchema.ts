import { z } from "zod";

export const submissionSchema = z.object({
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  repoUrl: z
    .string()
    .url("Must be a valid URL")
    .refine(
      (url) => url.includes("github.com"),
      "URL must be a GitHub repository (must contain github.com)"
    ),
  comments: z.string().optional(),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;