import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ArticleEntity } from "@app/article/article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { NewArticleDto } from "@app/article/dto/newArticle.dto";
import { UpdateArticleDto } from "@app/article/dto/updateArticle.dto";

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>) {
  }

  async createPost(article: NewArticleDto): Promise<ArticleEntity> {
    const newGeneratedArticle = new ArticleEntity();
    Object.assign(newGeneratedArticle, article);
    return await this.articleRepository.save(newGeneratedArticle);
  }

  async getAll(): Promise<ArticleEntity[]> {
    try {
      const queryPosts = await this.articleRepository.createQueryBuilder();
      return await queryPosts.getMany();
    } catch (err) {
      console.error("There is something wrong with getAll method in ArticleService: " + err);
    }
  }

  async deleteArticle(slug: string): Promise<DeleteResult> {
    const article = await this.articleRepository.findOne({
      where: {
        slug
      }
    });
    if (!article) {
      throw new HttpException("Article doesn't exist", HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.articleRepository.delete({
        slug
      });
    } catch (err) {
      console.error("There is something wrong with deleteArticle method in ArticleService: " + err);
    }
  }

  async updateArticle(slug: string, articleBody: UpdateArticleDto): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: {
        slug
      }
    });
    if (!article) {
      throw new HttpException("Article doesn't exist", HttpStatus.BAD_REQUEST);
    }
    try {
      Object.assign(article, articleBody);
      return await this.articleRepository.save(article);
    } catch (err) {
      console.error("There is something wrong with deleteArticle method in ArticleService: " + err);
    }
  }

}