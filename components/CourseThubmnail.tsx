"use client";

import React, { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const currentMedia = previewGallery[currentIndex];

  useEffect(() => {
    setPlayingVideoId(null);
  }, [currentIndex]);

  const handlePlayClick = () => {
    if (currentMedia.resource_type === "video") {
      setPlayingVideoId(currentMedia.resource_value);
    }
  };

  const handleClosePlayer = () => {
    setPlayingVideoId(null);
  };

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
    // Fallback for videos that might not have a thumbnail_url from the API
    return `https://img.youtube.com/vi/${item.resource_value}/mqdefault.jpg`;
  };

  const getCurrentMediaThumbnail = () => {
    if (currentMedia.resource_type === "video") {
      return (
        currentMedia.thumbnail_url ||
        `https://img.youtube.com/vi/${currentMedia.resource_value}/maxresdefault.jpg`
      );
    }
    return currentMedia.resource_value;
  };

  return (
    <div className="w-full rounded-lg overflow-hidden p-1">
      {/* Main Media Viewer */}
      <div className="relative aspect-video group bg-black">
        {/* --- CONDITIONAL VIDEO PLAYER --- */}
        {playingVideoId ? (
          <div className="w-full h-full relative">
            <iframe
              src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/80 text-white rounded-full w-8 h-8 p-0 z-10"
              onClick={handleClosePlayer}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <>
            <Image
              src={getCurrentMediaThumbnail()}
              alt="Course preview"
              className="w-full h-full object-cover"
              width={640}
              height={360}
              priority={true}
            />

            {currentMedia?.resource_type === "video" && (
              <>
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-50 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-white/90 hover:bg-white text-green-500 rounded-full w-16 h-16 p-0 shadow-lg transition-all duration-200 hover:scale-110"
                    onClick={handlePlayClick}
                  >
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {!playingVideoId && previewGallery.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-black rounded-full w-8 h-8 p-0 cursor-pointer"
              onClick={prevMedia}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-black rounded-full w-8 h-8 p-0 cursor-pointer"
              onClick={nextMedia}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="p-2">
        <div className="flex space-x-2">
          {previewGallery.map((item, index) => (
            <button
              key={index}
              className={cn(
                "flex-shrink-0 w-20 h-12 relative rounded-md overflow-hidden transition-all",
                index === currentIndex
                  ? "border-2 border-green-500"
                  : "opacity-70 hover:opacity-100"
              )}
              onClick={() => selectMedia(index)}
            >
              <Image
                src={getMediaThumbnail(item)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
                width={80}
                height={48}
              />

              {item.resource_type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="bg-black/60 rounded-full p-1">
                    <Play className="w-3 h-3 text-white" fill="currentColor" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseThumbnail;
