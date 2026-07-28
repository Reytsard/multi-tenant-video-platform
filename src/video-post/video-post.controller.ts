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
  // ParseFilePipe,
  // MaxFileSizeValidator,
  // FileTypeValidator,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { VideoPostService } from './video-post.service';
import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { UpdateVideoPostDto } from './dto/update-video-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadVideoDto } from './dto/upload-video-post.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { type Request } from 'express';

@ApiBearerAuth()
@Controller('video-post')
export class VideoPostController {
  constructor(private readonly videoPostService: VideoPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        file: {
          // This key must match the string inside FileInterceptor
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
      //use fileFilter for locally saving data
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
          'video/mp4',
          'image/png',
          'image/jpeg',
          'image/png',
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Invalid file type'), false);
        }
      },
    }),
  )
  async upload(
    @UploadedFile(
      // use parseFilePipe() for when saving it into the cloud, it validation pipes check the buffer memory
      // new ParseFilePipe({
      //   validators: [
      //     new MaxFileSizeValidator({ maxSize: 1000 * 1024 * 1024 }),
      //     new FileTypeValidator({
      //       fileType: /(video\/mp4|image\/png|image\/jpg)/,
      //     }),
      //   ],
      // }),
    )
    file: Express.Multer.File,
    @Body() uploadVideoDto: UploadVideoDto,
    @Req() req: Request,
  ) {
    console.log('reached data');
    if (!file) {
      throw new BadRequestException('File is required');
    }
    //todo: add userId here and set it has the ownerId for the video
    return await this.videoPostService.upload(file, uploadVideoDto, req.user);
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

  @Get('/latest')
  async getLatestVideo() {}
}
