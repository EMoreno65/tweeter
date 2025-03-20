import { AuthToken, FakeData, Status, StatusDto, User } from "tweeter-shared";

export class StatusService {
    public async loadMoreFeedItems (
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDto | null
        ): Promise<[StatusDto[], boolean]> {
        return this.getFakeData(lastItem, pageSize, userAlias)
      };

      public async loadMoreStoryItems (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
      ): Promise<[Status[], boolean]> {
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
      };

  private async getFakeData(lastItem: StatusDto | null, pageSize: number, userAlias: string): Promise<[StatusDto[], boolean]> {
    console.log("does it get to getfake data in status service?")
    const [items, hasMore] = FakeData.instance.getPageOfStatuses(Status.fromDto(lastItem), pageSize);

    const dtos = items.map((status) => status.dto);
    return [dtos, hasMore];
  }
}