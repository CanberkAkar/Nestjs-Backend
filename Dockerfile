# Hafif bir Node.js image kullan (Alpine)
FROM node:22-alpine

# Çalışma dizinini belirle
WORKDIR /app

# Bağımlılıkları yüklemek için package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Üretim bağımlılıklarını yükle (daha hızlı ve temiz)
RUN npm ci --only=production

# Tüm dosyaları kopyala
COPY . .

# Uygulamayı build et
RUN npm run build

# Portu aç
EXPOSE 3000

# Uygulama için başlatma komutu
CMD ["npm", "run", "start:prod"]
