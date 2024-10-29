# Gejayan

This repository is the foundation for all upcoming projects within our company. It provides a well-structured template to ensure that every project follows the same standards, making development smoother and more efficient.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Build](#build)
- [Test](#test)
- [Storybook](#storybook)
- [Code Style](#code-style)
- [Changelog](#changelog)

## Tech Stack

This project utilizes the following technologies:

- **[Next.js](https://nextjs.org/)**: A powerful React framework for server-side rendering and static site generation.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript, helping to catch errors early and improve code quality.
- **[Tailwind CSS](https://tailwindcss.com/)**: A highly customizable, utility-first CSS framework, allowing for rapid UI development.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone http://gitlab.runsystemdev.com/runsystem_dev/components/sample/gejayan.git
   cd gejayan
   ```

2. **Install dependencies using Yarn**:
   ```bash
   yarn install
   ```

This will download and install all the necessary packages.

## Build

To create an optimized production build of the project, run the following command:

```bash
yarn build
```

This will bundle the application and make it ready for deployment.

## Test

You can run the test suite using the following command:

```bash
yarn test
```

This will execute all unit and integration tests, ensuring the code behaves as expected.

## Storybook

We use Storybook to develop and showcase isolated UI components. To start Storybook locally, run:

```bash
yarn storybook
```

This will launch Storybook in your default browser, providing a visual overview of the components.

## Code Style

For coding conventions, please refer to our [Code Style Guidelines](./CODE_STYLE.md). It’s important to follow these guidelines to maintain consistency across projects.

## Changelog

You can track all project updates and changes by visiting the [Changelog](./CHANGELOG.md).
