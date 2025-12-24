
# Use Node.js LTS (Debian for OpenSSL compatibility)
FROM node:18-bullseye

WORKDIR /app

COPY package*.json ./
RUN apt-get update \
    && apt-get install -y --no-install-recommends libssl1.1 ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && npm ci --no-audit --prefer-offline --silent

# Copy Prisma schema before generating client
# Copy Prisma schema before generating client
COPY prisma ./prisma
# Generate Prisma client in the same Debian environment so the correct native engine is produced
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
