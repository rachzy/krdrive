import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../account/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(
    createPostDto: CreatePostDto,
    userId: string,
    mediaUrls: string[]
  ): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostDto,
      userId,
      mediaUrls,
    });
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel
      .find()
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).populate('userId', 'username').exec();
  }

  async findByUser(userId: string): Promise<Post[]> {
    return this.postModel
      .find({ userId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .exec();
  }
}
