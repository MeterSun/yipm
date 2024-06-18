# yipm

Handle \*pm in one command.

Auto detect the node module manager by the lock file.
For example, if `package-lock.json` is founded, enter `yy` and actually execute `npm install` .

It also detect `packageManager` in `package.json`. If the `packageManager` is founded, for example, `"packageManager": "yarn@1.21.0"`, enter `yy` and actually execute `npx yarn@1.21.0 install` .

Below is the command mapping tables

## example

| yipm command | npm                      | yarn                 | pnpm                   | bun                      |
| :----------: | :----------------------- | :------------------- | :--------------------- | :----------------------- |
|    `ypm`     | `npm`                    | `yarn`               | `pnpm`                 | `bun`                    |
|     `yy`     | `npm install`            | `yarn`               | `pnpm install`         | `bun install`            |
|    `yys`     | `npm i && npm start`     | `yarn && yarn start` | `pnpm i && pnpm start` | `bun i && bun run start` |
|    `yyd`     | `npm i && npm run dev`   | `yarn && yarn dev`   | `pnpm i && pnpm dev`   | `bun i && bun run dev`   |
|    `yyb`     | `npm i && npm run build` | `yarn && yarn build` | `pnpm i && pnpm build` | `bun i && bun run build` |
|  `ya <pkg>`  | `npm install <pkg>`      | `yarn add <pkg>`     | `pnpm add <pkg>`       | `bun add <pkg>`          |
| `yad <pkg>`  | `npm install -D <pkg>`   | `yarn add -D <pkg>`  | `pnpm add -D <pkg>`    | `bun add -D <pkg>`       |
|     `yb`     | `npm run build`          | `yarn build`         | `pnpm build`           | `bun run build`          |
|     `yd`     | `npm run dev`            | `yarn dev`           | `pnpm dev`             | `bun run dev`            |
|  `yr <pkg>`  | `npm uninstall <pkg>`    | `yarn remove <pkg>`  | `pnpm remove <pkg>`    | `bun remove <pkg>`       |
|     `ys`     | `npm run start`          | `yarn start`         | `pnpm start`           | `bun run start`          |
|     `yt`     | `npm run test`           | `yarn test`          | `pnpm test`            | `bun run test`           |
|    `ylk`     | `npm link`               | `yarn link`          | `pnpm link --global`   | `bun link`               |
