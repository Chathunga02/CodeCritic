export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 text-xs text-zinc-500 dark:text-zinc-500">
        <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Code<span className="text-indigo-600">Critic</span>
        </span>
        <span className="font-mono">&copy; 2026 CodeCritic. For developers, by developers.</span>
      </div>
    </footer>
  );
}
