
FROM node:20-slim AS base

COPY . /api
WORKDIR /api

FROM base AS prod-deps
RUN yarn install --prod --frozen-lockfile

FROM base AS build
RUN yarn install --frozen-lockfile
RUN yarn build

FROM base
COPY --from=prod-deps /api/node_modules /api/node_modules
COPY --from=build /api/build /api/build

ENV NODE_ENV=production
EXPOSE 3010
CMD ["yarn", "start"]