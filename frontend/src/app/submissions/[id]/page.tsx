"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/services/api";
import ReviewForm from "@/components/submissions/ReviewForm";
import type { SubmissionDetail, ReviewResult } from "@/types/submission";

export default function SubmissionDetailPage() {
  const params = useParams<{ id: string }>();
  const submissionId = Number(params.id);
  const { isLoaded, userId } = useAuthStore();

  const [submission, setSubmission] = useState<SubmissionDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isFinite(submissionId)) return;
    api
      .get<SubmissionDetail>(`/submissions/${submissionId}`)
      .then(({ data }) => setSubmission(data))
      .catch((err: Error) => setError(err.message));
  }, [submissionId]);

  if (error) return <div className="p-8 text-sm text-red-500">{error}</div>;
  if (!submission) return <div className="p-8 text-sm text-zinc-500">Loading…</div>;

  const isOwner = isLoaded && userId === submission.authorId;
  const hasReviewed = isLoaded && submission.reviews.some((r) => r.reviewer.id === userId);

  const handleReviewSubmitted = (review: ReviewResult) => {
    setToast("Review submitted — thanks for the feedback.");
    setSubmission((prev) =>
      prev
        ? {
            ...prev,
            status: "REVIEWED",
            reviews: [
              {
                id: review.id,
  feedback: review.feedback,
  strengths: review.strengths ?? "",
  improvements: review.improvements ?? "",
  resources: review.resources,
  createdAt: review.createdAt,
  reviewer: { id: userId!, username: useAuthStore.getState().username ?? "you" },
  ratings: review.ratings,
              },
              ...prev.reviews,
            ],
          }
        : prev,
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{submission.title}</h1>
          <p className="mt-1 text-xs text-zinc-500">
            by{" "}
            <Link href={`/profile/${submission.author.username}`} className="text-indigo-600 hover:underline">
              @{submission.author.username}
            </Link>{" "}
            · {new Date(submission.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            submission.status === "PENDING"
              ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
              : "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
          }`}
        >
          {submission.status === "PENDING" ? "Pending" : `${submission.reviews.length} review${submission.reviews.length > 1 ? "s" : ""}`}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {submission.technologies.map((t) => (
          <span key={t.id} className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {t.name}
          </span>
        ))}
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">{submission.description}</p>

      <a
        href={submission.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-sm font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-800"
      >
        View on GitHub →
      </a>

      {isOwner && (
        <div className="mt-4">
          <Link
            href={`/submissions/${submission.id}/edit`}
            className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300"
          >
            Edit submission
          </Link>
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Review criteria <span className="font-normal text-zinc-400">(locked)</span>
        </h2>
        <ul className="mt-2 space-y-1">
          {submission.criteria.map((c) => (
            <li key={c.id} className="text-sm text-zinc-600 dark:text-zinc-400">
              • {c.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Leave a review</h2>

        {toast && (
          <p className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 dark:bg-green-950 dark:text-green-400">{toast}</p>
        )}

        {!isLoaded ? null : !userId ? (
          <p className="mt-3 text-sm text-zinc-500">
            <Link href="/sign-in" className="text-indigo-600 underline">
              Sign in
            </Link>{" "}
            to leave a review.
          </p>
        ) : isOwner ? (
          <p className="mt-3 rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-500 dark:bg-zinc-900">
            This is your own submission — you can&apos;t review it.
          </p>
        ) : hasReviewed ? (
          <p className="mt-3 rounded-lg bg-zinc-50 px-3 py-2 text-sm text-zinc-500 dark:bg-zinc-900">
            You&apos;ve already reviewed this submission.
          </p>
        ) : (
          <div className="mt-3">
            <ReviewForm submissionId={submission.id} criteria={submission.criteria} onSubmitted={handleReviewSubmitted} />
          </div>
        )}
      </section>

      <section className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {submission.reviews.length} review{submission.reviews.length !== 1 ? "s" : ""}
        </h2>

        {submission.reviews.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">No reviews yet.</p>
        ) : (
          <ul className="mt-3 space-y-4">
            {submission.reviews.map((r) => (
              <li key={r.id} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <Link href={`/profile/${r.reviewer.username}`} className="text-sm font-medium text-zinc-900 hover:text-indigo-600 dark:text-zinc-50">
                    @{r.reviewer.username}
                  </Link>
                  <span className="text-xs text-zinc-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {r.ratings.map((rating) => {
                    const criterion = submission.criteria.find((c) => c.id === rating.criterionId);
                    return (
                      <span key={rating.criterionId} className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {criterion?.label ?? "Criterion"}: {rating.rating}/5
                      </span>
                    );
                  })}
                </div>
                {r.strengths && <div className="mt-2"><p className="text-xs font-semibold text-green-600 dark:text-green-400">✅ Strengths</p><p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{r.strengths}</p></div>}
                {r.improvements && <div className="mt-2"><p className="text-xs font-semibold text-amber-600 dark:text-amber-400">🔧 Improvements</p><p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{r.improvements}</p></div>}
                {r.feedback && <div className="mt-2"><p className="text-xs font-semibold text-zinc-500">💬 Overall</p><p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{r.feedback}</p></div>}
                {r.resources && <div className="mt-2"><p className="text-xs font-semibold text-indigo-500">🔗 Resources</p><p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{r.resources}</p></div>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
