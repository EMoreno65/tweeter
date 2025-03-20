import { Toast } from "../components/toaster/Toast";
import { UserMessageView } from "./Presenter";

// toast list, delete toast
export interface ToasterView extends UserMessageView {
}

export class ToasterAbstractPresenter {
    protected _view: ToasterView;

    protected constructor(view: ToasterView) {
        this._view = view;
    }

    public get view(){
        return this._view;
    }
}