import {
  Controller,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UploadImageDto } from 'src/dto/image-upload.dto';
import { ImageUpload } from 'src/decorators/image-upload.decorarot';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) throw new UnauthorizedException('Token not provided');

    const userId = await this.authService.getUserByAccessToken(accessToken);

    const user = await this.userService.findOne(userId);

    const { password, refreshToken, ...rest } = user;

    return rest;
  }

  @Post('add-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadImageDto,
  })
  @ImageUpload()
  async addImageForUser(@Req() req: any) {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) throw new UnauthorizedException('Token not provided');

    const userId = await this.authService.getUserByAccessToken(accessToken);

    const imageUrl = req.imageUrl;

    const user = await this.userService.addImageForUser(userId, imageUrl);

    const { password, refreshToken, ...rest } = user;

    return rest;
  }
}
