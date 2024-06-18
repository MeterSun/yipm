#!/usr/bin/env node

const { commandMap } = require("./config");
console.log();
console.log(require("./package.json").name, require("./package.json").version);
console.log();

console.log(Array(99).fill("-").join(""));
console.log(
  " YIPM cmd |       NPM cmd        |     YARN cmd       |     PNPM cmd        |       BUN cmd"
);
console.log(Array(99).fill("-").join(""));

for (const key in commandMap) {
  console.log(
    key.padEnd(6, " ").padStart(10, " "),
    commandMap[key][0].trim().padEnd(22, " "),
    commandMap[key][1].trim().padEnd(19, " "),
    commandMap[key][2].trim().padEnd(21, " "),
    commandMap[key][3]
  );
}
