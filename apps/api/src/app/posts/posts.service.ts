import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
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
      mediaUrls,
      author: userID,
    });

    if (!createdPost.content && !createdPost.mediaUrls.length) {
      throw new BadRequestException('Post must have content or media');
    }

    return createdPost.save();
  }

  public async findAll(): Promise<Post[]> {
    return this.postModel
      .find()
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .exec();
  }

  public async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).populate('author', 'username').exec();
  }

  public async findOneFromAuthor(
    authorID: string,
    id: Types.ObjectId
  ): Promise<Post> {
    return this.postModel.findOne({ author: authorID, _id: id }).exec();
  }

  public async findByAuthor(authorID: string): Promise<Post[]> {
    return this.postModel
      .find({ author: authorID })
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  public async delete(id: string): Promise<Post> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
