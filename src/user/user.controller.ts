import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { user } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

  @Get('me')
  getMe(@GetUser() user: user) {
    return {
      user: user,
    }
  }

  @Patch()
  editUser() {
    return {
      message: 'Edit user data'
    }
  }

}
