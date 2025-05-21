import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: false })
  content: string;

  @Prop({ type: [{ type: String }] })
  mediaUrls: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
