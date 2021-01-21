import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubscribeToPodcastInput {
  @Field((type) => Number)
  podcastId: number;
}
