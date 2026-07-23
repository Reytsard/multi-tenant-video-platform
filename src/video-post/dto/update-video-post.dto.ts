import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoPostDto } from './create-video-post.dto';

export class UpdateVideoPostDto extends PartialType(CreateVideoPostDto) {}
