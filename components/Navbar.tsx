"use client";

import React, { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import {
  LanguageIcon,
  MenuIcon,
  MobilePhoneIcon,
  PhoneIcon,
  SearchIcon,
} from "./AllIcons";
import { Language } from "@/lib/course/types";

// --- Type Definitions ---

// Interface for a single navigation link object
interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

// Interface for the content of one language in our translations object
interface TranslationContent {
  nav: NavItem[];
  mobileNav: NavItem[];
  searchPlaceholder: string;
  login: string;
}

// Props for the NavLink components (this was already well-defined)
interface NavLinkProps {
  href: string;
  children: ReactNode;
  hasDropdown?: boolean;
}

// Props for the main Navbar component
interface NavbarProps {
  lang: Language; // Use the specific Language type
  // 't' prop is removed as it was unused. If you need it, add it back.
}

// --- Components ---

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  hasDropdown = false,
}) => (
  <li className="relative">
    <Link
      className="flex cursor-pointer items-center justify-center gap-0.5 text-sm font-medium text-[#4B5563] hover:text-green-500"
      href={href}
    >
      <p className="relative mb-0">{children}</p>
      {hasDropdown && <ChevronDownIcon className="w-4 h-4" />}
    </Link>
  </li>
);

const MobileNavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  hasDropdown = false,
}) => (
  <li className="relative list-none">
    <Link
      className="flex cursor-pointer items-center gap-2 hover:text-green-500 text-[#4B5563] text-xs font-medium mt-0.5"
      href={href}
    >
      <div className="flex items-center justify-center relative">
        <p className="relative mb-0">{children}</p>
        {hasDropdown && <ChevronDownIcon className="w-4 h-4" />}
      </div>
    </Link>
  </li>
);

// --- Typed Data Object ---

// Using Record<Language, TranslationContent> provides full type-safety
const translations: Record<Language, TranslationContent> = {
  en: {
    nav: [
      { href: "/academic/", label: "Class 6-12", hasDropdown: true },
      { href: "/skills/", label: "Skills", hasDropdown: true },
      { href: "/admission/", label: "Admission Test" },
      { href: "/online-batch/", label: "Online Batch", hasDropdown: true },
      { href: "/english-centre/", label: "English Center", hasDropdown: true },
      { href: "#", label: "More", hasDropdown: true },
    ],
    mobileNav: [
      { href: "#", label: "Class 6-12", hasDropdown: true },
      { href: "#", label: "Skills", hasDropdown: true },
      { href: "/admission", label: "Admission Test" },
      { href: "#", label: "More", hasDropdown: true },
    ],
    searchPlaceholder: "Search for skills, courses, or programs...",
    login: "Login",
  },
  bn: {
    nav: [
      { href: "/academic/", label: "ক্লাস ৬-১২", hasDropdown: true },
      { href: "/skills/", label: "স্কিলস", hasDropdown: true },
      { href: "/admission/", label: "ভর্তি পরীক্ষা" },
      { href: "/online-batch/", label: "অনলাইন ব্যাচ", hasDropdown: true },
      { href: "/english-centre/", label: "ইংলিশ সেন্টার", hasDropdown: true },
      { href: "#", label: "আরো", hasDropdown: true },
    ],
    mobileNav: [
      { href: "#", label: "ক্লাস ৬-১২", hasDropdown: true },
      { href: "#", label: "স্কিলস", hasDropdown: true },
      { href: "/admission", label: "ভর্তি পরীক্ষা" },
      { href: "#", label: "আরো", hasDropdown: true },
    ],
    searchPlaceholder: "স্কিলস কোর্স, কিংবা স্কুল প্রোগ্রাম সার্চ করুন...",
    login: "লগ-ইন",
  },
};

const Navbar: React.FC<NavbarProps> = ({ lang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // --- FIX: Define variables by selecting from the translations object ---
  const {
    nav: navItems,
    mobileNav: mobileNavItems,
    searchPlaceholder,
    login,
  } = translations[lang];

  const getLanguageToggleUrl = () => {
    const newLang = lang === "en" ? "bn" : "en";
    return pathname
      ? pathname.replace(`/${lang}`, `/${newLang}`)
      : `/${newLang}`;
  };

  return (
    <div className="sticky top-0 z-50 border-b bg-white md:h-[65px]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 md:px-7">
        {/* Left side */}
        <div className="flex items-center gap-2">
          <button
            className="xl:hidden"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
            <span className="sr-only">menu</span>
          </button>
          <Link className="h-[27px] w-[100px]" href={`/${lang}`}>
            <img
              alt="10ms"
              src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
              width="100"
              height="27"
              style={{ color: "transparent" }}
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 hidden w-full pr-4 md:block">
          <div className="relative flex w-full items-center bg-white z-50">
            <div className="shadow-0 rounded-full flex w-full items-center gap-2 border px-[12px] py-2">
              <SearchIcon />
              <input
                type="search"
                autoComplete="off"
                className="w-full flex-1 placeholder:text-sm focus:outline-none bg-transparent"
                name="Search"
                // --- FIX: Use the dynamic placeholder text ---
                placeholder={searchPlaceholder}
              />
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden mr-4 xl:block">
          <ul className="flex items-center gap-2 lg:gap-4">
            {/* --- FIX: Use the defined 'navItems' variable --- */}
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                hasDropdown={item.hasDropdown}
              >
                {item.label}
              </NavLink>
            ))}
          </ul>
        </nav>

        {/* Right side: Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="flex items-center gap-3 md:gap-6">
            <button className="block bg-white md:hidden">
              <SearchIcon />
            </button>
            <Link
              href={getLanguageToggleUrl()}
              className="hidden items-center gap-1 rounded border px-2 py-1 hover:bg-slate-50 md:flex"
            >
              <LanguageIcon />
              <span>{lang === "en" ? "BN" : "EN"}</span>
            </Link>
            <a
              className="hidden items-center gap-1 text-green-500 md:flex"
              href="tel:16910"
            >
              <PhoneIcon />
              <span>16910</span>
            </a>
            <a
              className="flex items-center gap-1 text-green-500 md:hidden"
              href="tel:16910"
            >
              <MobilePhoneIcon />
            </a>
          </div>
          <a
            className="flex items-center px-3 py-1 text-white rounded-md bg-green-500 md:px-6"
            href={`/auth/login/?returnUrl=${pathname}`}
          >
            <span className="whitespace-nowrap text-xs font-semibold md:text-base md:font-medium">
              {/* --- FIX: Use the defined 'login' variable --- */}
              {login}
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="block xl:hidden border-t">
          <div className="flex items-center justify-between p-4 max-w-[450px] mx-auto">
            {/* --- FIX: Use the defined 'mobileNavItems' variable --- */}
            {mobileNavItems.map((item) => (
              <MobileNavLink
                key={item.label}
                href={item.href}
                hasDropdown={item.hasDropdown}
              >
                {item.label}
              </MobileNavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
