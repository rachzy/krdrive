import { IsMongoId, IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
