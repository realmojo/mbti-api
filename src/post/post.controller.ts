import { Controller, Post, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as Document } from './schema/post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  async addPost(@Body() req): Promise<Document> {
    console.log('add post');
    return await this.postService.addPost(req);
  }
}
