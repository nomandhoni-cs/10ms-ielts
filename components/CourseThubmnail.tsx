"use client";

import React, { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MediaItem {
  name: string;
  resource_type: "video" | "image";
  resource_value: string;
  thumbnail_url?: string;
}

interface CourseThumbnailProps {
  media: MediaItem[];
}

const CourseThumbnail = ({ media }: CourseThumbnailProps) => {
  // Filter preview gallery items for the main carousel
  const previewGallery = media.filter(
    (item) => item.name === "preview_gallery"
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMedia = previewGallery[currentIndex];

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % previewGallery.length);
  };

  const prevMedia = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + previewGallery.length) % previewGallery.length
    );
  };

  const selectMedia = (index: number) => {
    setCurrentIndex(index);
  };

  const getMediaThumbnail = (item: MediaItem) => {
    if (item.resource_type === "video" && item.thumbnail_url) {
      return item.thumbnail_url;
    }
    if (item.resource_type === "image") {
      return item.resource_value;
    }
    return item.thumbnail_url || "";
  };

  const getYoutubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const getCurrentMediaThumbnail = () => {
    if (currentMedia.resource_type === "video") {
      return (
        currentMedia.thumbnail_url ||
        getYoutubeThumbnail(currentMedia.resource_value)
      );
    }
    return currentMedia.resource_value;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-1">
      {/* Main Media Viewer */}
      <div className="relative aspect-video group">
        <img
          src={getCurrentMediaThumbnail()}
          alt="Course preview"
          className="w-full h-full object-cover"
        />

        {/* Play Button Overlay for Videos */}
        {currentMedia?.resource_type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              className="bg-white/90 hover:bg-white text-green-500 rounded-full w-16 h-16 p-0 shadow-lg transition-all duration-200 hover:scale-110"
            >
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </Button>
          </div>
        )}

        {/* Navigation Arrows */}
        {previewGallery.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevMedia}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextMedia}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Thumbnail Gallery */}
        <div className="p-3">
          <div className="flex space-x-3 overflow-hidden scrollbar-hide">
            {previewGallery.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "flex-shrink-0 relative rounded-lg overflow-hidden transition-all duration-200 hover:scale-105",
                  index === currentIndex
                    ? "border-2 border-green-500"
                    : "opacity-70 hover:opacity-100"
                )}
                onClick={() => selectMedia(index)}
              >
                <img
                  src={getMediaThumbnail(item)}
                  alt={`Preview ${index + 1}`}
                  className="h-10 object-cover"
                />

                {/* Play icon overlay for video thumbnails */}
                {item.resource_type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 rounded-full p-1">
                      <Play
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseThumbnail;
