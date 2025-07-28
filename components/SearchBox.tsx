"use client";

import React, { useState, useEffect, useRef } from "react";
import { SearchIcon } from "./AllIcons"; // Assuming you have this
import { SearchResultItem, SearchApiResponse } from "@/lib/course/types";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBox: React.FC<SearchBarProps> = ({ placeholder }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedQuery = useDebounce(query, 300); // 300ms delay
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- API Fetching Logic ---
    const searchItems = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.10minuteschool.com/discovery-service/api/v1/search/guides?query=${encodeURIComponent(
            debouncedQuery
          )}`
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data: SearchApiResponse = await response.json();
        setResults(data.data.items || []);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setResults([]); // Clear results on error
      } finally {
        setIsLoading(false);
      }
    };

    searchItems();
  }, [debouncedQuery]);

  // --- Click Outside Logic ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus = () => setIsFocused(true);

  // Function to close dropdown and clear input on link click
  const handleLinkClick = () => {
    setQuery("");
    setResults([]);
    setIsFocused(false);
  };

  const showDropdown = isFocused && query.length > 0;

  return (
    <div className="relative w-full flex-1" ref={searchContainerRef}>
      <div className="shadow-0 rounded-full flex w-full items-center gap-2 border border-gray-300 px-3 py-2">
        <SearchIcon />
        <input
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          className="w-full flex-1 placeholder:text-sm focus:outline-none bg-transparent"
          placeholder={placeholder || "Search for courses..."}
        />
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[70vh] overflow-y-auto">
          {results.length > 0 ? (
            <ul>
              {results.map((item) => (
                <li key={item.id} className="border-b last:border-b-0">
                  <Link
                    href={`/${item.taxonomy.vertical}/${item.slug}`}
                    className="block cursor-pointer px-4 py-3 hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    {item.context === "product" && item.image ? (
                      // Product Layout
                      <div className="flex items-center justify-start gap-3">
                        <Image
                          src={item.image}
                          alt={item.text}
                          width={42}
                          height={42}
                          className="rounded-md object-cover"
                        />
                        <div className="flex flex-col">
                          <div
                            className="line-clamp-1 text-sm font-semibold text-[#111827]"
                            dangerouslySetInnerHTML={{ __html: item.text }}
                          />
                          {item.sub_text && (
                            <div className="text-xs text-gray-500">
                              {item.sub_text}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Phrase Layout
                      <div className="flex items-center gap-3 text-sm font-normal text-gray-600">
                        <SearchIcon />
                        <div
                          className="truncate"
                          dangerouslySetInnerHTML={{ __html: item.text }}
                        />
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && (
              <p className="p-4 text-center text-sm text-gray-500">
                No results found for "{query}"
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
