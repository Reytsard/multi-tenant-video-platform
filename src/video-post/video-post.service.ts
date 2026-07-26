import { Injectable } from '@nestjs/common';
import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { UpdateVideoPostDto } from './dto/update-video-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoPost } from './entities/video-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideoPostService {
  constructor(
    @InjectRepository(VideoPost) videoRepository: Repository<VideoPost>,
  ) {}

  async upload(file, uploadVideoDto, access_token) {
    console.log(access_token);
  }

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
