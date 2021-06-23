// Node
const USID = require("../mod.js");

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
