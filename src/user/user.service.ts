import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserEntity } from "@app/user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRegisterDto } from "@app/user/dto/userRegister.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userEntity: Repository<UserEntity>
  ) {
  }

  async findOne(username: string): Promise<UserEntity> {
    return await this.userEntity.findOne({
      where: { username }
    });
  }

  async registerUser(userBody: UserRegisterDto): Promise<UserEntity> {
    const user = await this.userEntity.find({
      where: [
        { username: userBody.username },
        { email: userBody.email }
      ]
    });
    if (user.length !== 0) {
      throw new HttpException("User exists", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    try {
      const newUser = new UserEntity();
      Object.assign(newUser, userBody);
      return await this.userEntity.save(newUser);
    } catch (err) {
      console.log(err);
      throw new HttpException("Something went wrong while creating user, please take another try", HttpStatus.BAD_REQUEST);
    }
  }
}