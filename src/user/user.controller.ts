import {
  Controller,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

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

    const { password, ...rest } = user;

    return rest;
  }
}
