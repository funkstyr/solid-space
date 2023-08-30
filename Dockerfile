FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm i -g pnpm
RUN pnpm build

# RUN pnpm prune --prod

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .

COPY --from=builder /app/public ./public
COPY --from=builder /app/.solid ./.solid
COPY --from=builder /app/dist ./dist



USER user
EXPOSE 3000
ENV PORT 3000

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", ".solid/server/entry-server.js"]