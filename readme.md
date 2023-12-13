Simple package to help you store and retrieve data from a json file 
in a simple way.

For the lazy people like me, who don't want to write a lot of code to store 
and retrieve data from a json file.

```bash
npm install data-buddy
pnpm install data-buddy
yarn add data-buddy
```


## Usage
```js
import { DataBuddy } from "data-buddy/data-buddy";

const store = new DataBuddy();
```

### Create
```js
store.create("data", "best_buddy", { name: "buddy" });
```

### Read
```js

store.read("data", "best_buddy");
```

### Update
```js
store.update("data", "best_buddy", { name: "best" });
```

### Delete
```js
store.delete("data", "best_buddy");
```

### Why use data-buddy?
Because if you're here, it's probably 
because you're lazy like me and don't want to write a lot of 
code to store and retrieve data from a json file.

### Why not use data-buddy?
If you want to store a lot of data, it's better to use a database.

### How to contribute?
You can contribute by creating a pull request or an issue.

### License
MIT
