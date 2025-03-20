import { ToasterAbstractPresenter, ToasterView } from "./ToasterAbstractPresenter";

export class ToasterPresenter extends ToasterAbstractPresenter{

    public constructor(view: ToasterView) {
        super(view)
    }

    public deleteExpiredToasts() {
        const now = Date.now();
    
        for (let toast of this.view.toastList!) {
          if (
            toast.expirationMillisecond > 0 &&
            toast.expirationMillisecond < now
          ) {
            this.view.deleteToast!(toast.id);
          }
        }
      };
}