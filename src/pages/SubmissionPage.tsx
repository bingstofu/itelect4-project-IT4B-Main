import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submissionSchema, type SubmissionFormData } from "../schemas/submissionSchema";
import { createSubmission } from "../api/client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function SubmissionPage() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  });

  const submitMutation = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      reset();
    },
  });

  const onSubmit = (data: SubmissionFormData) => {
    submitMutation.mutate({
      studentId: 1,
      courseCode: "ITELECT4",
      repoUrl: data.repoUrl,
      submittedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6 border dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Submit Assignment</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="studentName">Student Name</Label>
          <Input id="studentName" {...register("studentName")} placeholder="John Doe" />
          {errors.studentName && (
            <p className="text-sm text-red-500 mt-1">{errors.studentName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="repoUrl">GitHub Repository URL</Label>
          <Input id="repoUrl" {...register("repoUrl")} placeholder="https://github.com/user/repo" />
          {errors.repoUrl && (
            <p className="text-sm text-red-500 mt-1">{errors.repoUrl.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="comments">Comments</Label>
          <Input id="comments" {...register("comments")} placeholder="Additional notes..." />
          {errors.comments && (
            <p className="text-sm text-red-500 mt-1">{errors.comments.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
          {submitMutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}