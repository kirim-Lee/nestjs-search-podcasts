import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/podcast/entities/core.entity';
import { Podcast } from 'src/podcast/entities/podcast.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';

@Entity()
@ObjectType()
export class Review extends CoreEntity {
  @Column()
  @Field((type) => String)
  post: string;

  @ManyToOne((type) => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @Field((type) => User)
  user: User;

  @ManyToOne((type) => Podcast, (podcast) => podcast.reviews, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Podcast)
  podcast: Podcast;

  @RelationId((review: Review) => review.user)
  userId: number;

  @RelationId((review: Review) => review.podcast)
  podcastId: number;
}
