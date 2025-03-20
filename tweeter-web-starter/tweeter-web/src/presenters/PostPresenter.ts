import { AuthToken, FakeData, Status, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";
import useToastListener from "../components/toaster/ToastListenerHook";
import { UserService } from "../model/service/UserService";

export class PostPresenter extends StatusItemPresenter {
  protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
    throw new Error("Method not implemented.");
  }
  protected getItemDescription(): string {
    throw new Error("Method not implemented.");
  }

    private postService: StatusService

    public constructor(view: StatusItemView) {
        super(view);
        this.postService = new StatusService
    }

    public async navigateToUser (event: React.MouseEvent): Promise<void> {
        event.preventDefault();
    
        try {
          const alias = this.extractAlias(event.target.toString());
    
          const user = await this.postService.getUser(this.view.authToken!, this.view.alias!);
    
          if (!!user) {
            if (this.view.currentUser!.equals(user)) {
              this.view.setShownUser!(this.view.currentUser!);
            } else {
              this.view.setShownUser!(user);
            }
          }
        } catch (error) {
          this.view.displayErrorMessage!(`Failed to get user because of exception: ${error}`);
        }
      };
    
    public async extractAlias (value: string): Promise<string> {
        const index = value.indexOf("@");
        return value.substring(index);
      };

}
