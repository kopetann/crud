import { MinLength } from "class-validator";

export class UpdateArticleDto {
  @MinLength(2)
  title?: string;
  content?: string;

}