import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  firstName?: string;
}
