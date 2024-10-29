## Utils Folder Purpose

The **`utils`** folder serves several key purposes:

- **Code Reusability**: By centralizing common functions in one location, you can easily import and use them across different components and pages.
- **Maintainability**: Having a dedicated folder for utility functions keeps the codebase organized, making it easier to find and update helper functions.
- **Readability**: Utility functions often encapsulate complex logic, making the code that utilizes them more readable and expressive.

## Key Files

### 1. **`dateUtils.js`**

This file contains utility functions for handling date-related operations, such as formatting dates or calculating time differences.

```javascript
// utils/dateUtils.js

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US');
};

export const calculateDaysBetween = (startDate, endDate) => {
  const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
```
