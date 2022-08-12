import { IsNotEmpty, MinLength } from "class-validator";

export class NewArticleDto {
  @IsNotEmpty()
  @MinLength(2)
  readonly title: string;
  readonly content?: string;

}