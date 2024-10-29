# Public Folder in Next.js 14

## Overview

The **`public`** folder in Next.js 14 is used to store static files that are directly accessible by the browser. This folder allows you to organize and manage static assets like images, fonts, or other media files that need to be served as-is without any processing by the build system.

Files placed inside the `public` folder are accessible from the root of the project URL. For example, if you place a file called `logo.png` in the `public` folder, it will be available at `https://yourdomain.com/logo.png`.

## Usage

### How to Access Files

All files inside the `public` folder are served at the root of the domain. The file path in the `public` folder corresponds directly to the URL path.

For example:
- A file located at `public/logo.png` can be accessed via the URL `/logo.png`.
- A file located at `public/images/banner.jpg` can be accessed via the URL `/images/banner.jpg`.

You can reference files from the `public` folder directly in your Next.js components using relative paths:

```jsx
// Example of using an image from the public folder in a component
<img src="/logo.png" alt="Logo" />
