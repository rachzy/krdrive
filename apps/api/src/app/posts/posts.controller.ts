import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  Delete,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserDto } from '../account/dto/user.dto';
import { AzureStorageService } from '../services/azure-storage.service';
import { isValidObjectId, Types } from 'mongoose';
import { environment } from '../../environments/environment';
import { storageConfig } from '../../config/storage.config';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly azureStorage: AzureStorageService
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, storageConfig))
  public async create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: UserDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 100 }), // 100MB
        ],
        fileIsRequired: false,
      })
    )
    files: any[]
  ) {
    const mediaUrls = [];

    if (environment.production) {
      const uploadedFilesURLs = await Promise.all(
        (files || []).map((file) => this.azureStorage.uploadFile(file))
      );
      mediaUrls.push(...uploadedFilesURLs);
    } else {
      mediaUrls.push(
        ...(files?.map((file) => `/uploads/${file.filename}`) || [])
      );
    }

    return this.postsService.create(createPostDto, user.userID, mediaUrls);
  }

  @Get()
  public findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('author/:authorID')
  public findByAuthor(@Param('authorID') authorID: string) {
    return this.postsService.findByAuthor(authorID);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string, @GetUser() user: UserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid post ID');
    }

    const post = await this.postsService.findOneFromAuthor(
      user.userID,
      new Types.ObjectId(id)
    );

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.postsService.delete(id);
  }
}
