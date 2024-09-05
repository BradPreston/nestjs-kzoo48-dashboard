import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { EntriesService } from '../src/entries/entries.service';

describe('Entries (e2e)', () => {
  let app: INestApplication;
  const mockEntriesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EntriesService)
      .useValue(mockEntriesService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET: /entries', () => {
    beforeEach(() => {
      jest.spyOn(mockEntriesService, 'findAll');
    });

    it('should return OK', async () => {
      await request(app.getHttpServer()).get('/entries').expect(200, {});
    });
  });

  describe('GET: /entries/:id', () => {
    beforeEach(() => {
      jest.spyOn(mockEntriesService, 'findOne');
    });

    it('should return OK', async () => {
      await request(app.getHttpServer()).get('/entries/1').expect(200, {});
    });

    it('should return Bad Request', async () => {
      await request(app.getHttpServer()).get('/entries/test').expect(400, {
        message: 'Validation failed (numeric string is expected)',
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('POST: /entries', () => {
    beforeEach(() => {
      jest.spyOn(mockEntriesService, 'create');
    });

    it('should return OK', async () => {
      await request(app.getHttpServer()).post('/entries').expect(201, {});
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
