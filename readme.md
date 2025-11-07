# Data Buddy - Store, retrieve and cache data

[![npm version](https://badge.fury.io/js/data-buddy.svg)](https://badge.fury.io/js/data-buddy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Simple package to help you store and retrieve data from a json file 
in a simple way. It also allows you to cache data.

For the lazy people like me, who don't want to write a lot of code to store 
and retrieve data from a json file or caching data.

```bash
npm install data-buddy
pnpm install data-buddy
yarn add data-buddy
```

## Quick Start with DataBuddy

```ts
import { DataBuddy } from 'data-buddy';

// Define interfaces for type safety
interface User {
  name: string;
  age?: number;
}

// For type safety, specify the types for file data and cache values
const db = new DataBuddy<User, string>();
// or with a base path for files
const db = new DataBuddy('path/to/base');

const cache = db.getCache(); // Cache<string>
const file = db.getFile(); // File<User>
```

## Usage to handle json files
```ts
import { File } from 'data-buddy';

// Define an interface for your data
interface User {
  name: string;
  age?: number;
}

// Specify the type for file data
const file = new File<User>();
//or if you want to specify a base path
const file = new File("storage"); // base path for all files
// or target the project root
const file = new File(process.cwd()); // base path is the current working directory
```

### File Path Explanation
- **basePath** (optional): The root directory for all file operations. If not specified, files are created relative to the current working directory.
- **path**: The subdirectory within the basePath.
- **filename**: The name of the file (without .json extension).

**Example**: With `basePath = "storage"`, `path = "users"`, `filename = "user1"`, the file is created at `storage/users/user1.json`.

### Create
```ts
await file.create({ 
  path: "users", // subdirectory within basePath
  filename: "user1", // file name (will be user1.json)
  data: { name: "John", age: 30 } // data to store - type checked
});
// File created at: basePath/users/user1.json (e.g., storage/users/user1.json)
```

### Read
```ts
const data = await file.read({ 
  path: "data", //path to the file
  filename: "best_buddy" //name of the file
});
// data is User | null
```

### Update
```ts
await file.update({ 
  path: "data", //path to the file
  filename: "best_buddy", //name of the file
  data: { name: "buddy", age: 26 } //data to store - type checked
});
```

### Delete
```ts
await file.delete({ 
  path: "data", //path to the file
  filename: "best_buddy" //name of the file
});
```

## Usage to handle cache
```ts
import { Cache } from 'data-buddy';

// Specify the type for cache values
const cache = new Cache<string>();
```

### Get key
```ts
const value = await cache.get("key");
// value is string | undefined
```

### Set key
```ts
await cache.set("key", "value"); // type checked

//cache with expiration time
await cache.set("key", "value", 1000); //time in ms
```

### Delete key
```ts
cache.delete("key");
```

### Clear all cache
```ts
cache.clear();
```

### Has key
```ts
cache.has("key");
```

### All keys
```ts
const all = cache.all();
// all is Array<[string, string]>
```

### Why use data-buddy?
Because if you're here, it's probably 
because you're lazy like me and don't want to write a lot of 
code to store and retrieve data from a json file or caching data.

### Why not use data-buddy?
If you want to store a lot of data, it's better to use a database.

### Are contributions welcome?
Yes, since this package has been made from a personal need to learn
how to publish a package on npm, I'm open to any contributions to improve it !

### How to contribute?
You can simply open an issue or a pull request. 
(No template for now but if you want to add one, feel free to share it !)

### License
MIT
