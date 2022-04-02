import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthService } from '../src/auth/auth.service';
import { User } from '../src/auth/entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/auth.module';

const userEntity = new User({ email: 'any_email', password: 'any_password' });

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let usersService = {
    findAll: () => [userEntity],
    findOne: () => userEntity,
    compareHash: () => true,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'docker',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ], 
    })
      .overrideProvider(AuthService)
      .useValue(usersService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST)', async () => { 
    return await request(app.getHttpServer())
      .post('/auth/signup')
      .expect(201) 
      .expect((response) => {
        expect(response.body).toHaveProperty("token")
      });
  });

  it('/auth/signin (POST)', async () => { 
    return await request(app.getHttpServer())
      .post('/auth/signin')
      .expect(200) 
      .expect((response) => {
        expect(response.body).toHaveProperty("token")
      });
  });
});
