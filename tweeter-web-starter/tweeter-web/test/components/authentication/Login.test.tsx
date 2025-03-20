import { MemoryRouter } from "react-router-dom";
import Login from "../../../src/components/authentication/login/Login";
import { LogRolesOptions, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from "../../../src/presenters/LoginPresenter";
import { anything, deepEqual, instance, mock, verify, when } from "@typestrong/ts-mockito";
import { UserItemView } from "../../../src/presenters/UserItemPresenter";

library.add(fab)

describe("Login Component", () => {
    it("When first rendered the sign-in button is disabled", async () => {
        const { signInButton } = renderLoginAndGetElements("/")
        expect(signInButton).toBeDisabled();
    })
    it("Enables the sign in button when both alias and password are filled", async () => {
        const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements("/");
        await user.type(aliasField, "alias");
        await user.type(passwordField, "password");
        expect(signInButton).toBeEnabled();
    })
    it("When one of the fields is cleared, the sign in button is disabled", async() => {
        
        const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements("/");
        await user.type(aliasField, "alias");
        await user.type(passwordField, "password");
        expect(signInButton).toBeEnabled();
        await user.clear(aliasField);
        expect(signInButton).toBeDisabled();
        await user.type(aliasField, "alias");
        expect(signInButton).toBeEnabled();
        await user.clear(passwordField);
        expect(signInButton).toBeDisabled();
    })
    it("calls the presenter login method with the correct parameters when pressed", async () => {
        // const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements("/");
        // await user.type(aliasField, "alias");
        // await user.type(passwordField, "password");
        // expect(signInButton).toBeEnabled();
        // const mockPresenter = mock<LoginPresenter>();
        // const mockPresenterInstance = instance(mockPresenter);
        // const originalUrl = "http://someurl.com";
        // const alias = "@Alias";
        // const password = "@Password";
        // const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements(originalUrl);
        // await user.type(aliasField, alias);
        // await user.type(passwordField, password);
        // console.log("Alias field is ",aliasField);
        // // console.log("Password field is ",passwordField);
        // expect(signInButton).toBeEnabled();
        // // await waitFor(() => expect(signInButton).toBeEnabled());
        // await user.click(signInButton);
        // verify(mockPresenter.doLogin(alias, password, anything(), anything())).once();
        
        
        const mockDoLogin = jest.fn(); 

        const mockPresenter = {
          doLogin: mockDoLogin,
          checkSubmitButtonStatus: () => true,
        } as Partial<LoginPresenter> as LoginPresenter; 
    
        render(
            <MemoryRouter>
              <Login presenter={mockPresenter} />
            </MemoryRouter>
          );
    
        const aliasField = screen.getByPlaceholderText("Alias");
        const passwordField = screen.getByPlaceholderText("Password");
        const signInButton = screen.getByRole("button", { name: /sign in/i });
    
        await userEvent.type(aliasField, "@Alias");
        await userEvent.type(passwordField, "@Password");
    
        expect(signInButton).toBeEnabled(); 
    
        await userEvent.click(signInButton);
    
        expect(mockDoLogin).toHaveBeenCalledWith("@Alias", "@Password", false, undefined);
    });
    
    
})

// Need a way to test the component - so render it so you have a login component with the needed props
const renderLogin = (originalUrl: string, presenter?: LoginPresenter) => {
    return render(<MemoryRouter>
        {!!presenter ? (<Login originalUrl={originalUrl} presenter={presenter}/>) : (<Login originalUrl={originalUrl} />) }
    </MemoryRouter>);
};

const renderLoginAndGetElements = (originalUrl: string, presenter?: LoginPresenter) => {
    const user = userEvent.setup();
    renderLogin(originalUrl, presenter);
    // console.log("Presenter being rendered:", presenter);
    const signInButton = screen.getByRole("button", { name: /Sign in/i }); // Access to sign in button
    const aliasField = screen.getByLabelText("Username");
    const passwordField = screen.getByLabelText("Password");
    return { signInButton, aliasField, passwordField, user };
};