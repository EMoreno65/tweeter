import { AuthToken, User } from "tweeter-shared";
import { UserInfoContext } from "./UserInfoProvider";
import { useContext } from "react";

export interface UserInfo {
    currentUser: User | null,
    displayedUser: User | null,
    authToken: AuthToken | null,
    updateUser: (
        currentUser: User,
        displayedUser: User | null,
        authToken: AuthToken,
        remember: boolean
      ) => void;
    clearUser: () => void;
    setShownUser: (user: User) => void;
    
}

const useUserInfo = (): UserInfo => {
    const { updateUserInfo, clearUserInfo, setDisplayedUser, currentUser, displayedUser, authToken } = useContext(UserInfoContext);

    return {
        currentUser,
        displayedUser,
        authToken,
        updateUser: updateUserInfo,
        clearUser: clearUserInfo,
        setShownUser: setDisplayedUser
    };
};

export default useUserInfo;