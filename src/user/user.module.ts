import { Module } from "@nestjs/common";
import { UserController } from "@app/user/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@app/user/user.entity";
import { UserService } from "@app/user/user.service";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService]
})
export class UserModule {

}