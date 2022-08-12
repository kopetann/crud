import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcrypt";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email:string;

  @Column()
  password: string;

  @Column({ default: "" })
  bio: string;

  @BeforeInsert()
  private async hashPassword() {
    this.password = await hash(this.password,10);
  }
}