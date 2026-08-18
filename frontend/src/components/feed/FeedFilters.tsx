"use client";

import { useEffect, useState } from "react";
import { useFeedFilters } from "@/store/feedFilters";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/services/api";
import { Technology } from "@/types/submission";

export function FeedFilters() {
  const { search, technologies, setSearch, setTechnologies, clearFilters } = useFeedFilters();
  const { isLoaded, userId } = useAuthStore();
  
  const [availableTechs, setAvailableTechs] = useState<Technology[]>([]);
  const [localSearch, setLocalSearch] = useState(search);

  // Fetch technologies
  useEffect(() => {
    async function fetchTechs() {
      try {
        const res = await api.get<Technology[]>("/technologies");
        if (res.success) {
          setAvailableTechs(res.data);
        }
      } catch (err) {
        console.error("Failed to load technologies", err);
      }
    }
    fetchTechs();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  const toggleTech = (name: string) => {
    if (technologies.includes(name)) {
      setTechnologies(technologies.filter(t => t !== name));
    } else {
      setTechnologies([...technologies, name]);
    }
  };

  const hasFilters = search.trim().length > 0 || technologies.length > 0;
  const showWarning = isLoaded && !!userId && hasFilters;

  return (
    <div className="mb-8 space-y-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search submissions..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
          />
        </div>
        
        {hasFilters && (
          <button
            onClick={() => {
              setLocalSearch('');
              clearFilters();
            }}
            className="text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTechs.map((tech) => {
          const isSelected = technologies.includes(tech.name);
          return (
            <button
              key={tech.id}
              onClick={() => toggleTech(tech.name)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                isSelected
                  ? "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"
              }`}
            >
              {tech.name}
            </button>
          );
        })}
      </div>

      {showWarning && (
        <div className="mt-4 rounded-md bg-blue-50 p-3 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 flex items-start gap-2">
          <span>ℹ️</span>
          <p>
            <strong>Note:</strong> Active filters switch your view to the public feed. Clear filters to return to your personalized recommendation feed.
          </p>
        </div>
      )}
    </div>
  );
}
