

# Use Node.js LTS (Debian for OpenSSL compatibility)
FROM node:18-bullseye


WORKDIR /app

# Copy package files and Prisma schema first
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies (postinstall will run prisma generate)
RUN npm install


COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
