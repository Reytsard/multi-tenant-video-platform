import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VideoPostModule } from './video-post/video-post.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { VideoPost } from './video-post/entities/video-post.entity';
import { Comment } from './comment/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'video_upload',
      username: 'test',
      password: 'TEST123',
      synchronize: true,
      entities: [User, VideoPost, Comment],
    }),
    JwtModule.register({
      global: true,
      secret: 'randomSecretifkherigfhreiurgh',
      signOptions: {
        expiresIn: '5m',
      },
    }),
    AuthModule,
    UserModule,
    VideoPostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
