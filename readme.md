# Data Buddy - Store, retrieve and cache data

[![npm version](https://badge.fury.io/js/data-buddy.svg)](https://badge.fury.io/js/data-buddy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Simple package to help you store and retrieve data from a JSON file in a simple way. It also allows you to cache data.

For the lazy people like me, who don't want to write a lot of code to store and retrieve data from a JSON file or caching data.

```bash
npm install data-buddy
pnpm install data-buddy
yarn add data-buddy
```

## Table of Contents

- [Quick Start](#quick-start-with-databuddy)
- [File Operations](#usage-to-handle-json-files)
- [Cache Operations](#usage-to-handle-cache)
- [Why Data Buddy?](#why-use-data-buddy)
- [Contributing](#are-contributions-welcome)
- [License](#license)

## Quick Start with DataBuddy

```ts
import { DataBuddy } from 'data-buddy';

// Define interfaces for type safety
interface User {
  name: string;
  age?: number;
}

// DataBuddy provides a unified interface for both file and cache operations
// with shared type parameters. Use it when you need both features together.
const db = new DataBuddy<User, string>();

const cache = db.getCache(); // Cache<string>
const file = db.getFile(); // File<User>
```

*Alternatively, use `File` and `Cache` classes separately for more granular control.*

## Usage to handle JSON files

```ts
import { File } from 'data-buddy';

// Define your data interface
interface User {
  name: string;
  age?: number;
}

const file = new File<User>('storage'); // Optional base path
```

### File Path Structure

- **basePath** (optional): Root directory for files. Defaults to current directory.
- **path**: Subdirectory within basePath.
- **filename**: File name without `.json`.

**Example**: `basePath="storage"`, `path="users"`, `filename="user1"` → `storage/users/user1.json`.

### Create

```ts
await file.create({
  path: "users",
  filename: "user1",
  data: { name: "John", age: 30 } // Type-checked
});
// File created at: basePath/users/user1.json

// With formatting
await file.create({
  path: "users",
  filename: "user1",
  data: { name: "John", age: 30 },
  format: true // Pretty prints the JSON
});
```

### Read

```ts
const data = await file.read({
  path: "users",
  filename: "user1"
}); // User | null
```

### Update

```ts
// Replace entire file content (default)
await file.update({
  path: "users",
  filename: "user1",
  data: { name: "Jane", age: 25 }
});

// Or merge updates into existing data
await file.update({
  path: "users",
  filename: "user1",
  data: { age: 26, active: true },
  mode: "merge"
});
// Example: If file contains { name: "John", age: 25 }, it becomes { name: "John", age: 26, active: true }

// Note: Merge is shallow - nested objects are replaced entirely
// If file contains { user: { name: "John" }, status: "active" } and data { user: { age: 30 } },
// it becomes { user: { age: 30 }, status: "active" } (user.name is lost, but status is kept)

// With formatting
await file.update({
  path: "users",
  filename: "user1",
  data: { age: 26 },
  mode: "merge",
  format: true
});
```

### Delete

```ts
await file.delete({
  path: "users",
  filename: "user1"
}); // boolean
```

### Validate Data

```ts
// Check JSON validity
await file.isValidJson({ path: "users", filename: "user1" }); // boolean

// Validate data structure with custom function
const isUser = (data: unknown): data is User =>
  typeof data === 'object' && data !== null &&
  'name' in data && typeof (data as any).name === 'string';

await file.isValidData({
  path: "users",
  filename: "user1",
  validator: isUser
}); // boolean

// Or use a schema validation library (Zod shown as example, but others work too)
import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  age: z.number().optional(),
});

await file.isValidData({
  path: "users",
  filename: "user1",
  validator: (data) => userSchema.safeParse(data).success
}); // boolean
```

## Usage to handle cache

```ts
import { Cache } from 'data-buddy';

const cache = new Cache<string>();
```

### Basic Operations

```ts
await cache.set("key", "value");
const value = await cache.get("key"); // string | undefined
cache.delete("key");
cache.has("key"); // boolean
cache.all(); // Array<[string, string]>
cache.clear();
```

### With Expiration

```ts
await cache.set("key", "value", 60000); // Expires in 60 seconds
```

## Why use data-buddy?

- **Simple**: Easy to use for JSON file storage and caching.
- **Type-safe**: Full TypeScript support with generics.
- **Lightweight**: No heavy dependencies.

### Why not use data-buddy?

If you need to store large amounts of data or complex queries, consider a database.

## Are contributions welcome?

Yes! Open issues or PRs to improve the package.

## License

MIT
