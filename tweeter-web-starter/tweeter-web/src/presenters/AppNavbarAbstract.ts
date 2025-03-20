import { AuthToken } from "tweeter-shared";
import { Presenter, UserMessageView, View } from "./Presenter";

export interface AppNavbarAbstractView extends UserMessageView {
}

export class AppNavbarAbstract extends Presenter<AppNavbarAbstractView> {

    public constructor(view: AppNavbarAbstractView) {
        super(view)
    }
}