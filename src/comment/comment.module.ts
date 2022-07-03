import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PostModule } from 'src/post/post.module';
import { HistoryModule } from 'src/history/history.module';
import { AlarmModule } from 'src/alarm/alarm.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    HistoryModule,
    AlarmModule,
    forwardRef(() => PostModule),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
