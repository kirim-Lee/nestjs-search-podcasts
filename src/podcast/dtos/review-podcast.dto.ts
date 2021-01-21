import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReviewPodcastInput {
  @Field((type) => Number)
  podcastId: number;

  @Field((type) => String)
  post: string;
}
