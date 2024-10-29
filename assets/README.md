# Assets Folder in Next.js 14

The **`assets`** folder in this Next.js 14 project is used to organize static resources such as images, fonts, icons, and other media that are imported directly into your components. This folder helps maintain a clean and structured file hierarchy, ensuring that assets are easily accessible within the application.

## Purpose

The **`assets`** folder is not a predefined folder in Next.js like the **`public`** folder, but it is a convention used to group assets that will be bundled with the JavaScript and used within your React components. Unlike files in the `public` folder, files inside `assets` cannot be directly accessed through a URL. Instead, these assets are imported into your components and optimized during the build process.

## Usage

You can place static files such as images, fonts, and icons inside the **`assets`** folder. To use them in your components, import them using JavaScript or TypeScript.

### Importing in Components:

To use an image or other asset from the `assets` folder, import it within your component like this:

```jsx
import logo from '@/assets/images/logo.png';

export default function Header() {
  return <img src={logo} alt="Company Logo" />;
}
