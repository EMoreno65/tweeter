import { ChangeEvent } from "react";
import { AuthToken, User } from "tweeter-shared";
import { Toast } from "../components/toaster/Toast";

export interface View {
    displayErrorMessage?: (message: string) => void
    setLoading?: (isLoading: boolean) => void;
}

export interface UserMessageView<T=User> extends View {
    displayInfoMessage?: (
        message: string,
        duration: number,
        bootstrapClasses?: string
      ) => void;
    clearLastInfoMessage?: () => void;
    clearUser?: () => void;
    clearPost?: () => void;
    setIsLoading?: (isLoading: boolean) => void;
    setPost?: (post: string) => void
    addItems?: (newItems: T[]) => void;
    navigate?: (url: string) => void;
    userAlias?: string
    password?: string
    updateUser?: (
        currentUser: User,
        displayedUser: User,
        authToken: AuthToken,
        remember: boolean
      ) => void;
    setImageUrl?: (url: string) => void;
    setImageBytes?: (array: Uint8Array) => void;
    setImageFileExtension?: (extension: string) => void;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    imageFileExtension?: string;
    imageBytes?: Uint8Array;
    handleFileChange?: (event: ChangeEvent<HTMLInputElement>) => void
    setShownUser?: (user: User) => void;
    authToken?: AuthToken | null;
    alias?: string;
    currentUser?: User| null;
    post?: string | "",
    toastList?: Toast[]
    deleteToast?: (id: string) => void
    displayedUser?: User | null,
    setIsFollower?: (isFollower: boolean) => void;
    setFolloweeCount?: (followeeCount: number) => void;
    setFollowerCount?: (followeeCount: number) => void;
}

export class Presenter <T extends View>{
    protected _view: T; 

    protected constructor (view: T) {
        this._view = view
    }

    protected get view(){
        return this._view;
    }

    public async doFailureReportingOperation(operation: () => Promise<void>, operationDescription: string) {
        try {
            await operation();
        } catch (error) {
          this.view.displayErrorMessage!(
            `Failed to ${operationDescription} because of exception: ${error}`
          );
        }
      };

    public async doAuthOperation(authOperation: () => Promise<void>, operationDescription: string): Promise<void> {
        try {
            this.view.setLoading!(true);
            await authOperation();  
        } catch (error) {
            this.view.displayErrorMessage!(`Failed to ${operationDescription}: ${error}`);
        } finally {
            this.view.setLoading!(false); 
        }
    }

    // abstract method euth operation, subclasses (r and l) implement it, solves same problem, using inheritance to pass in functions
}