import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  videoId: number;
  @ApiProperty()
  comment: string;
}
