
# Course Landing Page - Next.js & Tailwind CSS

This project is a dynamic, fully-featured course landing page built with **Next.js** and styled with **Tailwind CSS**. It is designed to be a type-safe, component-based application that fetches all its content from the [10 Minute School API](https://api.10minuteschool.com).

The page presents a comprehensive overview of a course, including instructor details, features, downloadable resources, key learning points, student testimonials, and a fully functional, debounced search component.

<img width="1905" height="917" alt="image" src="https://github.com/user-attachments/assets/e70426f5-2377-4658-8ee4-b8e3856eb176" />

## ✨ Features

-   **Dynamic Content Loading**: Fetches all course-related data from `api.10minuteschool.com`.
-   **Responsive Design**: Built with Tailwind CSS for optimal viewing across all devices (mobile, tablet, desktop).
-   **Modular Components**: Organized into reusable React components for clean code and maintainability.
-   **Type-Safe Development**: Utilizes TypeScript with centralized type definitions (`lib/course/types.ts`) for robust and error-free data handling.
-   **Interactive Elements**:
    -   **Accordion/Details Sections**: For "About Course" and "FAQ", using native HTML `<details>` elements styled with Tailwind's `group-open` variant.
    -   **Video Player**: Interactive thumbnail gallery with a modal video player for YouTube embeds.
    -   **Slide-Out Mobile Menu**: A smooth, animated side navigation drawer for a modern mobile UX.
-   **Image Optimization**: Leverages `next/image` for optimized loading of external images.
-   **Error Handling**: Includes a custom, user-friendly 404 "Not Found" page.
-   **⭐ Functional Search Box**: A key feature of this project is the interactive search bar. It fetches live suggestions from the API as the user types, with debouncing to ensure efficient network requests.

---

## 🚀 Technologies Used

-   **Next.js**: React framework for Server-Side Rendering (SSR) and modern web features.
-   **React**: JavaScript library for building user interfaces.
-   **TypeScript**: A superset of JavaScript that adds static typing for more reliable code.
-   **Tailwind CSS**: A utility-first CSS framework for rapid and custom UI development.
-   **Lucide React**: A beautiful, customizable, and open-source icon library.

---

## 🔧 Setup and Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://your-repository-url.com/project.git
    cd project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Running the Development Server

To start the local development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The page will automatically update as you edit the files.

---

## ⚙️ Configuration

### Next.js Image Domains (`next.config.js`)

This project uses `next/image` for optimized image loading. To prevent "unconfigured host" errors, ensure that all external image domains are whitelisted in your `next.config.js` file.

**Example `next.config.js`:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.10minuteschool.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-southeast-1.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // For video thumbnails
        pathname: '**',
      },
      // Add other external image domains here if needed
    ],
  },
  /* other config options */
};

export default nextConfig;
```

> **Note:** Remember to restart your development server after making any changes to `next.config.js`.

---

## 🔎 Functional SearchBox Component

A standout feature is the **`SearchBar`** component, which provides a live search experience.

-   **Debounced API Calls**: It uses a custom `useDebounce` hook to delay API requests until the user has stopped typing for 300ms, preventing excessive network traffic.
-   **Live Suggestions**: Fetches and displays a dropdown of relevant search results as the user types.
-   **API Endpoint**: It integrates with the following `10 Minute School` search API:
    ```
    https://api.10minuteschool.com/discovery-service/api/v1/search/guides?query=YOUR_QUERY
    ```
-   **Rich Results**: The component correctly renders results that contain HTML, such as `<mark>` tags for highlighting the search term.

---

## 🏛️ Project Structure

The application is structured for scalability and clarity.

-   **`app/`**: Contains the main routing and page layouts, following the Next.js App Router convention.
-   **`components/`**: Holds all reusable React components (`Navbar`, `SearchBar`, `CourseHeader`, etc.).
-   **`lib/`**: Core logic and utilities.
    -   `lib/course/types.ts`: Centralized TypeScript interfaces for all API data structures.
    -   `lib/utils.ts`: Utility functions (e.g., for `cn` from `clsx`).
-   **`hooks/`**: Custom React hooks, such as `useDebounce`.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
