"use client";

import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const { username, karma } = useAuthStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUiStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50" onClick={closeMobileMenu}>
          Code<span className="text-indigo-600">Critic</span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <Link href="/" className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Feed</Link>
          {isSignedIn ? (
            <>
              <Link href="/submissions/new" className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Submit</Link>
              <span title="Your karma" className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                ⚡ {karma}
              </span>
              <UserButton appearance={{ elements: { avatarBox: "h-7 w-7" } }} userProfileUrl="/me" />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/sign-in" className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Sign in</Link>
              <Link href="/sign-up" className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700">Sign up</Link>
            </div>
          )}
        </div>

        <button className="flex items-center sm:hidden" onClick={toggleMobileMenu} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
          {isMobileMenuOpen ? (
            <svg className="h-5 w-5 text-zinc-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-zinc-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 sm:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" onClick={closeMobileMenu} className="text-sm text-zinc-700 dark:text-zinc-300">Feed</Link>
            {isSignedIn ? (
              <>
                <Link href="/submissions/new" onClick={closeMobileMenu} className="text-sm text-zinc-700 dark:text-zinc-300">Submit</Link>
                <Link href="/me" onClick={closeMobileMenu} className="text-sm text-zinc-700 dark:text-zinc-300">{username}</Link>
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">⚡ {karma}</span>
              </>
            ) : (
              <>
                <Link href="/sign-in" onClick={closeMobileMenu} className="text-sm text-zinc-700 dark:text-zinc-300">Sign in</Link>
                <Link href="/sign-up" onClick={closeMobileMenu} className="text-sm font-medium text-indigo-600">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
