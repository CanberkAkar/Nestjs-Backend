import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto'; // DTO'yu içe aktardık ✅

describe('Users API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/list (GET) - Tüm kullanıcıları getir', async () => {
    const response = await request(app.getHttpServer()).get('/user/list');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it('/user (POST) - DTO ile yeni kullanıcı ekleme', async () => {
    const userDto: CreateUserDto = { usr_name: 'Canberk', usr_email: 'canberk@example.com' }; // DTO nesnesi oluşturuldu ✅
  
    const response = await request(app.getHttpServer())
      .post('/user/insert')
      .send(userDto)
      .expect(201);
  
    console.log(response.body);
    expect(response.body.user.usr_name).toBe(userDto.usr_name);
    expect(response.body.user.usr_email).toBe(userDto.usr_email);
    
  });
  

  afterAll(async () => {
    await app.close();
  });
});
