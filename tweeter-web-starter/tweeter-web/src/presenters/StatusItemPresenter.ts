import {  Status } from "tweeter-shared";
import {  UserMessageView, View } from "./Presenter";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { StatusService } from "../model/service/StatusService";

export interface StatusItemView<T=Status> extends UserMessageView<T> { // You don't need to initalize T to status

}

export abstract class StatusItemPresenter<T=Status> extends PagedItemPresenter<T, StatusService> {

    protected createService(): StatusService {
        return new StatusService
    }

}