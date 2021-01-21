import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { Review } from 'src/podcast/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Review])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
