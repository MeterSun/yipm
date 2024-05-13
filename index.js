#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const pkgName = require("./package.json").name;

/**
 * Record<string, string[]>
 */
// prettier-ignore
const commandMap = {
  //     npm                    yarn                   pnpm
  yy:  ["npm install"         ,  "yarn"              ,  "pnpm install"        ],
  yys: ["npm i && npm start"  ,  "yarn && yarn start",  "pnpm i && pnpm start"],
  yyd: ["npm i && npm run dev",  "yarn && yarn dev"  ,  "pnpm i && pnpm dev"  ],
  ya:  ["npm install"         ,  "yarn add"          ,  "pnpm add"            ],
  yad: ["npm install -D"      ,  "yarn add -D"       ,  "pnpm add -D"         ],
  yb:  ["npm run build"       ,  "yarn build"        ,  "pnpm build"          ],
  yd:  ["npm run dev"         ,  "yarn dev"          ,  "pnpm dev"            ],
  yr:  ["npm uninstall"       ,  "yarn remove"       ,  "pnpm remove"         ],
  ys:  ["npm run start"       ,  "yarn start"        ,  "pnpm start"          ],
  yt:  ["npm run test"        ,  "yarn test"         ,  "pnpm test"           ],
};

/**
 *
 * @returns {'ya'|'yad'|'yag'|'yb'|'yd'|'ys'|'yt'}
 */
function getCommandName() {
  for (const key in commandMap) {
    if (process.argv[1].endsWith("/" + key)) {
      return key;
    }
  }

  throw Error("unknown command");
}

/**
 *
 * @returns {'npm'|'yarn'|'pnpm'}
 */
function findPm() {
  for (let i = 0; i < 10; i++) {
    const filePath = path.join(...Array(i).fill(".."), "package.json");

    const lockPathMap = {
      npm: path.join(...Array(i).fill(".."), "package-lock.json"),
      yarn: path.join(...Array(i).fill(".."), "yarn.lock"),
      pnpm: path.join(...Array(i).fill(".."), "pnpm-lock.yaml"),
    };

    if (fs.existsSync(filePath)) {
      log("Found", "package.json");

      for (const key in lockPathMap) {
        const p = lockPathMap[key];
        if (fs.existsSync(p)) {
          log("Found", path.basename(p));
          return key;
        }
      }
    }
  }

  throw new Error(`cannot find a package manager`);
}

function getCommand(pm = findPm(), cm = getCommandName()) {
  return commandMap[cm][["npm", "yarn", "pnpm"].indexOf(pm)];
}

/**
 *
 * @param {string} cm
 */
function runCmd(cm) {
  log("Exec", cm);

  cm.split("&&").forEach((i) => {
    spawn(
      i.split(" ").filter(Boolean)[0],
      i.split(" ").filter(Boolean).slice(1),
      {
        stdio: "inherit",
      }
    );
  });
}

/**
 *
 * @param {string} action
 * @param {string} msg
 */
function log(action, msg) {
  const green = (s) => `\u001B[32m${s}\u001B[39m`;
  console.log(green(` 🚀 ~ [${pkgName}:${action}] ${msg}`));
}

try {
  const m = getCommand();
  const otherArgs = process.argv.slice(2);
  runCmd(`${m} ${otherArgs.join(" ")}`);
  console.log("\n");
} catch (error) {
  const red = (s) => `\u001B[31m${s}\u001B[39m`;

  console.log(red(`🔴🟠🟢[${pkgName}:Error] ${error?.message || error}`));
}
