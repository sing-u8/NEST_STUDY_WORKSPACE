import { IsString, IsIn } from 'class-validator';

export class SocialLoginRequestDto {
  @IsString()
  @IsIn(['google', 'apple'])
  provider: string;

  @IsString()
  accessToken: string;
}
