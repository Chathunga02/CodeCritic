"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useFeedFilters } from "@/store/feedFilters";
import { api } from "@/services/api";
import { FeedSubmission } from "@/types/feed";
import { FeedCard } from "@/components/feed/FeedCard";
import { FeedFilters } from "@/components/feed/FeedFilters";

export default function Home() {
  const { isLoaded, userId } = useAuthStore();
  const { search, technologies } = useFeedFilters();
  
  const [feedData, setFeedData] = useState<FeedSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return; // Wait for auth to resolve

    let isMounted = true;

    async function fetchFeed() {
      if (isMounted) {
        setLoading(true);
        setError(null);
      }
      try {
        const hasFilters = search.trim().length > 0 || technologies.length > 0;
        
        // Build query string
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (technologies.length > 0) params.append('technologies', technologies.join(','));
        // We'll append debug=1 in dev so we can see scores in the demo
        if (process.env.NODE_ENV !== 'production') {
           params.append('debug', '1');
        }

        const queryString = params.toString();
        const endpoint = (userId && !hasFilters) 
          ? `/feed/personalized?${queryString}`
          : `/feed?${queryString}`;

        const res = await api.get<FeedSubmission[]>(endpoint);
        
        if (isMounted && res.success) {
          setFeedData(res.data);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to load feed";
        if (isMounted) setError(message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchFeed();

    return () => { isMounted = false; };
  }, [isLoaded, userId, search, technologies]);

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

      <div className="mt-16">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">Review Requests</h2>
        
        <FeedFilters />

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 rounded-2xl border border-zinc-200 bg-zinc-50 animate-pulse dark:border-zinc-800 dark:bg-zinc-900/50" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
            {error}
          </div>
        ) : feedData.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">No submissions found</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedData.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {!userId && (
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
      )}
    </div>
  );
}
