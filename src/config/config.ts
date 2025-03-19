export default () => ({
    database: {
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'mydb',
      synchronize: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Tüm entity'leri alır
    },
  });
  