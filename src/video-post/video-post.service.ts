import { Injectable } from '@nestjs/common';
import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { UpdateVideoPostDto } from './dto/update-video-post.dto';

@Injectable()
export class VideoPostService {
  create(createVideoPostDto: CreateVideoPostDto) {
    return 'This action adds a new videoPost';
  }

  findAll() {
    return `This action returns all videoPost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videoPost`;
  }

  update(id: number, updateVideoPostDto: UpdateVideoPostDto) {
    return `This action updates a #${id} videoPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoPost`;
  }
}
