## Store Folder Purpose

The **`store`** folder serves several purposes:

- **Global State Management**: It allows you to define and manage global state that can be accessed from any component in the application.
- **Centralized Logic**: It keeps all state-related logic in one place, which helps maintain a clean separation of concerns and makes the application easier to understand.
- **Performance**: Zustand is optimized for performance, enabling selective re-renders of components based on the state changes.

## Key Files

### 1. **`index.js`**

This file serves as the main entry point for your Zustand store. It initializes the store and defines the initial state.

```js
// store/index.js

import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;
```
