import { AuthToken, User, FakeData, PagedUserItemRequest } from "tweeter-shared";
import { ServerFacade } from "./ServerFacade";

export class FollowService {

    private server_facade = new ServerFacade();
      // public async loadMoreFollowers (
      //   authToken: AuthToken,
      //   userAlias: string,
      //   pageSize: number,
      //   lastItem: User | null
      // ): Promise<[User[], boolean]> {
      //   // TODO: Replace with the result of calling server
      //   return FakeData.instance.getPageOfUsers(lastItem, pageSize, userAlias);
      // };

      public async loadMoreFollowers (
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
      ): Promise<[User[], boolean]> {
        const request: PagedUserItemRequest = {
          token,
          userAlias,
          pageSize,
          lastItem: lastItem ? lastItem.dto: null,
        };

        return this.server_facade.getMoreFollowers(request);
      } // We're taking the service function and making a request object that gets passed into the server facade method
      // The server facade should then call the api, which calls the lambda, which calls the server-side service, which does the work

    
      public async loadMoreFollowees (
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
      ): Promise<[User[], boolean]> {
        const request: PagedUserItemRequest = {
          token,
          userAlias,
          pageSize,
          lastItem: lastItem ? lastItem.dto: null
        };
        return this.server_facade.getMoreFollowees(request);
      };
}