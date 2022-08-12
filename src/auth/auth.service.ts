import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "@app/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserLoginDto } from "@app/user/dto/userLogin.dto";
import { compare } from "bcrypt";
import { UserEntity } from "@app/user/user.entity";
import { LoginUserInterface } from "@app/auth/interfaces/loginUser.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(username: string, pass: string): Promise<UserEntity> {
    const user = await this.userService.findOne(username);
    try {
      const isPasswordCorrect = compare(user.password, pass);
      if (user && isPasswordCorrect) {
        const { password, ...result } = user;
        return user;
      }
    } catch (err) {
      console.error("There's an error during validateUser method. Message is: " + err);
    }
    return null;
  }

  async loginUser(user: UserLoginDto): Promise<LoginUserInterface> {
    const userFetched = await this.userService.findOne(user.username);
    const isPasswordCorrect = await compare(user.password, userFetched.password);
    if (!userFetched) {
      throw new HttpException("Didn't found any users", HttpStatus.NOT_FOUND);
    }
    if (!isPasswordCorrect) {
      throw new HttpException("Password is not valid", HttpStatus.I_AM_A_TEAPOT);
    }
    const token = await this.login(userFetched);
    delete userFetched.password;
    return {
      user: {
        userFetched,
        token
      }
    };
  };

  async login(user: UserEntity): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
