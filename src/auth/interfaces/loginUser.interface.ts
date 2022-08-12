import { ResponseUserLoginDto } from "@app/auth/dto/responseUserLogin.dto";
import { UserEntity } from "@app/user/user.entity";

export interface LoginUserInterface {
  user: {
    userFetched: ResponseUserLoginDto,
    token: string
  };
}