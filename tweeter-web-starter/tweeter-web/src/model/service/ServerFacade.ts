import {
    PagedStatusItemRequest,
    PagedStatusItemResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    Status,
    User,
    UserDto,
  } from "tweeter-shared";
  import { ClientCommunicator } from "./ClientCommunicator";
  
  export class ServerFacade {
    private SERVER_URL = "https://isrpbdgoha.execute-api.us-east-1.amazonaws.com/dev";
  
    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);
  
    public async getMoreFollowees(
      request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
      const response = await this.clientCommunicator.doPost<
        PagedUserItemRequest,
        PagedUserItemResponse
      >(request, "/followee/list");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
      const items: User[] | null =
        response.success && response.items
          ? response.items.map((dto) => User.fromDto(dto) as User)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(`No followees found`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message ?? undefined);
      }
    }

    public async getMoreFollowers(
        request: PagedUserItemRequest
      ): Promise<[User[], boolean]> {
        const response = await this.clientCommunicator.doPost<
          PagedUserItemRequest,
          PagedUserItemResponse
        >(request, "/follower/list");
    
        // Convert the UserDto array returned by ClientCommunicator to a User array
        const items: User[] | null =
          response.success && response.items
            ? response.items.map((dto) => User.fromDto(dto) as User)
            : null;
    
        // Handle errors    
        if (response.success) {
          if (items == null) {
            throw new Error(`No followers found`);
          } else {
            return [items, response.hasMore];
          }
        } else {
          console.error(response);
          throw new Error(response.message ?? undefined);
        }
      }

      public async getMoreFeed(
        request: PagedStatusItemRequest
      ): Promise<[Status[], boolean]> {
        const response = await this.clientCommunicator.doPost<
          PagedStatusItemRequest,
          PagedStatusItemResponse
        >(request, "/feed/list");
    
        console.log("Is it in the getMoreFeed within server facade?")
        const items: Status[] | null =
          response.success && response.items
            ? response.items.map((dto) => Status.fromDto(dto) as Status)
            : null;

        console.log("The resulting items are ... ", response.items)
    
        // Handle errors    
        if (response.success) {
          if (items == null) {
            throw new Error(`No followers found`);
          } else {
            return [items, response.hasMore];
          }
        } else {
          console.error(response);
          throw new Error(response.message ?? undefined);
        }
      }

      public async getMoreStory(
        request: PagedStatusItemRequest
      ): Promise<[Status[], boolean]> {
        const response = await this.clientCommunicator.doPost<
          PagedStatusItemRequest,
          PagedStatusItemResponse
        >(request, "/story");
    
        console.log("Is it in the getMoreFeed within server facade?")
        const items: Status[] | null =
          response.success && response.items
            ? response.items.map((dto) => Status.fromDto(dto) as Status)
            : null;

        console.log("The resulting items are ... ", response.items)
    
        // Handle errors    
        if (response.success) {
          if (items == null) {
            throw new Error(`No followers found`);
          } else {
            return [items, response.hasMore];
          }
        } else {
          console.error(response);
          throw new Error(response.message ?? undefined);
        }
      }      
  }