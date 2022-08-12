import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { AuthService } from "@app/auth/auth.service";
import { UserModule } from "@app/user/user.module";
import { AuthController } from "@app/auth/auth.controller";
import { JwtStrategy } from "@app/auth/strategies/jwt.strategy";
import { LocalStrategy } from "@app/auth/strategies/local.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  controllers: [AuthController],
  imports: [UserModule,ConfigModule, PassportModule.register({
    defaultStrategy: "jwt"
  }), JwtModule.registerAsync({
    useFactory: async () => (
      {
        secret: process.env.SECRET_KEY,
        signOptions: { expiresIn: "6000s" }
      }),
  })],
  providers: [AuthService, ConfigService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {

}