import { Status } from "tweeter-shared";
import { PostStatusAbstractPresenter, PostStatusView } from "./PostStatusAbstractPresenter";
import { StatusService } from "../model/service/StatusService";

export class PostStatusPresenter extends PostStatusAbstractPresenter{

    private _postStatusService: StatusService | null = null;

    public constructor(view: PostStatusView) {
        super(view)
    }

    public get postStatusService() {
        if (this._postStatusService == null) {
            this._postStatusService = new StatusService
        }
        return this._postStatusService
    }
    
    public async submitPost (event: React.MouseEvent, post: string) {
        event.preventDefault();

        try {
        this.view.setIsLoading!(true);
        this.view.displayInfoMessage!("Posting status...", 0);


        const status = new Status(post, this.view.currentUser!, Date.now());

        await this.postStatusService.postStatus(this.view.authToken!, status);

        this.view.setPost!("");
        this.view.displayInfoMessage!("Status posted!", 2000);
        } catch (error) {
        this.view.displayErrorMessage!(
            `Failed to post the status because of exception`
        );
        } finally {
        this.view.clearLastInfoMessage!();
        this.clearPost(event)
        this.view.setIsLoading!(false);
        }
    };

    public clearPost(event: React.MouseEvent) {
        event.preventDefault();
        this.view.setPost!("");
      };
}