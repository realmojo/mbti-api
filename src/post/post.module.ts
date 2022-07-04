import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { HistoryModule } from 'src/history/history.module';
import { CommentModule } from 'src/comment/comment.module';
import { BookmarkModule } from 'src/bookmark/bookmark.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    HistoryModule,
    BookmarkModule,
    forwardRef(() => CommentModule),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
