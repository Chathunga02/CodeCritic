FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:20-alpine AS runtime

WORKDIR /app
# Run as non-root user
USER node

# Copy package files and production dependencies only
COPY --chown=node:node package*.json ./
RUN npm install --production

# Copy generated Prisma client
COPY --chown=node:node --from=build /app/src/generated/prisma ./src/generated/prisma

# Copy built app
COPY --chown=node:node --from=build /app/dist ./dist

EXPOSE 3000
ENV NODE_ENV=production

CMD ["npm", "start"]
