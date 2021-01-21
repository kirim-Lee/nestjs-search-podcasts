import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PodcastsService } from './podcasts.service';
import { Podcast } from './entities/podcast.entity';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { CoreOutput } from './dtos/output.dto';
import {
  PodcastSearchInput,
  PodcastOutput,
  EpisodesOutput,
  EpisodesSearchInput,
  GetAllPodcastsOutput,
  SearchPodcastInput,
  SearchPodcastOutput,
} from './dtos/podcast.dto';
import { UpdatePodcastInput } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import { UpdateEpisodeInput } from './dtos/update-episode.dto';
import { Role } from 'src/auth/role.decorator';
import { ReviewPodcastInput } from './dtos/review-podcast.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { SubscribeToPodcastInput } from './dtos/subscribe-podcast.dto';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query((returns) => GetAllPodcastsOutput)
  getAllPodcasts(): Promise<GetAllPodcastsOutput> {
    return this.podcastsService.getAllPodcasts();
  }

  @Mutation((returns) => CreatePodcastOutput)
  @Role(['Host'])
  createPodcast(
    @Args('input') createPodcastInput: CreatePodcastInput
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query((returns) => PodcastOutput)
  getPodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput
  ): Promise<PodcastOutput> {
    return this.podcastsService.getPodcast(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  @Role(['Host'])
  deletePodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput
  ): Promise<CoreOutput> {
    return this.podcastsService.deletePodcast(podcastSearchInput.id);
  }

  @Mutation((returns) => CoreOutput)
  @Role(['Host'])
  updatePodcast(
    @Args('input') updatePodcastInput: UpdatePodcastInput
  ): Promise<CoreOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }
}

@Resolver((of) => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Query((returns) => EpisodesOutput)
  getEpisodes(
    @Args('input') podcastSearchInput: PodcastSearchInput
  ): Promise<EpisodesOutput> {
    return this.podcastService.getEpisodes(podcastSearchInput.id);
  }

  @Mutation((returns) => CreateEpisodeOutput)
  @Role(['Host'])
  createEpisode(
    @Args('input') createEpisodeInput: CreateEpisodeInput
  ): Promise<CreateEpisodeOutput> {
    return this.podcastService.createEpisode(createEpisodeInput);
  }

  @Mutation((returns) => CoreOutput)
  @Role(['Host'])
  updateEpisode(
    @Args('input') updateEpisodeInput: UpdateEpisodeInput
  ): Promise<CoreOutput> {
    return this.podcastService.updateEpisode(updateEpisodeInput);
  }

  @Mutation((returns) => CoreOutput)
  @Role(['Host'])
  deleteEpisode(
    @Args('input') episodesSearchInput: EpisodesSearchInput
  ): Promise<CoreOutput> {
    return this.podcastService.deleteEpisode(episodesSearchInput);
  }

  @Query((returns) => SearchPodcastOutput)
  @Role(['Listener'])
  searchPodcasts(
    @Args('input') searchPodcastInput: SearchPodcastInput
  ): Promise<SearchPodcastOutput> {
    return this.podcastService.searchPodcasts(searchPodcastInput);
  }

  @Mutation((returns) => CoreOutput)
  @Role(['Listener'])
  reviewPodcast(
    @AuthUser() user: User,
    @Args('input') reviewPodcastInput: ReviewPodcastInput
  ): Promise<CoreOutput> {
    return this.podcastService.reviewPodcast(user, reviewPodcastInput);
  }

  @Mutation((returns) => CoreOutput)
  @Role(['Listener'])
  subscribeToPodcast(
    @AuthUser() user: User,
    @Args('input') subscribeToPodcastInput: SubscribeToPodcastInput
  ): Promise<CoreOutput> {
    return this.podcastService.subscribeToPodcast(
      user,
      subscribeToPodcastInput
    );
  }

  @Mutation((returns) => CoreOutput)
  @Role(['Listener'])
  unSubscribeToPodcast(
    @AuthUser() user: User,
    @Args('input') subscribeToPodcastInput: SubscribeToPodcastInput
  ): Promise<CoreOutput> {
    return this.podcastService.unSubscribeToPodcast(
      user,
      subscribeToPodcastInput
    );
  }

  @Query((returns) => [Podcast])
  @Role(['Listener'])
  seeSubscriptions(@AuthUser() user: User): Podcast[] {
    return user.subscriptions;
  }
}
