# Node.js tabanlı bir image kullan (Alpine daha hafif)
FROM node:18-alpine

# Çalışma dizinini belirle
WORKDIR /app

# Bağımlılıkları yüklemek için package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Üretim bağımlılıklarını yükle
RUN npm install --omit=dev

# NestJS CLI'yı global olarak yükle
RUN npm install -g @nestjs/cli

# @types/node paketini yükle
RUN npm install --save-dev @types/node

# Tüm dosyaları kopyala
COPY . .

# Uygulamayı test etmeden önce, `npm run test` komutunu çalıştırın
RUN npm run test

# Uygulamayı build et
RUN npm run build

# Portu aç
EXPOSE 3000

# Uygulama için uygun başlatma komutu
CMD ["npm", "run", "start:prod"]
