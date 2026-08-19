"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/services/api";

interface Technology { id: number; name: string; }
interface UserProfile {
  id: number; username: string; bio: string | null;
  githubUrl: string | null; karma: number; createdAt: string;
  technologies: Technology[];
  _count: { reviews: number; submissions: number };
}

export default function MePage() {
  const { isLoaded, userId } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !userId) return;
    api.get<UserProfile>("/users/me")
      .then(({ data }) => setProfile(data))
      .catch((err: Error) => setError(err.message));
  }, [isLoaded, userId]);

  if (!isLoaded) return <div className="p-8 text-sm text-zinc-500">Loading…</div>;
  if (!userId) return <div className="p-8 text-sm text-zinc-500"><Link href="/sign-in" className="text-indigo-600 underline">Sign in</Link> to view your profile.</div>;
  if (error) return <div className="p-8 text-sm text-red-500">{error}</div>;
  if (!profile) return <div className="p-8 text-sm text-zinc-500">Loading…</div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{profile.username}</h1>
          {profile.bio && <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{profile.bio}</p>}
          {profile.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-xs text-indigo-600 hover:underline">
              {profile.githubUrl}
            </a>
          )}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          ⚡ {profile.karma}
        </span>
      </div>

      {profile.technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.technologies.map((t) => (
            <span key={t.id} className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{t.name}</span>
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-6">
        <div className="text-center">
          <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{profile._count.reviews}</p>
          <p className="text-xs text-zinc-500">Reviews given</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{profile._count.submissions}</p>
          <p className="text-xs text-zinc-500">Submissions</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{profile.karma}</p>
          <p className="text-xs text-zinc-500">Karma</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/settings" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Edit profile</Link>
        <Link href="/me/requests" className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300">My submissions</Link>
        <Link href="/me/reviews" className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300">Reviews given</Link>
        <Link href="/me/reviews-received" className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300">Reviews received</Link>
      </div>
    </div>
  );
}
