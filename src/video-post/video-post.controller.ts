import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VideoPostService } from './video-post.service';
import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { UpdateVideoPostDto } from './dto/update-video-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadVideoDto } from './dto/upload-video-post.dto';

@Controller('video-post')
export class VideoPostController {
  constructor(private readonly videoPostService: VideoPostService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadVideoDto: UploadVideoDto,
  ) {
    console.log(file);
    return 'Hello World';
    // return await this.videoPostService.upload()
  }

  @Post()
  create(@Body() createVideoPostDto: CreateVideoPostDto) {
    return this.videoPostService.create(createVideoPostDto);
  }

  @Get()
  findAll() {
    return this.videoPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoPostService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideoPostDto: UpdateVideoPostDto,
  ) {
    return this.videoPostService.update(+id, updateVideoPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoPostService.remove(+id);
  }
}
