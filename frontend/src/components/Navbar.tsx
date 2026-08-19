"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const { username, karma } = useAuthStore();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUiStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50" onClick={closeMobileMenu}>
          Code<span className="text-indigo-600">Critic</span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <Link href="/" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
            Feed
          </Link>
          {isSignedIn ? (
            <>
              <Link href="/submissions/new" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                Submit
              </Link>
              <span title="Your karma" className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                ⚡ {karma}
              </span>

              {/* Profile dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ring-2 ring-transparent transition hover:ring-indigo-400 focus:outline-none"
                  aria-label="Profile menu"
                >
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt={username ?? "Profile"} className="h-full w-full object-cover" />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-indigo-600 text-xs font-semibold text-white">
                      {(username ?? "U")[0].toUpperCase()}
                    </span>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="border-b border-zinc-100 px-4 py-2 dark:border-zinc-800">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">@{username}</p>
                      <p className="text-xs text-zinc-400">⚡ {karma} karma</p>
                    </div>
                    <Link
                      href="/me"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      My profile
                    </Link>
                    <Link
                      href="/me/requests"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      My submissions
                    </Link>
                    <Link
                      href="/me/reviews"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Reviews given
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Settings
                    </Link>
                    <div className="border-t border-zinc-100 dark:border-zinc-800">
                      <Link
                        href="/sign-out"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-red-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      >
                        Sign out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/sign-in" className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Sign in</Link>
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
                <Link href="/me" onClick={closeMobileMenu} className="text-sm text-zinc-700 dark:text-zinc-300">My profile</Link>
                <Link href="/settings" onClick={closeMobileMenu} className="text-sm text-zinc-700 dark:text-zinc-300">Settings</Link>
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
