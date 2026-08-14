import React from 'react';

interface Author {
  id: number;
  username: string;
}

interface FeedCardProps {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  createdAt: string;
  author: Author;
  technologies: string[];
  matchedTechnologies: string[];
  score?: number; // Optional display for demo
}

export function FeedCard({
  title,
  description,
  githubUrl,
  createdAt,
  author,
  technologies,
  matchedTechnologies,
  score
}: FeedCardProps) {
  const date = new Date(createdAt);
  const timeElapsed = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));

  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-200/50 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800/50 dark:bg-zinc-900/70 sm:p-8">
      {/* Background glow effect */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 group-hover:opacity-100 dark:group-hover:from-indigo-500/10 dark:group-hover:via-purple-500/10 dark:group-hover:to-pink-500/10" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 transition-colors hover:text-indigo-600 dark:text-zinc-50 dark:hover:text-indigo-400">
              {title}
            </h3>
          </a>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            by <span className="font-medium text-zinc-700 dark:text-zinc-300">@{author.username}</span> • {timeElapsed < 24 ? `${Math.max(timeElapsed, 0)}h ago` : `${Math.floor(timeElapsed / 24)}d ago`}
            {score !== undefined && ` • Rank Score: ${score.toFixed(3)}`}
          </p>
        </div>
      </div>

      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {technologies.map((tag) => {
          const isMatched = matchedTechnologies.includes(tag);
          return (
            <span
              key={tag}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all ${
                isMatched
                  ? 'scale-105 bg-indigo-100 text-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-500/20 dark:bg-indigo-500/20 dark:text-indigo-300 dark:ring-indigo-500/30'
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
              }`}
            >
              {tag}
              {isMatched && (
                <svg className="ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
