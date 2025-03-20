// post, current user, authtoken, display info, display error, clear last info, set is loading, set post
import { AuthToken, User } from "tweeter-shared";
import { UserInfoAbstractView } from "./UserInfoAbstractPresenter";
import { UserMessageView } from "./Presenter";

export interface PostStatusView extends UserMessageView{
}

export class PostStatusAbstractPresenter {
    protected _view: PostStatusView;

    protected constructor(view: PostStatusView) {
        this._view = view;
    }

    public get view(){
        return this._view;
    }
}