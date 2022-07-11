import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { BookmarkService } from 'src/bookmark/bookmark.service';
import { CommentService } from 'src/comment/comment.service';
import { HistoryService } from 'src/history/history.service';
import { HISTORY_TYPE } from 'src/history/schema/constants';
import { PostService } from './post.service';
import { POST_COUNT_TYPE, POST_STATUS } from './schema/constants';
import { Post as Document } from './schema/post.schema';
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly historyService: HistoryService,
    private readonly commentService: CommentService,
    private readonly bookmarkService: BookmarkService,
  ) {}

  @Get('/list')
  async getPostList(@Query() query): Promise<Document[]> {
    const { category, page } = query;
    const params = {
      category,
      page: Number(page),
    };
    console.log(`get post list: ${category}, ${page}`);
    const data = await this.postService.getPostList(params);
    return data;
  }

  @Get('/mylist')
  async getMyPostList(@Query() query): Promise<Document[]> {
    console.log('get my post');
    const { userId, page } = query;
    const params = {
      userId,
      page: Number(page),
    };
    const data = await this.postService.getMyPostList(params);
    return data;
  }

  @Get('/:_id')
  async getPost(@Param() param, @Query() query): Promise<any> {
    const { _id } = param;
    const { userId } = query;
    console.log(`get post: ${_id}`);

    //  조회수 올리기
    await this.postService.addViewCount(_id);

    const d = await this.postService.getPost(_id);

    const bookmarkInfo = await this.bookmarkService.getBookmark({
      postId: _id,
      userId,
    });
    return { postInfo: d[0], bookmarkInfo };
  }

  @Delete('/:_id')
  async removePost(@Param() param): Promise<any> {
    const { _id } = param;
    console.log(`remove post: ${_id}`);

    // 관련 댓글 삭제
    await this.commentService.removeCommentByPostId(_id);

    // 좋아요 기록 삭제
    await this.historyService.removeHistoryByPostId(_id);

    return await this.postService.removePost(_id);
  }

  @Post()
  async addPost(@Body() req): Promise<Document> {
    console.log('add post');

    const { image } = req;
    console.log(image);
    console.log(req);

    const params = {
      ...req,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      isDeleted: false,
      status: POST_STATUS.ACTIVE,
      created: new Date().getTime(),
      updated: new Date().getTime(),
    };
    return await this.postService.addPost(params);
  }

  @Post('/like/:postId')
  async addLikeCount(
    @Param() param,
    @Query() query,
  ): Promise<Document | undefined> {
    console.log('get post like count');
    const { postId } = param;
    const { userId } = query;

    const params = {
      relativeId: postId,
      userId,
      type: HISTORY_TYPE.POST_LIKE,
    };

    const history = await this.historyService.getHistory(params);

    if (history === null) {
      await this.historyService.addHistory({
        ...params,
        created: new Date().getTime(),
      });
      return await this.postService.addLikeCount(postId, POST_COUNT_TYPE.PLUS);
    } else {
      return;
    }
  }
}
