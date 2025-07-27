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

interface NavLinkProps {
  href: string;
  children: ReactNode;
  hasDropdown?: boolean;
}
const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  hasDropdown = false,
}) => (
  <li className="relative">
    <Link
      className="flex cursor-pointer items-center justify-center gap-0.5 text-sm font-medium text-[#4B5563] hover:text-green"
      href={href}
    >
      <p className="relative mb-0">{children}</p>
      {hasDropdown && <ChevronDownIcon />}
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
      className="flex cursor-pointer items-center gap-2 hover:text-green text-[#4B5563] text-xs font-medium mt-0.5"
      href={href}
    >
      <div className="flex items-center justify-center relative">
        <p className="relative mb-0">{children}</p>
        {hasDropdown && <ChevronDownIcon />}
      </div>
    </Link>
  </li>
);

// --- Navbar Props ---
interface NavbarProps {
  lang: string; // Language code, e.g., "en" or "bn";
  t: string; // The fetched course data
}

// --- Hardcoded translations for UI elements not in the API ---
const translations = {
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

const Navbar: React.FC<NavbarProps> = ({ lang, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = translations[lang].nav;
  const mobileNavItems = translations[lang].mobileNav;

  // Function to generate the URL for the other language
  const getLanguageToggleUrl = () => {
    const newLang = lang === "en" ? "bn" : "en";
    if (pathname) {
      // Replaces the lang part of the URL, e.g., /en/some-page -> /bn/some-page
      return pathname.replace(`/${lang}`, `/${newLang}`);
    }
    return `/${newLang}`; // Fallback
  };

  return (
    <div className="sticky top-0 z-50 border-b bg-white md:h-[65px]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 md:px-7">
        {/* Left side: Mobile menu toggle and logo */}
        <div className="flex gap-2">
          <button
            className="xl:hidden"
            type="button"
            name="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
            <span className="sr-only">menu</span>
          </button>
          <div className="md:hidden">
            <Link className="h-[27px] w-[100px]" href={`/${lang}`}>
              <img
                alt="10ms"
                src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
                fetchPriority="high"
                width="100"
                height="27"
                decoding="async"
                style={{ color: "transparent" }}
              />
            </Link>
          </div>
        </div>

        {/* Desktop Logo */}
        <div className="items-center hidden gap-9 md:flex">
          <Link className="h-[27px] w-[100px]" href={`/${lang}`}>
            <img
              alt="10ms"
              src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
              fetchPriority="high"
              width="100"
              height="27"
              decoding="async"
              style={{ color: "transparent" }}
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 hidden w-full pr-4 md:block">
          <div className="w-full">
            <div className="relative flex w-full flex-col items-center bg-white z-50">
              <div className="shadow-0 rounded-b-[23px] flex w-full items-center gap-2 rounded-t-[23px] border-0 px-[12px] py-2 md:border">
                <SearchIcon />
                <input
                  type="search"
                  autoComplete="off"
                  autoCorrect="off"
                  placeholder={translations[lang].searchPlaceholder}
                  className="w-full flex-1 placeholder:text-sm placeholder:font-normal placeholder:leading-5 placeholder:text-[#7C818A] focus:outline-none bg-transparent"
                  name="Search"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden mr-4 xl:block">
          <ul className="flex items-center gap-2 lg:gap-4">
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
          <div className="flex items-center gap-3 rounded-md border-1 max-h-96 md:gap-6">
            <span className="block bg-white md:hidden">
              <button>
                <SearchIcon />
              </button>
            </span>

            {/* Language Switcher */}
            <Link
              href={getLanguageToggleUrl()}
              className="hidden cursor-pointer items-center gap-1 rounded border px-2 py-[2px] hover:bg-slate-50 md:flex"
            >
              <LanguageIcon />
              <span>{lang === "en" ? "BN" : "EN"}</span>
            </Link>

            <a
              className="items-center hidden gap-1 text-green md:flex text-green-400"
              href="tel:16910"
            >
              <PhoneIcon />
              <span className="inline-block">16910</span>
            </a>
            <a
              className="flex items-center gap-1 text-green-500 md:hidden"
              href="tel:16910"
            >
              <MobilePhoneIcon />
            </a>
          </div>
          <div className="block">
            <a
              className="flex items-center px-3 py-1 text-white rounded-md bg-green-500 md:px-6"
              href="/auth/login/?returnUrl=%2Fproduct%2Fielts-course%2F"
            >
              <span
                id="login-button"
                className="leading-[18px] whitespace-nowrap text-[12px] font-semibold md:text-[16px] md:font-medium"
              >
                {/* Use API data if available, otherwise use fallback from translations object */}
                {t?.cta_text?.name || translations[lang].login}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="block md:hidden">
          <div className="flex items-center justify-between p-4 max-w-[350px] mx-auto">
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
