import { Test, TestingModule } from '@nestjs/testing';
import { ArticleSyncServiceService } from './article-sync-service.service';

describe('ArticleSyncServiceService', () => {
  let service: ArticleSyncServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleSyncServiceService],
    }).compile();

    service = module.get<ArticleSyncServiceService>(ArticleSyncServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
