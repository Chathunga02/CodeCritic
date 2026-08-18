"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const { isLoaded, userId, username } = useAuthStore();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Get your code{" "}
          <span className="text-indigo-600">reviewed</span>
          <br />
          by real developers.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 dark:text-zinc-400">
          CodeCritic is a peer review platform where developers share their work,
          give honest feedback, and earn karma for helping others grow.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {isLoaded && userId ? (
            <>
              <Link href="/submissions/new" className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">Submit your code</Link>
              <Link href="/me" className="rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300">My profile</Link>
            </>
          ) : (
            <>
              <Link href="/sign-up" className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">Get started free</Link>
              <Link href="/sign-in" className="rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300">Sign in</Link>
            </>
          )}
        </div>
      </div>

      {isLoaded && userId && (
        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 px-6 py-5 dark:border-indigo-900 dark:bg-indigo-950/40">
          <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">Welcome back, <span className="font-semibold">@{username}</span> 👋</p>
          <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">The feed will appear here once it is live. In the meantime, submit your code or update your profile.</p>
          <div className="mt-3 flex gap-3">
            <Link href="/submissions/new" className="text-xs font-medium text-indigo-700 underline underline-offset-2 hover:text-indigo-900">Submit code →</Link>
            <Link href="/settings" className="text-xs font-medium text-indigo-700 underline underline-offset-2 hover:text-indigo-900">Edit profile →</Link>
            <Link href="/me/requests" className="text-xs font-medium text-indigo-700 underline underline-offset-2 hover:text-indigo-900">My submissions →</Link>
          </div>
        </div>
      )}

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          { icon: "📝", title: "Submit your code", desc: "Share a GitHub repo, add review criteria, and get structured feedback from the community." },
          { icon: "🔍", title: "Review others", desc: "Browse open review requests, leave detailed feedback per criterion, and earn karma." },
          { icon: "⚡", title: "Earn karma", desc: "Every review you give earns you karma. A higher karma signals a trusted reviewer." },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-2xl">{f.icon}</span>
            <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{f.title}</h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
