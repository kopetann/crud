import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthService } from "@app/auth/auth.service";
import { LocalAuthGuard } from "@app/auth/guards/local.auth.guard";
import { JwtAuthGuard } from "@app/auth/guards/jwt.auth.guard";
import { UserEntity } from "@app/user/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req): Promise<string> {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Request() req): Promise<UserEntity> {
    return req.user;
  }
}