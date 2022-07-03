import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bookmark, BookmarkDocument } from './schema/bookmark.schema';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
  ) {}

  async findOne(userId: string, postId: string): Promise<Bookmark | undefined> {
    return await this.bookmarkModel.findOne({ userId, postId });
  }

  async addBookmark(
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark | undefined> {
    const Bookmark = await this.findOne(
      createBookmarkDto.userId,
      createBookmarkDto.postId,
    );
    if (Bookmark) {
      return Bookmark;
    }
    const createBookmark = new this.bookmarkModel(createBookmarkDto);
    return createBookmark.save();
  }

  async getBookmark(params: {
    postId: string;
    userId: string;
  }): Promise<Bookmark | undefined> {
    return await this.bookmarkModel.findOne(params);
  }

  async getBookmarks(userId: string): Promise<Bookmark[] | undefined> {
    return await this.bookmarkModel.aggregate([
      { $match: { userId: userId } },
      { $addFields: { postId: { $toObjectId: '$postId' } } },
      {
        $lookup: {
          from: 'posts',
          localField: 'postId',
          foreignField: '_id',
          as: 'postInfo',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'id',
          as: 'userInfo',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$postInfo', 0] }, '$$ROOT'],
          },
        },
      },
      { $project: { postInfo: 0 } },
      { $unwind: '$userInfo' },
      { $sort: { created: -1 } },
    ]);
  }

  async removeBookmark(_id: string): Promise<Bookmark | undefined> {
    return await this.bookmarkModel.findByIdAndRemove({ _id });
  }

  async removeBookmarkByPostId(params: {
    postId: string;
    userId: string;
  }): Promise<Bookmark | undefined> {
    return await this.bookmarkModel.findOneAndRemove(params);
  }
}
