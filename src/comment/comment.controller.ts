import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { AlarmService } from 'src/alarm/alarm.service';
import { ALARM_TYPE } from 'src/alarm/schema/constants';
import { HistoryService } from 'src/history/history.service';
import { HISTORY_TYPE } from 'src/history/schema/constants';
import { PostService } from 'src/post/post.service';
import { POST_COUNT_TYPE } from 'src/post/schema/constants';
import { CommentService } from './comment.service';
import { Comment } from './schema/comment.schema';
import { COMMENT_STATUS } from './schema/constants';
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly historyService: HistoryService,
    private readonly postService: PostService,
    private readonly alarmService: AlarmService,
  ) {}

  @Post('/like/:commentId')
  async addLikeCount(
    @Param() param,
    @Query() query,
  ): Promise<Comment | undefined> {
    const { commentId } = param;
    const { userId } = query;

    const params = {
      relativeId: commentId,
      userId,
      type: HISTORY_TYPE.COMMENT_LIKE,
    };

    const history = await this.historyService.getHistory(params);

    if (history === null) {
      await this.historyService.addHistory({
        ...params,
        created: new Date().getTime(),
      });
      return await this.commentService.addLikeCount(commentId);
    } else {
      return;
    }
  }

  @Get('/:postId')
  async getComments(@Param() param): Promise<Comment[] | undefined> {
    const { postId } = param;
    const params = {
      postId,
      status: COMMENT_STATUS.ACTIVE,
    };
    const comments = await this.commentService.getComments(params);

    const parentComment = comments.filter((item) => item.parent === '0');

    const subComment = comments.filter((item) => item.parent !== '0');

    const reComment = parentComment.map((item) => {
      const f = subComment.filter(
        (_item) => item._id.toString() === _item.parent,
      );
      return {
        ...item,
        subComment: f.reverse(),
      };
    });

    return reComment;
  }

  @Post()
  async addComment(@Body() req): Promise<Comment> {
    console.log('add comment');
    const { postId, targetUserId } = req;
    const params = {
      ...req, // userId, targetUserId, PostId, comment, parent
      likeCount: 0,
      status: COMMENT_STATUS.ACTIVE,
      created: new Date().getTime(),
    };

    const data = await this.commentService.addComment(params);
    this.postService.addCommentCount(postId, POST_COUNT_TYPE.PLUS);

    const alarmParams = {
      relativeId: postId,
      targetUserId: targetUserId,
      type: ALARM_TYPE.COMMENT,
      message: '내 글에 댓글이 달렸습니다.',
      isReaded: false,
      created: new Date().getTime(),
    };
    this.alarmService.addAlarm(alarmParams);

    return data;
  }
}
