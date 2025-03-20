import { AuthToken, FakeData, User } from "tweeter-shared";
import useUserInfo from "./userInfo/UserInfoHook";
import useToastListener from "./toaster/ToastListenerHook";

export interface UserNavigation {
    navigateToUser: (event: React.MouseEvent) => Promise<void>;
    extractAlias: (value: string) => string;
    getUser: (authToken: AuthToken, alias: string) => Promise<User | null>;
    authToken: AuthToken | null
}

export const useNavigating = (): UserNavigation => {

    const { authToken, updateUser, clearUser, currentUser, displayedUser, setShownUser } = useUserInfo();
    const {displayErrorMessage} = useToastListener();
    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
    
        try {
          const alias = extractAlias(event.target.toString());
    
          const user = await getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              setShownUser(currentUser!);
            } else {
              setShownUser(user);
            }
          }
        } catch (error) {
          displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
      };
    
      const extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
      };
    
    const getUser = async (
        authToken: AuthToken,
        alias: string
      ): Promise<User | null> => {
        // TODO: Replace with the result of calling server
        return FakeData.instance.findUserByAlias(alias);
      };

    return {
        navigateToUser,
        extractAlias,
        getUser,
        authToken,
};
};

export default useNavigating;