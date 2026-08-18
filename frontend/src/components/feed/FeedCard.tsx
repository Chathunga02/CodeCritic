import Link from "next/link";
import { FeedSubmission } from "@/types/feed";

interface FeedCardProps {
  item: FeedSubmission;
}

export function FeedCard({ item }: FeedCardProps) {
  const isReviewed = item._count.reviews > 0;

  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link
      href={`/submissions/${item.id}`}
      className="block group rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-800"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
        {isReviewed ? (
          <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/20">
            {item._count.reviews} review{item._count.reviews !== 1 ? 's' : ''}
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-500/20">
            Pending
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.technologies.map((tech) => {
          const isMatched = item.matchedTechnologies?.includes(tech.name);
          return (
            <span
              key={tech.id}
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                isMatched
                  ? 'bg-indigo-50 text-indigo-700 ring-indigo-600/20 dark:bg-indigo-900/40 dark:text-indigo-300 dark:ring-indigo-500/30'
                  : 'bg-zinc-50 text-zinc-600 ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-700'
              }`}
            >
              {tech.name}
            </span>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {item.author.username.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-zinc-700 dark:text-zinc-300">@{item.author.username}</span>
        </div>
        <div className="flex items-center gap-3">
          {item._score !== undefined && (
            <span className="font-mono text-indigo-500/70" title="Score (Debug Mode)">
              ⭐ {item._score.toFixed(3)}
            </span>
          )}
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
