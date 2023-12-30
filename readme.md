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


## Usage to handle json files
```js
import { File } from 'data-buddy/file';

const file = new File();
//or if you want to specify a base path
const file = new File("path/to");
```

### Create
```js
file.create({ 
  path: "data", //path to the file (if base path is specified, this will be added to it)
  filename: "best_buddy", //name of the file
  data: { name: "buddy" } //data to store
});
```

### Read
```js

file.read({ 
  path: "data", //path to the file
  filename: "best_buddy" //name of the file
});
```

### Update
```js
file.update({ 
  path: "data", //path to the file
  filename: "best_buddy", //name of the file
  data: { name: "buddy" } //data to store
});
```

### Delete
```js
file.delete({ 
  path: "data", //path to the file
  filename: "best_buddy" //name of the file
});
```

## Usage to handle cache
```js
import { Cache } from 'data-buddy/cache';
const cache = new Cache();
```

### Get key
```js
await cache.get("key");
```

### Set key
```js
await cache.set("key", "value");

//cache with expiration time
await cache.set("key", "value", 1000); //time in ms
```

### Delete key
```js
cache.delete("key");
```

### Clear all cache
```js
cache.clear();
```

### Has key
```js
cache.has("key");
```

### All keys
```js
cache.all();
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
