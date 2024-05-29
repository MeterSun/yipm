# yipm

Handle \*pm in one command.

Auto detect the node module manager by the lock file.
For example, if `package-lock.json` is founded, enter `yy` and actually execute `npm install` .

Below is the command mapping tables

## example

| yipm command | npm                      | yarn                 | pnpm                   |
| :----------: | :----------------------- | :------------------- | :--------------------- |
|     `yy`     | `npm install`            | `yarn`               | `pnpm install`         |
|    `yys`     | `npm i && npm start`     | `yarn && yarn start` | `pnpm i && pnpm start` |
|    `yyd`     | `npm i && npm run dev`   | `yarn && yarn dev`   | `pnpm i && pnpm dev`   |
|    `yyb`     | `npm i && npm run build` | `yarn && yarn build` | `pnpm i && pnpm build` |
|     `ya`     | `npm install`            | `yarn add`           | `pnpm add`             |
|    `yad`     | `npm install -D`         | `yarn add -D`        | `pnpm add -D`          |
|     `yb`     | `npm run build`          | `yarn build`         | `pnpm build`           |
|     `yd`     | `npm run dev`            | `yarn dev`           | `pnpm dev`             |
|     `yr`     | `npm uninstall`          | `yarn remove`        | `pnpm remove`          |
|     `ys`     | `npm run start`          | `yarn start`         | `pnpm start`           |
|     `yt`     | `npm run test`           | `yarn test`          | `pnpm test`            |
