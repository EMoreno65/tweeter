import { anything, capture, instance, mock, spy, verify, when } from "@typestrong/ts-mockito";
import { StatusService } from "../../src/model/service/StatusService";
import { PostStatusView } from "../../src/presenters/PostStatusAbstractPresenter";
import { PostStatusPresenter } from "../../src/presenters/PostStatusPresenter"
import React from "react";
import { AuthToken, Status, User } from "tweeter-shared";

const mockEvent = {
    preventDefault: jest.fn(),
} as unknown as React.MouseEvent

const authToken = new AuthToken("Auth123", 101)
const genericUser = new User("first_name", "last_name", "alias", "imageUrl")
const newStatus = new Status("Generic post", genericUser, 101)

describe("PostStatusPresenter", () => {

    let postStatusPresenter: PostStatusPresenter;
    let mockPostStatusView: PostStatusView;
    let mockStatusService: StatusService

    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);
        when(mockPostStatusView.post).thenReturn("Generic post");
        when(mockPostStatusView.currentUser).thenReturn(genericUser);
        when(mockPostStatusView.authToken).thenReturn(authToken);
        postStatusPresenter = new PostStatusPresenter(mockPostStatusViewInstance);
        const postStatusPresenterSpy = spy(postStatusPresenter);
        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);
        when(postStatusPresenterSpy.postStatusService).thenReturn(mockStatusServiceInstance);
        when(postStatusPresenterSpy.clearPost(anything())).thenReturn();
    })

    it("tells view to display a posting status message", async () => {
        await postStatusPresenter.submitPost(mockEvent, "Generic status")
        verify(mockPostStatusView.displayInfoMessage!("Posting status...", 0))
    })

    it("calls postStatus on the post status service with the correct status string and auth token", async () => {
        await postStatusPresenter.submitPost(mockEvent, "Generic post")
        const [capturedAuthToken, capturedStatus] = capture(mockStatusService.postStatus).last();
    
        expect(capturedAuthToken).toEqual(authToken);
        expect(capturedStatus.post).toBe("Generic post"); 
        expect(capturedStatus.user).toEqual(genericUser); 
        // I'm using capture because a new status is created inside submit post
    })

    it("status is successful, tells the view to clear the last info message, clear the post, and display a status posted message", async () => {
        await postStatusPresenter.submitPost(mockEvent, "Post");
        verify(mockPostStatusView.clearLastInfoMessage!()).once();
        verify(postStatusPresenter.clearPost(mockEvent))
        verify(mockPostStatusView.displayInfoMessage!("Status posted!", 2000))
    })
    it("not successful, tells the view to display an error message and clear the last info message and does not tell it to clear the post or display a status posted message.", async () => {
        const error = new Error("There was an error")
        when(mockStatusService.postStatus).thenThrow(error)
        await postStatusPresenter.submitPost(mockEvent, "Generic post")
        verify(mockPostStatusView.displayErrorMessage!("Failed to post the status because of exception")).once();
        verify(mockPostStatusView.clearLastInfoMessage!()).once();
        verify(mockPostStatusView.displayInfoMessage!("Status posted!", 2000)).never();
        const postStatusPresenterSpy = spy(postStatusPresenter);
        verify(postStatusPresenterSpy.clearPost(anything())).never();
    })
})