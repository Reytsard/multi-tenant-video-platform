import { Injectable } from '@nestjs/common';
import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { UpdateVideoPostDto } from './dto/update-video-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoPost } from './entities/video-post.entity';
import { Repository } from 'typeorm';
import { UploadVideoDto } from './dto/upload-video-post.dto';

@Injectable()
export class VideoPostService {
  constructor(
    @InjectRepository(VideoPost) private videoRepository: Repository<VideoPost>,
  ) {}

  async upload(file, uploadVideoDto: UploadVideoDto, user) {
    const dataToSave: VideoPost = {
      title: uploadVideoDto.title,
      description: uploadVideoDto.description,
      ownerId: user.sub,
      videoPath: file.path,
      datePosted: new Date(),
    };
    return await this.videoRepository.save(dataToSave);
  }

  create(createVideoPostDto: CreateVideoPostDto) {
    return 'This action adds a new videoPost';
  }

  async findAll() {
    return await this.videoRepository.find();
  }

  async findOne(id: number) {
    return await this.videoRepository.find({
      where: { id },
      relations: { comments: true },
    });
  }

  update(id: number, updateVideoPostDto: UpdateVideoPostDto) {
    return `This action updates a #${id} videoPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} videoPost`;
  }
}
