import { Module } from '@nestjs/common';
import { VideoPostService } from './video-post.service';
import { VideoPostController } from './video-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoPost } from './entities/video-post.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([VideoPost]), UserModule],
  controllers: [VideoPostController],
  providers: [VideoPostService],
})
export class VideoPostModule {}
