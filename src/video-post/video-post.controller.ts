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
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { VideoPostService } from './video-post.service';
import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { UpdateVideoPostDto } from './dto/update-video-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadVideoDto } from './dto/upload-video-post.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('video-post')
export class VideoPostController {
  constructor(private readonly videoPostService: VideoPostService) {}

  @Post('/upload')
  @ApiConsumes('multifile/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${suffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 1000 * 1024 * 1024,
      },
    }),
  )
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(image\/jpeg|image\/png|application\/pdf)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
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
