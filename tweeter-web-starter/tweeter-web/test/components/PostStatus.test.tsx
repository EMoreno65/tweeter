import userEvent from "@testing-library/user-event";
import { PostStatusPresenter } from "../../src/presenters/PostStatusPresenter";
import useUserInfo from "../../src/components/userInfo/UserInfoHook";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import PostStatus from "../../src/components/postStatus/PostStatus";
import "@testing-library/jest-dom";

jest.mock("../../src/components/userInfo/UserInfoHook", () => ({
    __esModule: true,
    default: jest.fn(() => ({
      currentUser: { alias: "testuser" },
      authToken: "mockToken",
    })),
  })); // Needed to put in a user and authToken so we could properly test if the post button was enabled (ChatGPT assistance here)
  

describe("PostStatus Component", () => {
    it("When first rendered, the post status and clear buttons are both disabled", async() => {
        const { postStatusButton, clearStatusButton, statusField } = renderPostStatusAndGetElements();
        expect(postStatusButton[0]).toBeDisabled();
        expect(clearStatusButton[0]).toBeDisabled();
    });
    it("The buttons are enabled when the field has text", async () => {
        const { postStatusButton, clearStatusButton, statusField, user } = renderPostStatusAndGetElements();
    
        await user.type(statusField[0], "Generic status part 6th in the double trilogy");
    
        expect(postStatusButton[0]).toBeEnabled();
        expect(clearStatusButton[0]).toBeEnabled();
    });
    it("Both buttons are disabled when the text field is cleared", async () => {
        const { postStatusButton, clearStatusButton, statusField, user } = renderPostStatusAndGetElements();
        await user.type(statusField[0], "Generic status part 6th in the double trilogy");
        expect(postStatusButton[0]).toBeEnabled();
        expect(clearStatusButton[0]).toBeEnabled();
        console.log(clearStatusButton)
        await user.click(clearStatusButton[0]);
        expect(postStatusButton[0]).toBeDisabled();
        expect(clearStatusButton[0]).toBeDisabled();        
    })
    it("Method called with correct status text when post status button is pressed", async() => {
        const mockSubmitPost = jest.fn(); 

        const mockPresenter = {
          submitPost: mockSubmitPost,
        } as Partial<PostStatusPresenter> as PostStatusPresenter; 
    
        render(
            <MemoryRouter>
              <PostStatus presenter={mockPresenter} />
            </MemoryRouter>
          );
    
        const { postStatusButton, clearStatusButton, statusField, user } = renderPostStatusAndGetElements();
    
        await userEvent.type(statusField[0], "Another generic status, when will it end");
    
        expect(postStatusButton[0]).toBeEnabled(); 
        expect(clearStatusButton[0]).toBeEnabled();
    
        await userEvent.click(postStatusButton[0]);
    
        expect(mockSubmitPost).toHaveBeenCalledWith(expect.any(Object), "Another generic status, when will it end");
    })
})

const renderPostStatus = (presenter?: PostStatusPresenter) => {
    return render(
        <MemoryRouter>
          {!!presenter ? <PostStatus /> : <PostStatus />}
        </MemoryRouter>
      );
};

const renderPostStatusAndGetElements= (presenter?: PostStatusPresenter) => {
    const user = userEvent.setup();
    renderPostStatus(presenter);
    // const signInButton = screen.getAllByRole("button", { name: /Sign in/i }); // Access to sign in button
    // const aliasField = screen.getByLabelText("Username");
    // const passwordField = screen.getByLabelText("Password");
    // user.type(aliasField, "testuser");
    // user.type(passwordField, "password123");
    // user.click(signInButton[0]); // Triggers login
    const postStatusButton = screen.getAllByRole("button", { name: /Post Status/i });
    const clearStatusButton = screen.getAllByRole("button", { name: /Clear/i });
    const statusField = screen.getAllByPlaceholderText("What's on your mind?");
    return { postStatusButton, clearStatusButton, statusField, user };
}