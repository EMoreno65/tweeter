import { PagedStatusItemRequest, PagedStatusItemResponse, PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";
import { StatusService } from "../../model/service/StatusService";

export const handler = async (request: PagedStatusItemRequest): Promise<PagedStatusItemResponse> => {
    const status_service = new StatusService();
    const [items, hasMore] = await status_service.loadMoreFeedItems(request.token, request.userAlias, request.pageSize, request.lastItem);

    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    }
}