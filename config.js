/**
 * Record<string, string[]>
 */
// prettier-ignore
const commandMap = {
    //     npm                    yarn                   pnpm
    yy:  ["npm install"         ,  "yarn"              ,  "pnpm install"        ],
    yys: ["npm i && npm start"  ,  "yarn && yarn start",  "pnpm i && pnpm start"],
    yyd: ["npm i && npm run dev",  "yarn && yarn dev"  ,  "pnpm i && pnpm dev"  ],
    yi:  ["npm install"         ,  "yarn"              ,  "pnpm install"        ],
    ya:  ["npm install"         ,  "yarn add"          ,  "pnpm add"            ],
    yad: ["npm install -D"      ,  "yarn add -D"       ,  "pnpm add -D"         ],
    yb:  ["npm run build"       ,  "yarn build"        ,  "pnpm build"          ],
    yd:  ["npm run dev"         ,  "yarn dev"          ,  "pnpm dev"            ],
    yr:  ["npm uninstall"       ,  "yarn remove"       ,  "pnpm remove"         ],
    ys:  ["npm run start"       ,  "yarn start"        ,  "pnpm start"          ],
    yt:  ["npm run test"        ,  "yarn test"         ,  "pnpm test"           ],
  };

module.exports = { commandMap };
