# Node.js tabanlı bir image kullan (Alpine daha hafif)
FROM node:22-alpine

# Çalışma dizinini belirle
WORKDIR /app

# Bağımlılıkları yüklemek için package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# NestJS CLI'yı global olarak yükle
RUN npm install -g @nestjs/cli

# @types/node paketini yükle
RUN npm install --save-dev @types/node

# Tüm dosyaları kopyala
COPY . .

# Uygulamayı build et
RUN npm run build

# Portu aç
EXPOSE 3000

# Uygulama için uygun başlatma komutu
CMD ["node", "dist/main"]
