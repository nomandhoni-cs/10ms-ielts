"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDownIcon, X } from "lucide-react";
import {
  LanguageIcon,
  MenuIcon,
  MobilePhoneIcon,
  PhoneIcon,
  SearchIcon,
} from "./AllIcons";
import { Language } from "@/lib/course/types";
import { cn } from "@/lib/utils";

// --- Type Definitions ---
interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}
interface TranslationContent {
  nav: NavItem[];
  mobileNav: NavItem[];
  searchPlaceholder: string;
  login: string;
}
interface NavLinkProps {
  href: string;
  children: ReactNode;
  hasDropdown?: boolean;
}
interface NavbarProps {
  lang: Language;
}

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

const SideNavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  hasDropdown = false,
}) => (
  <li className="list-none">
    <Link
      className="flex items-center justify-between w-full p-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100"
      href={href}
    >
      <span>{children}</span>
      {hasDropdown && <ChevronDownIcon className="w-5 h-5" />}
    </Link>
  </li>
);

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

  const {
    nav: navItems,
    mobileNav: mobileNavItems,
    searchPlaceholder,
    login,
  } = translations[lang];

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  const getLanguageToggleUrl = () => {
    const newLang = lang === "en" ? "bn" : "en";
    return pathname
      ? pathname.replace(`/${lang}`, `/${newLang}`)
      : `/${newLang}`;
  };

  return (
    <>
      <div className="sticky top-0 z-30 border-b bg-white md:h-[65px]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 md:px-7">
          {/* Left side: Hamburger menu button and logo */}
          <div className="flex items-center gap-2">
            <button
              className="xl:hidden"
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon />
            </button>
            <Link className="h-[27px] w-[100px]" href={`/${lang}`}>
              <img
                alt="10ms"
                src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
                width="100"
                height="27"
              />
            </Link>
          </div>
          <div className="flex-1 hidden w-full pr-4 md:block">
            <div className="relative flex w-full items-center bg-white z-50">
              <div className="shadow-0 rounded-full flex w-full items-center gap-2 border px-[12px] py-2">
                <SearchIcon />
                <input
                  type="search"
                  autoComplete="off"
                  className="w-full flex-1 placeholder:text-sm focus:outline-none bg-transparent"
                  name="Search"
                  placeholder={searchPlaceholder}
                />
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
                className="hidden items-center gap-1 text-green-600 md:flex"
                href="tel:16910"
              >
                <PhoneIcon />
                <span>16910</span>
              </a>
              <a
                className="flex items-center gap-1 text-green-600 md:hidden"
                href="tel:16910"
              >
                <MobilePhoneIcon />
              </a>
            </div>
            <a
              className="flex items-center px-3 py-1 text-white rounded-md bg-green-600 md:px-6"
              href={`/auth/login/?returnUrl=${pathname}`}
            >
              <span className="whitespace-nowrap text-xs font-semibold md:text-base md:font-medium">
                {login}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* --- Mobile Slide-Out Menu --- */}
      <div
        className={cn(
          "fixed inset-0 z-40 h-screen w-screen bg-black/30 transition-opacity xl:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={cn(
            "fixed left-0 top-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link className="h-[27px] w-[100px]" href={`/${lang}`}>
              <img
                alt="10ms"
                src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
                width="100"
                height="27"
              />
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="p-4">
            <ul className="flex flex-col gap-2">
              {mobileNavItems.map((item) => (
                <SideNavLink
                  key={item.label}
                  href={item.href}
                  hasDropdown={item.hasDropdown}
                >
                  {item.label}
                </SideNavLink>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
