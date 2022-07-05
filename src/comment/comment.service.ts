import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { COMMENT_STATUS } from './schema/constants';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async addComment(
    createCommentDto: CreateCommentDto,
  ): Promise<Comment | undefined> {
    const createComment = new this.commentModel(createCommentDto);
    return createComment.save();
  }

  async getComments(params): Promise<Comment[] | undefined> {
    return this.commentModel.aggregate([
      { $match: { postId: params.postId, status: params.status } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'id',
          as: 'userInfo',
        },
      },
      { $unwind: '$userInfo' },
      { $sort: { created: -1 } },
    ]);
  }

  async addLikeCount(_id: string): Promise<any | undefined> {
    return await this.commentModel.updateOne(
      { _id: _id },
      { $inc: { likeCount: 1 } },
    );
  }

  async removeComment(_id: string): Promise<any | undefined> {
    const filter = {
      _id,
    };
    const set = {
      $set: {
        status: COMMENT_STATUS.DELETE,
      },
    };
    return await this.commentModel.updateOne(filter, set, { new: true });
  }

  async removeCommentByPostId(postId: string): Promise<any | undefined> {
    const filter = {
      postId,
    };
    const set = {
      $set: {
        status: COMMENT_STATUS.DELETE,
      },
    };
    return await this.commentModel.updateMany(filter, set, { new: true });
  }
}
