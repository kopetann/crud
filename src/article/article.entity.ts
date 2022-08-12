import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import slugify from "slugify";

@Entity("articles")
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: "" })
  content: string;

  @Column()
  slug: string;

  @BeforeInsert()
  private makeSlug() {
    this.slug = slugify(this.title, { lower: true }) + "-" + (((Math.random() * Math.pow(36, 4)) | 0).toString(24));
  }
}