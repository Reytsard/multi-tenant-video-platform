import { Module } from '@nestjs/common';
import { VideoPostService } from './video-post.service';
import { VideoPostController } from './video-post.controller';

@Module({
  controllers: [VideoPostController],
  providers: [VideoPostService],
})
export class VideoPostModule {}
