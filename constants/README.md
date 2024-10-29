# Constant Folder in Next.js 14

## Overview

The **`constant`** folder in a **Next.js 14** project is used to store application-wide constants and configuration values that need to be accessed in multiple parts of the application. By organizing constants in this folder, you ensure that values such as API endpoints, static data, configuration settings, and other globally-used variables are centralized, making them easier to manage and maintain.

## Purpose

The **`constant`** folder serves the following key purposes:

- **Reusability**: Instead of hardcoding the same value in multiple places, constants allow you to define the value once and reuse it throughout the application.
- **Maintainability**: When you need to change a constant (e.g., an API URL), you can update it in one place without searching through the entire codebase.
- **Centralized Configuration**: It simplifies managing global configurations, feature flags, and environment-specific variables.

## Folder Structure

The structure of the **`constant`** folder can vary based on your project needs, but here’s an example layout:

### Example Files

1. **api.ts**

   - Stores constants related to API endpoints.
   - These endpoints can be imported and used anywhere in the application.

   ```ts
   // constant/api.ts
   export const API_BASE_URL = 'https://api.example.com';
   export const BUDGET_REQUEST_ENDPOINT = `${API_BASE_URL}/budget-request`;
   export const USER_PROFILE_ENDPOINT = `${API_BASE_URL}/user-profile`;
   ```
