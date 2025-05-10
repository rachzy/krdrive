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
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserDto } from '../account/dto/user.dto';
import { storageConfig } from '../../config/storage.config';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

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
    files: Express.Multer.File[]
  ) {
    const mediaUrls = files?.map((file) => `/uploads/${file.filename}`) || [];
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

  @Get('user/:userID')
  public findByUser(@Param('userID') userID: string) {
    return this.postsService.findByUser(userID);
  }
}
