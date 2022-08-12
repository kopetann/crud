import { Controller, Post, UseGuards, Request, Body, Get, Delete, Param, Put } from "@nestjs/common";
import { JwtAuthGuard } from "@app/auth/guards/jwt.auth.guard";
import { NewArticleDto } from "@app/article/dto/newArticle.dto";
import { ArticleService } from "@app/article/article.service";
import { ArticleEntity } from "@app/article/article.entity";
import { DeleteResult } from "typeorm";
import { UpdateArticleDto } from "@app/article/dto/updateArticle.dto";

@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(@Body("article") article: NewArticleDto): Promise<ArticleEntity> {
    return await this.articleService.createPost(article);
  }

  @Get()
  async getArticles(): Promise<ArticleEntity[]> {
    return await this.articleService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":slug")
  async deleteSingleArticle(@Param("slug") slug: string): Promise<DeleteResult> {
    return await this.articleService.deleteArticle(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":slug")
  async updateArticle(@Param("slug") slug: string, @Body("article") articleBody: UpdateArticleDto): Promise<ArticleEntity> {
    return await this.articleService.updateArticle(slug, articleBody);
  }
}