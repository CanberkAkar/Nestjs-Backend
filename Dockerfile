# Node.js tabanlı bir image kullan (Alpine daha hafif)
FROM node:18-alpine

# Çalışma dizinini belirle
WORKDIR /app

# Bağımlılıkları yüklemek için package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Üretim bağımlılıklarını yükle
RUN npm install --omit=dev

# Tüm dosyaları kopyala
COPY . .

# Uygulamayı build et
RUN npm run build

# Portu aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["node", "dist/main"]
