"use client";

import React, { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Media } from "@/lib/course/types";
import Image from "next/image";

interface CourseThumbnailProps {
  media: Media[];
}

const CourseThumbnail = ({ media }: CourseThumbnailProps) => {
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

  const getMediaThumbnail = (item: Media) => {
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
    <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden p-1">
      {/* Main Media Viewer */}
      <div className="relative aspect-video group">
        <Image
          src={getCurrentMediaThumbnail()}
          alt="Course preview"
          className="w-full h-full object-cover"
          width={640}
          height={360}
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Play Button Overlay for Videos */}
        {currentMedia?.resource_type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              className="bg-white/90 hover:bg-white text-green-500 rounded-full w-16 h-16 p-0 shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
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
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-black rounded-full w-6 h-6 p-0  cursor-pointer"
              onClick={prevMedia}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-black rounded-full w-6 h-6 p-0 cursor-pointer"
              onClick={nextMedia}
            >
              <ChevronRight className="w-8 h-8" />
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
                  "flex-shrink-0 relative rounded-lg overflow-hidden",
                  index === currentIndex
                    ? "border-2 border-green-500"
                    : "opacity-70 hover:opacity-100"
                )}
                onClick={() => selectMedia(index)}
              >
                <Image
                  src={getMediaThumbnail(item)}
                  alt={`Preview ${index + 1}`}
                  className="h-10 object-cover"
                  width={90}
                  height={10}
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
