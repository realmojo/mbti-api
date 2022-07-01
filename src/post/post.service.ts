import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findOne(id: string): Promise<Post | undefined> {
    return await this.postModel.findOne({ id });
  }

  async addPost(createPostDto: CreatePostDto): Promise<Post | undefined> {
    const createPost = new this.postModel(createPostDto);
    return createPost.save();
  }
}
