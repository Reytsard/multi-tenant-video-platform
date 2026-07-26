import { Module } from '@nestjs/common';
import { VideoPostService } from './video-post.service';
import { VideoPostController } from './video-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoPost } from './entities/video-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoPost])],
  controllers: [VideoPostController],
  providers: [VideoPostService],
})
export class VideoPostModule {}
