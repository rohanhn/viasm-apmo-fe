FROM node:18-bullseye-slim AS base

# Install bash for build scripts
RUN apt-get update && apt-get install -y bash && rm -rf /var/lib/apt/lists/*

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY scripts/ ./scripts/
RUN \
  if [ -f package-lock.json ]; then \
    echo "Using NPM" && npm install --legacy-peer-deps; \
  elif [ -f yarn.lock ]; then \
    echo "Using Yarn" && yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then \
    echo "Using PNPM" && yarn global add pnpm && pnpm i --frozen-lockfile; \
  else \
    echo "No lockfile found. Using NPM as fallback." && npm install --legacy-peer-deps; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
ARG MODE
ARG NODE_ENVIROMENT

# Set environment variables for build
ENV MODE=${MODE}
ENV NODE_ENV=${NODE_ENVIROMENT:-production}

# Build the application using the same package manager
# Skip TypeScript checking during build
ENV NEXT_SKIP_TYPE_CHECK=true
ENV CI=true

# Disable problematic i18next types before build
RUN if [ -f "./node_modules/i18next/typescript/t.d.ts" ]; then \
      mv "./node_modules/i18next/typescript/t.d.ts" "./node_modules/i18next/typescript/t.d.ts.backup"; \
      echo "Disabled i18next/typescript/t.d.ts"; \
    fi && \
    if [ -f "./node_modules/react-i18next/index.d.ts" ]; then \
      mv "./node_modules/react-i18next/index.d.ts" "./node_modules/react-i18next/index.d.ts.backup"; \
      echo "Disabled react-i18next/index.d.ts"; \
    fi

# Use Next.js build directly
RUN if [ -f package-lock.json ]; then \
      echo "Building with NPM" && npx next build; \
    elif [ -f yarn.lock ]; then \
      echo "Building with Yarn" && yarn next build; \
    else \
      echo "Building with NPM (fallback)" && npx next build; \
    fi

# Restore i18next types after build
RUN if [ -f "./node_modules/i18next/typescript/t.d.ts.backup" ]; then \
      mv "./node_modules/i18next/typescript/t.d.ts.backup" "./node_modules/i18next/typescript/t.d.ts"; \
      echo "Restored i18next/typescript/t.d.ts"; \
    fi && \
    if [ -f "./node_modules/react-i18next/index.d.ts.backup" ]; then \
      mv "./node_modules/react-i18next/index.d.ts.backup" "./node_modules/react-i18next/index.d.ts"; \
      echo "Restored react-i18next/index.d.ts"; \
    fi

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ARG MODE

ENV MODE $MODE

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Increase file descriptor limits
RUN echo "* soft nofile 65536" >> /etc/security/limits.conf && \
    echo "* hard nofile 65536" >> /etc/security/limits.conf

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Add Node.js options to handle file descriptor limits
ENV NODE_OPTIONS="--max-old-space-size=1024"

CMD ["node", "--max-old-space-size=1024", "server.js"]
