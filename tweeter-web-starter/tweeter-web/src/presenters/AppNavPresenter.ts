import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { AppNavbarAbstract, AppNavbarAbstractView } from "./AppNavbarAbstract";

export class AppNavbarPresenter extends AppNavbarAbstract{

    
    private _appNavbarService: UserService | null = null;
    private authToken = this.view.authToken

    public constructor(view: AppNavbarAbstractView) {
        super(view)
        this.logOut = this.logOut.bind(this);
    }

    public get appNavbarService () {
      if (this._appNavbarService == null) {
        this._appNavbarService = new UserService
      }
      return this._appNavbarService
    }

    public async logOut (authToken: AuthToken) {

        this.view.displayInfoMessage!("Logging Out...", 0);
    
        try {
          await this.appNavbarService.logout(authToken!);
    
          this.view.clearLastInfoMessage!();
          this.view.clearUser!();
        } catch (error) {
          this.view.displayErrorMessage!(
            `Failed to log user out because of exception`
          );
        }
      };
} 