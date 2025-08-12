FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

RUN chown -R appuser:appgroup /app

USER appuser

CMD ["npm", "start"]