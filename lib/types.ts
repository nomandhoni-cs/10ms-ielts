// types.ts

// Define the expected structure for a single pointer item
export interface PointersValue {
  color: string;
  icon: string;
  id: string;
  text: string;
}

// Define the expected structure for the pointers section object
export interface PointersSection {
  type: "pointers";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: PointersValue[];
}

// Define the expected structure for a single instructor value object
export interface InstructorValue {
  description: string;
  has_instructor_page: boolean;
  image: string;
  name: string;
  short_description: string;
  slug: string;
}

// Define the expected structure for the instructor section object
export interface InstructorSection {
  type: "instructors";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: InstructorValue[];
}

// Define the expected structure for a single feature item
export interface FeatureValue {
  icon: string;
  id: string;
  subtitle: string;
  title: string;
}

// Define the expected structure for the features section object
export interface FeatureSection {
  type: "features";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: FeatureValue[];
}

// Define the expected structure for the background image
export interface Background {
  image: string;
  primary_color: string;
  secondary_color: string;
}

// Define the expected structure for the call to action (CTA)
export interface CTA {
  clicked_url: string;
  color: string;
  text: string;
}

// Define the expected structure for a single engagement value item
export interface GroupJoinEngagementValue {
  background: Background;
  cta: CTA;
  description: string;
  description_color: string;
  id: string;
  thumbnail: string;
  title: string;
  title_color: string;
  top_left_icon_img: string;
}

// Define the expected structure for the group_join_engagement section object
export interface GroupJoinEngagementSection {
  type: "group_join_engagement";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: GroupJoinEngagementValue[];
}

// Define the expected structure for a single about item
export interface AboutValue {
  description: string; // Contains HTML
  icon: string; // "0" in your data, likely unused or placeholder
  id: string;
  title: string; // Contains HTML
}

// Define the expected structure for the about section object
export interface AboutSection {
  type: "about";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: AboutValue[];
}

// Define the expected structure for a single feature explanation item
export interface FeatureExplanationsValue {
  checklist: string[];
  file_type: string;
  file_url: string;
  id: string;
  title: string;
  video_thumbnail: string;
}

// Define the expected structure for the feature_explanations section object
export interface FeatureExplanationsSection {
  type: "feature_explanations";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: FeatureExplanationsValue[];
}

// Define the expected structure for a single testimonial item
export interface TestimonialsValue {
  description: string;
  id: string;
  name: string;
  profile_image: string;
  testimonial: string;
  thumb: string; // Thumbnail for video
  video_type: string;
  video_url: string; // YouTube video ID or full URL
}

// Define the expected structure for the testimonials section object
export interface TestimonialsSection {
  type: "testimonials";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: TestimonialsValue[];
}

// Define the expected structure for a single FAQ item
export interface FaqValue {
  answer: string; // Contains HTML
  id: string;
  question: string;
}

// Define the expected structure for the FAQ section object
export interface FaqSection {
  type: "faq";
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: FaqValue[];
}

// Define a union type for all possible section types
export type Section =
  | PointersSection
  | InstructorSection
  | FeatureSection
  | GroupJoinEngagementSection
  | AboutSection
  | FeatureExplanationsSection
  | TestimonialsSection
  | FaqSection; // Added FaqSection to the union type

// Define the main CourseData interface
export interface CourseData {
  title: string;
  description: string;
  media: Array<{ name: string; resource_value: string }>;
  checklist: any[]; // Consider defining a more specific type if possible
  cta_text: string;
  sections: Section[];
  slug: string;
  // Add any other top-level properties of your courseData here
}
