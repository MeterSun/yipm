/**
 * Record<string, string[]>
 */
// prettier-ignore
const commandMap = {
    //     npm                        yarn                   pnpm                  bun
    ypm: ["npm"                   ,  "yarn"              ,  "pnpm"                , "bun"                    ],
    yy:  ["npm install"           ,  "yarn"              ,  "pnpm install"        , "bun install"            ],
    yys: ["npm i && npm start"    ,  "yarn && yarn start",  "pnpm i && pnpm start", "bun i && bun run start" ],
    yyd: ["npm i && npm run dev"  ,  "yarn && yarn dev"  ,  "pnpm i && pnpm dev"  , "bun i && bun run dev"   ],
    yyb: ["npm i && npm run build",  "yarn && yarn build",  "pnpm i && pnpm build", "bun i && bun run build" ],
    yi:  ["npm install"           ,  "yarn"              ,  "pnpm install"        , "bun install"            ],
    ya:  ["npm install"           ,  "yarn add"          ,  "pnpm add"            , "bun add"                ],
    yad: ["npm install -D"        ,  "yarn add -D"       ,  "pnpm add -D"         , "bun add -D"             ],
    yb:  ["npm run build"         ,  "yarn build"        ,  "pnpm build"          , "bun run build"          ],
    yd:  ["npm run dev"           ,  "yarn dev"          ,  "pnpm dev"            , "bun run dev"            ],
    yr:  ["npm run"               ,  "yarn run"          ,  "pnpm run"            , "bun run"                ],
    yrm:  ["npm uninstall"        ,  "yarn remove"       ,  "pnpm remove"         , "bun remove"             ],
    ys:  ["npm run start"         ,  "yarn start"        ,  "pnpm start"          , "bun run start"          ],
    yt:  ["npm run test"          ,  "yarn test"         ,  "pnpm test"           , "bun run test"           ],
    ylk: ["npm link"              ,  "yarn link"         ,  "pnpm link --global"  , "bun link"               ],
  };

module.exports = { commandMap };
