import { AuthToken, User } from "tweeter-shared";
import { Presenter, UserMessageView } from "./Presenter";

export interface UserInfoAbstractView extends UserMessageView {
}

export class UserInfoAbstractPresenter extends Presenter<UserInfoAbstractView>{

    protected constructor(view: UserInfoAbstractView) {
        super(view)
    }

    public get view(){
        return this._view;
    }
}