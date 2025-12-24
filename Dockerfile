# Use official Node.js LTS image
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source code
COPY . .

# Build (if using TypeScript, otherwise skip this step)
RUN if [ -f tsconfig.json ]; then npm run build; fi

# --- Production image ---
FROM node:18-alpine
WORKDIR /app

# Copy only built files and node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Expose port (change if your app uses a different port)
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.js"]
