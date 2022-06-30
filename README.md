# usid

Create random, unique or index based ID

# Installation on Nodejs

```bash
# NPM
npm i usid

# Yarn
yarn add usid
```

# Usage

### Initialization with TypeScript Deno
```ts
import {
    uid,
    createIndex, 
    DEFAULT_CHARSET,
    rand
} from "https://deno.land/x/usid/mod.ts";
```

### Initialization with Nodejs
```ts
const {
    uid,
    createIndex, 
    DEFAULT_CHARSET,
    rand
} = require('usid');
```

### Index based ID
```ts

// imagine that x is a database connector
let x = 0;

const options = {
    get: () => x,
    set: (value) => x = value,
    charset: DEFAULT_CHARSET, // optional,
    min: 3, // optional, default is 0
}

const getID = createIndex(options);
for (let i = 0; i < 3; i++) console.log(getID());

// Output:
// aab
// aac
// aad
```

### Random ID
Generate random ID with fixed length
```ts
const len = 5; // optional, default is 3
console.log(rand(len, DEFAULT_CHARSET)); // default charset is optional
// Output: random 5 characters based on DEFAULT_CHARSET
```

### Unique ID
Generate unique ID with fixed length
```ts
const output_length = 24; // optional, default is 24
const base_decimal_length = 18; // optional, default is 18

console.log(uid(output_length, base_decimal_length, DEFAULT_CHARSET)); // default charset is optional
// Output: outputs 24 characters based on DEFAULT_CHARSET
```

# LICENSE
Apache-2.0[@eru123](https://github.com/eru123)
