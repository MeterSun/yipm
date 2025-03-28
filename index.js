#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn, exec } = require("child_process");
const pkgName = require("./package.json").name;
const { commandMap } = require("./config");

function execPromise(commandString) {
  return new Promise((resolve, reject) => {
    exec(commandString, (_error, stdout, stderr) => {
      stderr ? reject(stderr) : resolve(stdout);
    });
  });
}

/**
 *
 * @returns {keyof typeof commandMap}
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
 * @returns {'npm'|'yarn'|'pnpm'|'bun'} 'npm'|'yarn'|'pnpm'|'bun' and packageManager 'xxx@\d+.\d+.\d+'
 */
async function findPm() {
  for (let i = 0; i < 10; i++) {
    const filePath = path.join(...Array(i).fill(".."), "package.json");

    const lockPathMap = {
      npm: path.join(...Array(i).fill(".."), "package-lock.json"),
      yarn: path.join(...Array(i).fill(".."), "yarn.lock"),
      pnpm: path.join(...Array(i).fill(".."), "pnpm-lock.yaml"),
      bun: path.join(...Array(i).fill(".."), "bun.lockb"),
    };

    if (fs.existsSync(filePath)) {
      log("Found", filePath);

      const packageFileContent = JSON.parse(fs.readFileSync(filePath, "utf8"));
      // pm regex = (bun|npm|pnpm|yarn)@\d+\.\d+\.\d+(-.+)?

      // 1. check package.packageManager
      const pm = packageFileContent.packageManager;
      if (pm) {
        log("Found", "packageManager", pm);
        return pm;
      }

      // 2. check package.engines
      async function checkEngines(engines) {
        if (!engines) return;
        const l = ["pnpm", "npm", "yarn", "bun"];
        for (let i = 0; i < l.length; i++) {
          const pm = l[i];
          if (engines[pm]) {
            log("Found", `engines.${pm}`, engines[pm]);
            const res = await execPromise(
              `npm view ${pm}@"${engines[pm]}" version --json`
            );

            const versions = [].concat(JSON.parse(res));
            const latestMatchedVersion = versions.slice(-1)[0];
            return `${pm}@${latestMatchedVersion}`;
          }
        }
      }

      const res = await checkEngines(packageFileContent.engines);
      if (res) return res;

      // 3. check lock files
      for (const key in lockPathMap) {
        const p = lockPathMap[key];
        if (fs.existsSync(p)) {
          log("Found", p);
          return key;
        }
      }
    }
  }

  return "npm";
}

function getCommand(pm, cm = getCommandName()) {
  if (pm.includes("@")) {
    const p = pm.slice(0, pm.indexOf("@"));
    return commandMap[cm][["npm", "yarn", "pnpm", "bun"].indexOf(p)].replaceAll(
      p,
      `npx ${pm}`
    );
  } else {
    return commandMap[cm][["npm", "yarn", "pnpm", "bun"].indexOf(pm)];
  }
}

/**
 *
 * @param {string} cm
 */
async function runCmd(cm) {
  log("Alias", cm);

  function exec(cmd, args) {
    return new Promise((resolve, reject) => {
      const c = spawn(cmd, args, { stdio: "inherit" });
      c.on("exit", (code) => {
        if (code) {
          reject(code);
        } else {
          resolve();
        }
      });
    });
  }

  for await (const i of cm.split("&&")) {
    log("Exec", i.trim());
    await exec(
      i.split(" ").filter(Boolean)[0],
      i.split(" ").filter(Boolean).slice(1)
    );
  }
}

/**
 *
 * @param {string} action
 * @param {string} msg
 */
function log(action, ...msg) {
  const green = (s) => `\u001B[32m${s}\u001B[39m`;
  console.log(green(` 🚀 ~ [${pkgName}:${action}] ${msg.join(" ")}`));
}

async function __main__() {
  let cmd = "";
  const otherArgs = process.argv.slice(2);
  try {
    const pm = await findPm();
    cmd = [getCommand(pm), ...otherArgs].join(" ");
    await runCmd(cmd);
    console.log("\n");
  } catch (error) {
    const red = (s) => `\u001B[31m${s}\u001B[39m`;

    console.log(
      red(`🔴🟠🟢[${pkgName}:Error] ${error?.message || error} ${cmd}`)
    );
  }
}
__main__();
