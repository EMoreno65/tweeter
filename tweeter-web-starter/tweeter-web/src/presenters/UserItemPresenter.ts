import { } from "react";
import { User } from "tweeter-shared";
import { UserMessageView, View } from "./Presenter";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { FollowService } from "../model/service/FollowService";

export interface UserItemView extends UserMessageView {
}

export abstract class UserItemPresenter extends PagedItemPresenter<User, FollowService>{

    protected createService(): FollowService {
        return new FollowService();
    }
}