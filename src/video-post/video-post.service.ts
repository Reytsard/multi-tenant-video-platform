import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { UpdateVideoPostDto } from './dto/update-video-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoPost } from './entities/video-post.entity';
import { Repository } from 'typeorm';
import { UploadVideoDto } from './dto/upload-video-post.dto';
import { join } from 'path';
import { createReadStream } from 'fs';
import { unlink } from 'fs/promises';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class VideoPostService {
  constructor(
    @InjectRepository(VideoPost) private videoRepository: Repository<VideoPost>,
    private userService: UserService,
  ) {}

  async upload(file, uploadVideoDto: UploadVideoDto, user) {
    const owner = await this.userService.findById(user.sub);
    if (!owner) {
      throw new NotFoundException('No User Found');
    }

    const dataToSave: VideoPost = {
      title: uploadVideoDto.title,
      description: uploadVideoDto.description,
      owner: { id: user.sub } as User,
      videoPath: file.path,
      datePosted: new Date(),
      visiblity: uploadVideoDto.visibility,
    };
    console.log(dataToSave);
    return await this.videoRepository.save(dataToSave);
  }

  create(createVideoPostDto: CreateVideoPostDto) {
    return 'This action adds a new videoPost';
  }

  async findAll() {
    return await this.videoRepository.find();
  }

  async findOne(id: number) {
    const file: VideoPost | null = await this.videoRepository.findOne({
      where: { id },
      relations: { comments: true },
    });
    if (!file) {
      throw new NotFoundException('Video not found');
    }
    const video: VideoPost = Array.isArray(file) ? file[0] : file;
    const filePath = join(process.cwd(), video.videoPath);
    const stream = createReadStream(filePath);

    return new StreamableFile(stream, {
      type: 'video/mp4',
      disposition: `inline; filename=${video.title}`,
    });
  }

  update(id: number, updateVideoPostDto: UpdateVideoPostDto) {
    return `This action updates a #${id} videoPost`;
  }

  async remove(userId: number, id: number) {
    const video = await this.videoRepository.findOne({
      where: { id },
    });
    console.log(video);
    if (!video) {
      throw new NotFoundException('video not found');
    }
    if (video.owner.id !== userId) {
      throw new BadRequestException('video not found');
    }

    try {
      const videoPath = join(process.cwd(), video.videoPath);
      await unlink(videoPath);
      return await this.videoRepository.delete(video);
    } catch (e) {
      throw new BadRequestException('Error deleting video');
    }
  }
}
