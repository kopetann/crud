import { Module } from "@nestjs/common";
import { UserModule } from "@app/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { DatabaseConfiguration } from "@app/database.configuration";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleModule } from "@app/article/article.module";
import { AuthModule } from "@app/auth/auth.module";

@Module({
  imports: [UserModule,AuthModule, ArticleModule, ConfigModule.forRoot()
    , TypeOrmModule.forRootAsync({
        useClass: DatabaseConfiguration
      }
    )],
  controllers: [],
  providers: []
})
export class AppModule {
}
