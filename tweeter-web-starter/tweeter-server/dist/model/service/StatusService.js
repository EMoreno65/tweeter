"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class StatusService {
    async loadMoreFeedItems(token, userAlias, pageSize, lastItem) {
        return this.getFakeData(lastItem, pageSize, userAlias);
    }
    ;
    async loadMoreStoryItems(authToken, userAlias, pageSize, lastItem) {
        return tweeter_shared_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    }
    ;
    async getFakeData(lastItem, pageSize, userAlias) {
        console.log("does it get to getfake data in status service?");
        const [items, hasMore] = tweeter_shared_1.FakeData.instance.getPageOfStatuses(tweeter_shared_1.Status.fromDto(lastItem), pageSize);
        const dtos = items.map((status) => status.dto);
        return [dtos, hasMore];
    }
}
exports.StatusService = StatusService;
