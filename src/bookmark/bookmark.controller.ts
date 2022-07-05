import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from './schema/bookmark.schema';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  async getBookmark(@Query() query): Promise<Bookmark | undefined> {
    console.log('get bookmark');
    const { userId, postId } = query;
    return await this.bookmarkService.getBookmark(query);
  }

  @Get('/:userId')
  async getBookmarks(@Param() param): Promise<Bookmark[] | undefined> {
    console.log('get bookmarks');
    const { userId } = param;
    return await this.bookmarkService.getBookmarks(userId);
  }

  @Post()
  async addBookmark(@Body() req): Promise<Bookmark> {
    console.log('add bookmark');
    const params = {
      ...req,
      created: new Date().getTime(),
    };
    return await this.bookmarkService.addBookmark(params);
  }

  @Delete('/:_id')
  async removeBookmark(@Param() param): Promise<Bookmark> {
    console.log('remove bookmark');
    const { _id } = param;
    return await this.bookmarkService.removeBookmark(_id);
  }

  @Delete('/:postId/:userId')
  async removeBookmarkByPostId(@Param() param): Promise<Bookmark> {
    console.log('remove bookmark by post id');
    return await this.bookmarkService.removeBookmarkByPostId(param);
  }
}
