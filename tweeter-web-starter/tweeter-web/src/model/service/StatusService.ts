import { AuthToken, FakeData, PagedStatusItemRequest, Status, User } from "tweeter-shared";
import { ServerFacade } from "./ServerFacade";

export class StatusService {

    private server_facade = new ServerFacade();

    public async loadMoreFeedItems (
      token: string,
      userAlias: string,
      pageSize: number,
      lastItem: Status | null
    ): Promise<[Status[], boolean]> {
      const request: PagedStatusItemRequest = {
        token,
        userAlias,
        pageSize,
        lastItem: lastItem ? lastItem.dto: null,
      };

        return this.server_facade.getMoreFeed(request);
      }
    
    public async loadMoreStoryItems (
      token: string,
      userAlias: string,
      pageSize: number,
      lastItem: Status | null
    ): Promise<[Status[], boolean]> {
      const request: PagedStatusItemRequest = {
        token,
        userAlias,
        pageSize,
        lastItem: lastItem ? lastItem.dto: null,
      };

        return this.server_facade.getMoreStory(request);
    }

    public async getUser (
        authToken: AuthToken,
        alias: string
      ): Promise<User | null> {
        // TODO: Replace with the result of calling server
        return FakeData.instance.findUserByAlias(alias);
      };

      public async postStatus (
        authToken: AuthToken,
        newStatus: Status
      ): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
      };
}