# usid

Short and Unique ID Generator. Random ID, UUID, UID and SID Generator.

# Installation

### NPM

```bash
npm i usid
```

### Yarn

```bash
yarn add usid
```

# Example

Quick Example

```js
// Node
const USID = require("usid");

// Deno
// Importing the latest version of USID from deno.land
// import USID from "https://deno.land/x/usid/mod.ts";

// Initializing the USID Object
const usid = new USID();

// Create 15 characters Unique ID
const unique_id = usid.uuid();
console.log("Unique ID:", unique_id);

// Create 3 characters Random ID
const random_id = usid.rand();
console.log("Random ID:", random_id);
```

# Usage

### Importing or requiring to your project.

```js
// Node
const USID = require("usid");

// Deno
import USID from "https://deno.land/x/usid/mod.ts";
```

### Random ID with custom length

-   **_rand(length)_** method, generates a random ID with custom length, default length is 3

```js
const usid = new USID();

// Default length
const len = 3;

const random_id = usid.rand(len); // output: vCk
```

### UUID

-   **_uuid(length)_** method, generates Unique ID based on your machine timestamp, the default length is `15`
-   The greater the length, the more it can avoid duplicated ID's, the length of `15` is ideal if you are generating ID's with less than _500,000_ ID's per seconds without duplicates.
-   If you are using deno, you can use the flag `--allow-hrtime` to get more accurate timestamp, if this is enabled, with default `15` length, you can generate up to `1,000,000` ID's per seconds without duplicates.

```js
const usid = new USID();

// Default length
const len = 15;

const unique_id = usid.uuid(len); //Output: CLiouVTquuTL3wf
```
