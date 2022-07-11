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
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkModule } from './bookmark/bookmark.module';
import { HistoryController } from './history/history.controller';
import { HistoryModule } from './history/history.module';
import { BlockController } from './block/block.controller';
import { BlockService } from './block/block.service';
import { BlockModule } from './block/block.module';
import { AccuseController } from './accuse/accuse.controller';
import { AccuseService } from './accuse/accuse.service';
import { AccuseModule } from './accuse/accuse.module';
import { VersionController } from './version/version.controller';

const mongodbURL = process.env.mongodbURL || 'mongodb://localhost/mbti';
console.log(`mongodb connect url: ${mongodbURL}`);

@Module({
  imports: [
    MongooseModule.forRoot(mongodbURL),
    UserModule,
    PostModule,
    CommentModule,
    AlarmModule,
    BookmarkModule,
    HistoryModule,
    BlockModule,
    AccuseModule,
  ],
  controllers: [
    AppController,
    PostController,
    CommentController,
    AlarmController,
    BookmarkController,
    HistoryController,
    BlockController,
    AccuseController,
    VersionController,
  ],
  providers: [AppService],
})
export class AppModule {}
