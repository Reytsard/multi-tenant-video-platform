import { Test, TestingModule } from '@nestjs/testing';
import { VideoPostService } from './video-post.service';

describe('VideoPostService', () => {
  let service: VideoPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoPostService],
    }).compile();

    service = module.get<VideoPostService>(VideoPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
