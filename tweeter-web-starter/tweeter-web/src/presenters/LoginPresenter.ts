import { AuthToken, User } from "tweeter-shared";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";
import { UserService } from "../model/service/UserService";

export class LoginPresenter extends UserItemPresenter {
    protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
        throw new Error("Method not implemented.");
    }
    protected getItemDescription(): string {
        throw new Error("Method not implemented.");
    }

    
    private loginService: UserService;

    public constructor(view: UserItemView) {
        super(view);
        this.loginService = new UserService;
    }

    public checkSubmitButtonStatus = (): boolean => {
        const alias = this.view.userAlias || "";
        const password = this.view.password || "";
        return alias.trim().length > 0 && password.trim().length > 0;
      }

    public async doLogin(alias: string, password: string, rememberMe: boolean, originalUrl?: string): Promise<void> {
        await this.doAuthOperation(async () => {
            const [user, authToken] = await this.loginService.login(alias, password);
            this.view.updateUser!(user, user, authToken, rememberMe);
            this.view.navigate!(originalUrl || "/");
        }, "log user in");
    }
}
