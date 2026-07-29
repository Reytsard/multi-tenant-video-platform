import { ApiProperty } from '@nestjs/swagger';

export class UploadVideoDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  videoFile: Express.Multer.File;

  @ApiProperty({ enum: ['public', 'private', 'unlisted'] })
  visibility: 'public' | 'private' | 'unlisted';
}
