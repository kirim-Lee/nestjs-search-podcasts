import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { CoreEntity } from './core.entity';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { Review } from 'src/podcast/entities/review.entity';
import { Podcast } from 'src/podcast/entities/podcast.entity';

export enum UserRole {
  Host = 'Host',
  Listener = 'Listener',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ type: 'simple-enum', enum: UserRole })
  @Field((type) => UserRole)
  role: UserRole;

  @OneToMany((type) => Review, (review) => review.user, { nullable: true })
  @Field((type) => [Review], { nullable: true })
  reviews: Review[];

  @ManyToMany((type) => Podcast)
  @JoinTable()
  @Field((type) => [Podcast], { nullable: true })
  subscriptions?: Podcast[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) {
      return;
    }
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
