FROM node:20-slim AS base

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN yarn install --prod --frozen-lockfile

FROM base AS build
RUN yarn install --frozen-lockfile
RUN yarn build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public

ENV NODE_ENV=production
EXPOSE 4200
CMD ["yarn", "start"]