import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
import { AlarmController } from './alarm/alarm.controller';
import { AlarmModule } from './alarm/alarm.module';

const mongodbURL = process.env.mongodbURL || 'mongodb://localhost/mbti';
console.log(`mongodb connect url: ${mongodbURL}`);

@Module({
  imports: [
    MongooseModule.forRoot(mongodbURL),
    UserModule,
    PostModule,
    CommentModule,
    AlarmModule,
  ],
  controllers: [
    AppController,
    PostController,
    CommentController,
    AlarmController,
  ],
  providers: [AppService],
})
export class AppModule {}
