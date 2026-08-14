"use client";

import { useEffect, useState } from "react";
import { FeedCard } from "../components/FeedCard";

export default function Home() {
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // seed_user_1 is Alice (Frontend), seed_user_2 is Bob (Backend)
  const [mockUser, setMockUser] = useState("seed_user_1");

  useEffect(() => {
    async function fetchFeed() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://localhost:4000/api/feed/personalized", {
          headers: {
            "x-mock-clerk-id": mockUser,
          },
        });
        const data = await res.json();
        if (data.success) {
          setFeed(data.data);
        } else {
          setError(data.error?.message || "Failed to fetch feed");
        }
      } catch (err) {
        setError("Network error or CORS issue");
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, [mockUser]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black p-8 font-sans transition-colors">
      <div className="max-w-3xl w-full mx-auto space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Personalized Feed
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Discover projects tailored to your technology stack.
            </p>
          </div>
          
          <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">View as</label>
            <select
              value={mockUser}
              onChange={(e) => setMockUser(e.target.value)}
              className="cursor-pointer appearance-none bg-transparent text-sm font-bold text-indigo-600 hover:text-indigo-500 focus:outline-none dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <option value="seed_user_1">Alice (React/Zustand)</option>
              <option value="seed_user_2">Bob (Node/Prisma)</option>
            </select>
          </div>
        </header>

        {error && (
          <div className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/10 dark:text-red-400 dark:ring-red-500/20">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-600" />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {feed.map((sub) => (
              <FeedCard key={sub.id} {...sub} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
