import { Test, TestingModule } from '@nestjs/testing';
import { VideoPostController } from './video-post.controller';
import { VideoPostService } from './video-post.service';

describe('VideoPostController', () => {
  let controller: VideoPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoPostController],
      providers: [VideoPostService],
    }).compile();

    controller = module.get<VideoPostController>(VideoPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
