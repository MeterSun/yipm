#!/usr/bin/env node

const { commandMap } = require("./config");

console.log(Array(72).fill("-").join(""));
console.log("YIPM cmd|       NPM cmd       |     YARN cmd      |    PNPM cmd");
console.log(Array(72).fill("-").join(""));
for (const key in commandMap) {
  console.log(
    key.padEnd(6, " ").padStart(8, " "),
    commandMap[key][0].trim().padEnd(21, " "),
    commandMap[key][1].trim().padEnd(19, " "),
    commandMap[key][2]
  );
}
