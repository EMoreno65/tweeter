import { AuthToken } from "tweeter-shared";
import { UserService } from "../../src/model/service/UserService";
import { AppNavbarPresenter } from "../../src/presenters/AppNavPresenter"
import { AppNavbarAbstractView } from "../../src/presenters/AppNavbarAbstract"
import { mock, instance, verify, spy, when, anything, capture } from '@typestrong/ts-mockito'

describe("AppNavPresenter", () => {
    // Tests will go in here
    let appNavbarPresenter: AppNavbarPresenter;
    let mockAppNavbarAbstractView: AppNavbarAbstractView;
    let mockUserService: UserService

    const authToken = new AuthToken("Whatisthesecret", 6578)

    beforeEach(() => {
        mockAppNavbarAbstractView = mock<AppNavbarAbstractView>();
        const mockAppNavbarAbstractViewInstance = instance(mockAppNavbarAbstractView);
        const appNavbarPresenterSpy = spy(new AppNavbarPresenter(mockAppNavbarAbstractViewInstance))
        appNavbarPresenter = instance(appNavbarPresenterSpy)
        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService)
        when(appNavbarPresenterSpy.appNavbarService).thenReturn(mockUserServiceInstance)
    })

    it("tells the view to display a logging out message", async() => {
        await appNavbarPresenter.logOut(authToken);
        verify(mockAppNavbarAbstractView.displayInfoMessage!("Logging Out...", 0)).once();
    })

    it("calls logout on user service with the correct auth token", async () => {
        // when(mockAppNavbarAbstractView.authToken).thenReturn(authToken);
        await appNavbarPresenter.logOut(authToken);
        verify(mockUserService.logout(authToken)).once();
    })

    it("tells the view to clear the last info message and clear the user info", async () => {
        await appNavbarPresenter.logOut(authToken);
        verify(mockAppNavbarAbstractView.clearLastInfoMessage!()).once();
        verify(mockAppNavbarAbstractView.clearUser!()).once();
        verify(mockAppNavbarAbstractView.displayErrorMessage!("Failed to log user out because of exception")).never();
    })
    it("if not successful, tells the view to display an error message and does not tell it to clear the last info message or clear the user info", async () => {
        const error = new Error("An error has occured")
        when(mockUserService.logout(authToken)).thenThrow(error)
        await appNavbarPresenter.logOut(authToken)

        verify(mockAppNavbarAbstractView.displayErrorMessage!("Failed to log user out because of exception")).once();
        verify(mockAppNavbarAbstractView.clearLastInfoMessage!()).never();
        verify(mockAppNavbarAbstractView.clearUser!()).never();
    })
})