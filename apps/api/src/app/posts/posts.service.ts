import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  public async create(
    createPostDto: CreatePostDto,
    userID: string,
    mediaUrls: string[]
  ): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostDto,
      userID,
      mediaUrls,
    });
    return createdPost.save();
  }

  public async findAll(): Promise<Post[]> {
    return this.postModel
      .find()
      .populate('userID', 'username')
      .sort({ createdAt: -1 })
      .exec();
  }

  public async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).populate('userID', 'username').exec();
  }

  public async findByUser(userID: string): Promise<Post[]> {
    return this.postModel
      .find({ userID })
      .populate('userID', 'username')
      .sort({ createdAt: -1 })
      .exec();
  }
}
