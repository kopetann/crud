import { Body, Controller, forwardRef, Get, Inject, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { UserService } from "@app/user/user.service";
import { UserRegisterDto } from "@app/user/dto/userRegister.dto";
import { UserEntity } from "@app/user/user.entity";
import { JwtAuthGuard } from "@app/auth/guards/jwt.auth.guard";
import { AuthService } from "@app/auth/auth.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @Post()
  async register(@Body(new ValidationPipe()) userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    return await this.userService.registerUser(userRegisterDto);
  }

}