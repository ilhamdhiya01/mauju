## Types Folder Purpose

The **`types`** folder serves the following purposes:

- **Type Definitions**: It centralizes all type definitions used in the application, making it easier to manage and find them.
- **Code Quality and Safety**: By defining types for requests, responses, and client state, you enhance the type safety of your application, helping to catch errors during development.
- **Improved Developer Experience**: Type definitions provide better autocompletion and inline documentation in IDEs, which can speed up development and reduce the likelihood of bugs.

## Subfolder: API

The **`api`** subfolder is dedicated to storing type definitions for API requests and responses.

### Key Files

1. **`requestTypes.ts`**:

   - This file contains TypeScript interfaces or types that define the structure of the data being sent to the API (request payloads).
   - Example:

     ```typescript
     // types/api/requestTypes.ts

     export interface CreateUserRequest {
       username: string;
       email: string;
       password: string;
     }

     export interface UpdateUserRequest {
       id: string;
       username?: string;
       email?: string;
     }
     ```

2. **`responseTypes.ts`**:

   - This file contains TypeScript interfaces or types that define the structure of the data returned from the API (response payloads).
   - Example:

     ```typescript
     // types/api/responseTypes.ts

     export interface UserResponse {
       id: string;
       username: string;
       email: string;
       createdAt: string;
     }

     export interface UserListResponse {
       users: UserResponse[];
       totalCount: number;
     }
     ```

## Subfolder: Client

The **`client`** subfolder is focused on storing type definitions relevant to the client-side, particularly for state management and reusable components.

### Key Files

1. **`storeTypes.ts`**:

   - This file contains TypeScript types related to the global state managed by Zustand or any other state management library used in your application.
   - Example:

     ```typescript
     // types/client/storeTypes.ts

     export interface UserState {
       id: string;
       username: string;
       email: string;
       isLoggedIn: boolean;
     }

     export interface AppState {
       user: UserState | null;
       count: number;
     }
     ```

2. **`componentTypes.ts`**:

   - This file defines types for props and state used in reusable components across your application.
   - Example:

     ```typescript
     // types/client/componentTypes.ts

     export interface ButtonProps {
       label: string;
       onClick: () => void;
       disabled?: boolean;
     }

     export interface InputProps {
       value: string;
       onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
       placeholder?: string;
     }
     ```

## Usage Guidelines

### 1. **Defining API Types**

When defining types for API requests or responses, ensure that you create a clear structure in the **`api`** subfolder. This will help in maintaining consistency and making it easy for developers to find and use them.

Example of using API request types:

```typescript
import { CreateUserRequest } from '@/types/api/requestTypes';

const createUser = async (data: CreateUserRequest) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};
```
