import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideoPostService } from './video-post.service';
import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { UpdateVideoPostDto } from './dto/update-video-post.dto';

@Controller('video-post')
export class VideoPostController {
  constructor(private readonly videoPostService: VideoPostService) {}

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
  update(@Param('id') id: string, @Body() updateVideoPostDto: UpdateVideoPostDto) {
    return this.videoPostService.update(+id, updateVideoPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoPostService.remove(+id);
  }
}
