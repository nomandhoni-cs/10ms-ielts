// src/types/course.ts  (or wherever you prefer to keep your types)

export interface InstructorSection {
  type: "instructors";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: InstructorValue[];
}
export // Define the expected structure for the instructor value object for better type safety
interface InstructorValue {
  description: string;
  has_instructor_page: boolean;
  image: string;
  name: string;
  short_description: string;
  slug: string;
}

// --- Primitive and Shared Interfaces ---
export interface Media {
  name: string;
  resource_type: "video" | "image";
  resource_value: string;
  thumbnail_url: string;
}

export interface ChecklistItem {
  color: string;
  icon: string;
  id: string;
  list_page_visibility: boolean;
  text: string;
}

export interface CtaText {
  name: string;
  value: string;
}

// --- Interfaces for Section Values ---
export interface Instructor {
  description: string;
  has_instructor_page: boolean;
  image: string;
  name: string;
  short_description: string;
  slug: string;
}

export interface Feature {
  icon: string;
  id: string;
  subtitle: string;
  title: string;
}

// Define the expected structure for the features section object
interface FeatureSection {
  type: "features";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: Feature[];
}

export interface Pointer {
  color: string;
  icon: string;
  id: string;
  text: string;
}

export interface About {
  description: string;
  icon: string;
  id: string;
  title: string;
}

export interface FeatureExplanation {
  checklist: string[];
  file_type: string;
  file_url: string;
  id: string;
  title: string;
  video_thumbnail: string;
}

export interface Testimonial {
  description: string;
  id: string;
  name: string;
  profile_image: string;
  testimonial: string;
  thumb: string;
  video_type: string;
  video_url: string;
}

export interface Faq {
  answer: string;
  id: string;
  question: string;
}

// --- Discriminated Union for Sections ---
// This allows TypeScript to know the shape of `values` based on the `type` property.

type SectionType<T, V> = {
  type: T;
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: V[];
};

export type Section =
  | SectionType<"instructors", Instructor>
  | SectionType<"features", Feature>
  | SectionType<"pointers", Pointer>
  | SectionType<"about", About>
  | SectionType<"feature_explanations", FeatureExplanation>
  | SectionType<"testimonials", Testimonial>
  | SectionType<"faq", Faq>
  | SectionType<"group_join_engagement", any> // Add specific type if needed
  | SectionType<"offers", any>; // Add specific type if needed

// --- Main Course Data Structure ---
export interface CourseData {
  title: string;
  description: string;
  media: Media[];
  checklist: ChecklistItem[];
  cta_text: CtaText;
  sections: Section[];
  // Include other top-level fields from `data` if you need them
  slug: string;
  id: number;
}

// --- API Response Wrapper ---
export interface ApiResponse {
  data: CourseData;
}

export type Language = "en" | "bn";
